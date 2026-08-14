import "../ReactotronConfig";
import "../global.css";

import { ApolloProvider } from "@apollo/client/react";
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from "@expo-google-fonts/outfit";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useAuthStore } from "@features/auth/store/useAuthStore";
import { Colors } from "@shared/constants/theme";
import apolloClient from "@shared/graphql/client";
import { useColorScheme } from "@shared/hooks/use-color-scheme";
import { initializeI18n } from "@shared/i18n";
import { queryClient } from "@shared/query/client";
import { useTranslation } from "react-i18next";
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);

  const colorScheme = useColorScheme();
  const {t}= useTranslation();
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
    initializeI18n().then(() => {
      setI18nReady(true);
    });
  }, []);

  useEffect(() => {
    if (fontError) {
      console.error("Error loading fonts:", fontError);
    }
  }, [fontError]);

  if (!i18nReady || (!fontsLoaded && !fontError)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].primary}
        />
      </View>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <Stack
          screenOptions={{
              headerStyle: {
                backgroundColor: Colors[colorScheme ?? "light"].card,
              },
              headerTintColor: Colors[colorScheme ?? "light"].foreground,
              headerTitleStyle: {
                color: Colors[colorScheme ?? "light"].foreground,
              },
              
            }}>
           <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen
  name="language"
  options={{
    title: t("profile.language"),
    
  }}
/>
            <Stack.Screen
            name="theme"
            options={{
            title: t("theme.appearance"),
            }
  }
/>
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false,
                presentation: "modal",
              }}
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
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}