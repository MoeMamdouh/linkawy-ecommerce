import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'shopify_customer_session';
const ONBOARDING_KEY = 'has_seen_onboarding';

export interface CustomerSession {
  accessToken: string;
  expiresAt: string;
}

export const saveSession = async (session: CustomerSession): Promise<void> => {
  await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(session));
};

export const getSession = async (): Promise<CustomerSession | null> => {
  const data = await SecureStore.getItemAsync(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const clearSession = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(SESSION_KEY);
};


export const setOnboardingComplete = async (): Promise<void> => {
  await SecureStore.setItemAsync(ONBOARDING_KEY, 'true');
};

export const getOnboardingComplete = async (): Promise<boolean> => {
  try {
    const value = await SecureStore.getItemAsync(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Failed to read onboarding state:', error);
    return false;
  }
};