import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'shopify_customer_session';

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