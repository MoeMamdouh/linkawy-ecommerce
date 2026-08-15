import { useApolloClient } from "@apollo/client/react";
import { shopifyApi } from "@shared/graphql/shopifyApi";
import { useState } from "react";
import {
  CUSTOMER_LOGIN_MUTATION,
  CUSTOMER_REGISTER_MUTATION,
  CUSTOMER_RECOVER_MUTATION,
  CUSTOMER_RESET_BY_URL_MUTATION
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
interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginInput{
  email: string;
  password: string;
}

interface CustomerCreateResponse {
  customerCreate?: {
    customer?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    customerUserErrors?:CustomerUserError[];
  };
}
interface CustomerLoginResponse {
  customerAccessTokenCreate?: {
    customerAccessToken?: CustomerAccessToken;
    customerUserErrors?: CustomerUserError[];
  };
}

interface CustomerRecoverResponse {
  customerRecover?: {
    customerUserErrors?: CustomerUserError[];
  };
}

interface CustomerResetByUrlResponse {
  customerResetByUrl?: {
    customer?: {
      id: string;
      email: string;
    };
    customerAccessToken?: CustomerAccessToken;
    customerUserErrors?: CustomerUserError[];
  };
}

export const useLogin = () => {
  const loginSession = useAuthStore((state) => state.loginSession);
  // const cartId = useCartStore((state) => state.cartId);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | undefined>();

  const executeLogin = async ({ email, password }: LoginInput) => {
    setIsLoggingIn(true);
    setLoginError(undefined);

    try {
      // A. Authenticate with Shopify
      const response = await shopifyApi<CustomerLoginResponse>(
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

export const useRegister = () => {
  const loginSession = useAuthStore((state) => state.loginSession);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | undefined>();

  const executeRegister = async (input: RegisterInput) => {
    setIsRegistering(true);
    setRegisterError(undefined);

    try {
      // A. Register with Shopify
      const registerData = await shopifyApi<CustomerCreateResponse>(
        CUSTOMER_REGISTER_MUTATION,
        { input },
      );

      const registerErrors = registerData.customerCreate?.customerUserErrors;
      if (registerErrors && registerErrors.length > 0) {
        const message = registerErrors[0].message || "Registration failed.";
        setRegisterError(message);
        throw new Error(message);
      }

      if (!registerData.customerCreate?.customer) {
      const message = "Registration failed.";
      setRegisterError(message);
      throw new Error(message);
    }

      const loginData = await shopifyApi<CustomerLoginResponse>(
        CUSTOMER_LOGIN_MUTATION,
        {
          input: {
            email: input.email,
            password: input.password,
          },
        }
      );

      const loginErrors = loginData.customerAccessTokenCreate?.customerUserErrors;
      if (loginErrors && loginErrors.length > 0) {
        const message = loginErrors[0].message || "Account created, but auto-login failed.";
        setRegisterError(message);
        throw new Error(message);
      }

      const session = loginData.customerAccessTokenCreate?.customerAccessToken;
      if (!session) {
        const message = "Could not create user session.";
        setRegisterError(message);
        throw new Error(message);
      }

      // C. Save Session in Store
      await loginSession(session);
      return session;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed.";
      setRegisterError(message);
      throw error;
    } finally {
      setIsRegistering(false);
    }
  };

  return {
    register: executeRegister,
    loading: isRegistering,
    error: registerError,
    resetError: () => setRegisterError(undefined),
  };
};

export const useForgotPassword = () => {
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoverError, setRecoverError] = useState<string | undefined>();

  const executeRecover = async (email: string) => {
    setIsRecovering(true);
    setRecoverError(undefined);

    try {
      const response = await shopifyApi<CustomerRecoverResponse>(CUSTOMER_RECOVER_MUTATION, { email });

      const userErrors = response.customerRecover?.customerUserErrors;
      if (userErrors && userErrors.length > 0) {
        const message = userErrors[0].message || "Password recovery failed.";
        setRecoverError(message);
        throw new Error(message);
      }

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Password recovery failed.";
      setRecoverError(message);
      throw error;
    } finally {
      setIsRecovering(false);
    }
  };

  return {
    recoverPassword: executeRecover,
    loading: isRecovering,
    error: recoverError,
    resetError: () => setRecoverError(undefined),
  };
};

export const useResetPasswordByUrl = () => {
  const loginSession = useAuthStore((state) => state.loginSession);
  const [isResetting, setIsResetting] = useState(false);
  const [resetError, setResetError] = useState<string | undefined>();

  const executeReset = async (resetUrl: string, newPassword: string) => {
    setIsResetting(true);
    setResetError(undefined);

    try {
      const response = await shopifyApi<CustomerResetByUrlResponse>(
        CUSTOMER_RESET_BY_URL_MUTATION,
        {
          resetUrl,
          password: newPassword,
        }
      );

      const userErrors = response.customerResetByUrl?.customerUserErrors;
      if (userErrors && userErrors.length > 0) {
        const message = userErrors[0].message || "Password reset failed.";
        setResetError(message);
        throw new Error(message);
      }

      const session = response.customerResetByUrl?.customerAccessToken;
      if (session) {
        await loginSession(session);
      }

      return response.customerResetByUrl;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Password reset failed.";
      setResetError(message);
      throw error;
    } finally {
      setIsResetting(false);
    }
  };

  return {
    resetPassword: executeReset,
    loading: isResetting,
    error: resetError,
    resetError: () => setResetError(undefined),
  };
};

export const useLogout = () => {
  const logoutStore = useAuthStore((state) => state.logout);
  const client = useApolloClient();

  const logout = async () => {
    await logoutStore();
    // Safely clears Apollo Cache without breaking active observers
    await client.clearStore();
  };

  return { logout };
};
