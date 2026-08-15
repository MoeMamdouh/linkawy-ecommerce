import "../ReactotronConfig";
import "@shared/i18n";

import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import { Stack } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import "../global.css";
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from '@shared/graphql/client';
import { queryClient } from '@shared/query/client';
import { useTheme } from '@shared/hooks/use-theme';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import { initializeI18n } from "@shared/i18n";
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { colors, isDark } = useTheme();
  const { i18n } = useTranslation();

  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    hydrateAuth();
    initializeI18n();
  }, [hydrateAuth]);

  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_900Black,
  });

  useEffect(() => {
    if (fontError) {
      console.error("Error loading fonts:", fontError);
    }
  }, [fontError]);

  if ((!fontsLoaded && !fontError) || !isHydrated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <Stack key={i18n.language || "en"}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="(auth)"
                options={{ headerShown: false, presentation: "modal" }}
              />
              <Stack.Screen
                name="product/[id]"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="checkout"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="theme"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="language"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="orders"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="edit-profile"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="addresses"
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="add-address"
                options={{ headerShown: false }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}