import "../ReactotronConfig";

import { ApolloProvider } from "@apollo/client/react";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { SplashScreenView } from "@shared/components/splash-screen-view";
import { apolloClient } from "@shared/graphql/client";
import { useTheme } from "@shared/hooks/use-theme";
import { queryClient } from "@shared/query/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "expo-router/react-navigation";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { isDark } = useTheme();
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const hasSeenOnboarding = useAuthStore((state) => state.hasSeenOnboarding);

  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Outfit_900Black,
  });

  useEffect(() => {
    hydrateAuth();
  }, [hydrateAuth]);

  useEffect(() => {
    if (fontError) {
      console.error("Error loading fonts:", fontError);
    }
  }, [fontError]);

  useEffect(() => {
    const isReady = (fontsLoaded || fontError) && isHydrated;
    if (!isReady) return;

    SplashScreen.hideAsync();

    const timer = setTimeout(() => {
      setShowCustomSplash(false);

      if (!hasSeenOnboarding) {
        router.replace("/onboarding");
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [isHydrated, fontsLoaded, fontError, hasSeenOnboarding]);

  const isAppReady = (fontsLoaded || fontError) && isHydrated;

  if (!isAppReady || showCustomSplash) {
    return <SplashScreenView appName="LINKAWY" tagline="Your Ultimate Store" />;
  }

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false }}
              />
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
                name="playgroundnav"
                options={{ title: "Playground" }}
              />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}