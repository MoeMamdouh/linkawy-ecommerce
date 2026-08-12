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
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ApolloProvider } from "@apollo/client/react";
import { useAuthStore } from "@features/customer/store/useAuthStore";
import { apolloClient } from "@shared/graphql/client";
import { useTheme } from "@shared/hooks/use-theme";

import "../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const { colors, isDark } = useTheme();

  const hydrateAuth = useAuthStore((state) => state.hydrateAuth);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  useEffect(() => {
    hydrateAuth();
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

  // Wait until fonts AND SecureStore auth state are fully loaded
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
      <SafeAreaProvider>
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
          <Stack>
            {/* Main Tab Bar */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* Auth Group as Modal Popup */}
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, presentation: "modal" }}
            />

            {/* Fullscreen Product Details Route */}
            <Stack.Screen
              name="product/[id]"
              options={{ headerShown: false }}
            />

            {/* Playground Route */}
            <Stack.Screen
              name="playgroundnav"
              options={{ title: "Playground" }}
            />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
