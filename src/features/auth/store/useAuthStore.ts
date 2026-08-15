import { shopifyApi } from "@shared/graphql/shopifyApi";
import {
  clearSession,
  CustomerSession,
  getSession,
  saveSession,
  getOnboardingComplete,
  setOnboardingComplete
} from "@shared/utils/secureStore";
import { create } from "zustand";
import {
  CUSTOMER_DELETE_TOKEN_MUTATION,
  RENEW_TOKEN_MUTATION,
} from "../graphql";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  isLoading: boolean;
  error: string | null;
  hasSeenOnboarding: boolean;
}

interface AuthActions {
  hydrateAuth: () => Promise<void>;
  loginSession: (session: CustomerSession) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  token: null,
  isAuthenticated: false,
  isHydrated: false,
  isLoading: false,
  error: null,
  hasSeenOnboarding: false,

  completeOnboarding: async () => {
    await setOnboardingComplete();
    set({ hasSeenOnboarding: true });
  },

  loginSession: async (session: CustomerSession) => {
    set({ isLoading: true, error: null });

    try {
      await saveSession(session);
      set({
        token: session.accessToken,
        isAuthenticated: true,
        isHydrated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Failed to save session:", error);
      set({
        error: error?.message || "Failed to save session",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    const currentToken = get().token;

    set({ isLoading: true, error: null });

    if (currentToken) {
      try {
        await shopifyApi(
          CUSTOMER_DELETE_TOKEN_MUTATION,
          { customerAccessToken: currentToken },
          { requiresAuth: true, customerAccessToken: currentToken },
        );
      } catch (error) {
        console.warn("Failed to delete access token on server:", error);
      }
    }

    try {
      await clearSession();
      set({
        token: null,
        isAuthenticated: false,
        isHydrated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      console.error("Failed to clear session:", error);
      set({
        error: error?.message || "Failed to clear session",
        isLoading: false,
      });
      throw error;
    }
  },

  hydrateAuth: async () => {
    set({ isLoading: true, error: null });

    try {
      const hasSeenOnboarding = await getOnboardingComplete();
      const session = await getSession();

      if (!session) {
        set({
          token: null,
          isAuthenticated: false,
          isHydrated: true,
          isLoading: false,
          error: null,
          hasSeenOnboarding: hasSeenOnboarding,
        });
        return;
      }

      const now = new Date().getTime();
      const expiresAt = new Date(session.expiresAt).getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

      if (expiresAt - now > threeDaysInMs) {
        set({
          token: session.accessToken,
          isAuthenticated: true,
          isHydrated: true,
          isLoading: false,
          error: null,
          hasSeenOnboarding: hasSeenOnboarding,
        });
        return;
      }

      const data = await shopifyApi<any>(
        RENEW_TOKEN_MUTATION,
        { customerAccessToken: session.accessToken },
        { requiresAuth: true, customerAccessToken: session.accessToken },
      );

      const newToken = data?.customerAccessTokenRenew?.customerAccessToken;

      if (newToken?.accessToken) {
        await saveSession({
          accessToken: newToken.accessToken,
          expiresAt: newToken.expiresAt,
        });
        set({
          token: newToken.accessToken,
          isAuthenticated: true,
          isHydrated: true,
          isLoading: false,
          error: null,
          hasSeenOnboarding: hasSeenOnboarding,
        });
        return;
      }

      await clearSession();
      set({
        token: null,
        isAuthenticated: false,
        isHydrated: true,
        isLoading: false,
        error: null,
        hasSeenOnboarding: hasSeenOnboarding,
      });
    } catch (error: any) {
      console.error("Failed to hydrate auth:", error);
      await clearSession();
      set({
        token: null,
        isAuthenticated: false,
        isHydrated: true,
        isLoading: false,
        error: error?.message || "Failed to hydrate auth",
        hasSeenOnboarding: false,
      });
    }
  },
}));
