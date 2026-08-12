import { shopifyApi } from "@shared/graphql/shopifyApi";
import {
  clearSession,
  CustomerSession,
  getSession,
  saveSession,
} from "@shared/utils/secureStore";
import { create } from "zustand";
import {
  CUSTOMER_DELETE_TOKEN_MUTATION,
  RENEW_TOKEN_MUTATION,
} from "../api/customerQueries";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  hydrateAuth: () => Promise<void>;
  loginSession: (session: CustomerSession) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  isAuthenticated: false,
  isHydrated: false,

  loginSession: async (session: CustomerSession) => {
    await saveSession(session);
    set({ token: session.accessToken, isAuthenticated: true });
  },

  logout: async () => {
    const currentToken = get().token;

    if (currentToken) {
      try {
        await shopifyApi(
          CUSTOMER_DELETE_TOKEN_MUTATION,
          { customerAccessToken: currentToken },
          { requiresAuth: true, customerAccessToken: currentToken }
        );
      } catch (e) {
        console.warn("Failed to delete access token on server:", e);
      }
    }

    // Always clear local storage & state regardless of server response
    await clearSession();
    set({ token: null, isAuthenticated: false });
  },

  hydrateAuth: async () => {
    try {
      const session = await getSession();

      if (!session) {
        set({ token: null, isAuthenticated: false, isHydrated: true });
        return;
      }

      const now = new Date().getTime();
      const expiresAt = new Date(session.expiresAt).getTime();
      const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

      // 1. Token is valid -> Keep existing token
      if (expiresAt - now > threeDaysInMs) {
        set({
          token: session.accessToken,
          isAuthenticated: true,
          isHydrated: true,
        });
        return;
      }

      // 2. Token is close to expiring -> Perform Silent Renewal
      const data = await shopifyApi<any>(
        RENEW_TOKEN_MUTATION,
        { customerAccessToken: session.accessToken },
        { requiresAuth: true, customerAccessToken: session.accessToken }
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
        });
      } else {
        // Token was rejected/invalidated -> Force local logout
        await clearSession();
        set({ token: null, isAuthenticated: false, isHydrated: true });
      }
    } catch {
      await clearSession();
      set({ token: null, isAuthenticated: false, isHydrated: true });
    }
  },
}));