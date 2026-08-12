import { useApolloClient } from "@apollo/client/react";
import { shopifyApi } from "@shared/graphql/shopifyApi";
import { useState } from "react";
import {
  CUSTOMER_LOGIN_MUTATION,
} from "../graphql";
import { useAuthStore } from "../store/useAuthStore";

type CustomerAccessToken = {
  accessToken: string;
  expiresAt: string;
};

type CustomerUserError = {
  code?: string | null;
  field?: string[] | null;
  message?: string | null;
};

type CustomerLoginMutationData = {
  customerAccessTokenCreate?: {
    customerAccessToken?: CustomerAccessToken | null;
    customerUserErrors?: CustomerUserError[];
  } | null;
};

export const useLogin = () => {
  const loginSession = useAuthStore((state) => state.loginSession);
  // const cartId = useCartStore((state) => state.cartId);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();

  const executeLogin = async ({ email, password }: Record<string, string>) => {
    setIsLoggingIn(true);
    setLoginError(undefined);

    try {
      // A. Authenticate with Shopify
      const response = await shopifyApi<CustomerLoginMutationData>(
        CUSTOMER_LOGIN_MUTATION,
        {
          input: { email, password },
        },
      );

      const userErrors = response.customerAccessTokenCreate?.customerUserErrors;
      if (userErrors && userErrors.length > 0) {
        const message = userErrors[0].message || "Invalid email or password.";
        setLoginError(message);
        throw new Error(message);
      }

      const session = response.customerAccessTokenCreate?.customerAccessToken;
      if (!session) {
        const message = "Could not authenticate user.";
        setLoginError(message);
        throw new Error(message);
      }

      // B. Bind Guest Cart to Customer
      // if (cartId) {
      //   try {
      //     await shopifyApi(
      //       CART_BUYER_IDENTITY_UPDATE_MUTATION,
      //       {
      //         cartId,
      //         buyerIdentity: {
      //           customerAccessToken: session.accessToken,
      //           email,
      //         },
      //       },
      //       {
      //         requiresAuth: false,
      //       },
      //     );
      //   } catch (e) {
      //     console.warn("Could not bind guest cart:", e);
      //   }
      // }

      // C. Save Session
      await loginSession(session);
      return session;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Sign in failed.";
      setLoginError(message);
      throw error;
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    login: executeLogin,
    loading: isLoggingIn,
    error: loginError,
    resetError: () => setLoginError(undefined),
  };
};

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const client = useApolloClient();

  const logout = async () => {
    await logoutStore();
    // Safely clears Apollo Cache without breaking active observers
    await client.resetStore();
  };

  return { logout };
};
