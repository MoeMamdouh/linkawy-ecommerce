import { ApolloProvider } from '@apollo/client/react';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  Outfit_900Black,
  useFonts,
} from '@expo-google-fonts/outfit';
import { Colors } from '@shared/constants/theme';
import apolloClient from '@shared/graphql/client';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { initializeI18n } from "@shared/i18n";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";

import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import "../global.css";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // disables the strict-mode checks
});

export const unstable_settings = {
  anchor: '(tabs)',
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data remains fresh for 5 minutes
      gcTime: 1000 * 60 * 24,   // Cache retained for 24 hours
    },
  },
});

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);
const colorScheme = useColorScheme();

  
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
      console.error('Error loading fonts:', fontError);
    }
  }, [fontError]);

  if (!i18nReady || (!fontsLoaded && !fontError)) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        }}
      >
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? 'light'].primary}
        />
      </View>
    );
  }

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
         
         
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
         
         
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
}
