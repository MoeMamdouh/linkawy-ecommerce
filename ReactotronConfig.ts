/**
 * Reactotron — development-only debugging bridge.
 *
 * Loaded from app/_layout.tsx behind an `if (__DEV__)` require, so nothing here
 * runs in production builds.
 *
 * Usage: launch the Reactotron desktop app before `npm start`.
 * On an Android emulator also run `npm run reactotron:android` once per boot.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import reactotronZustand from 'reactotron-plugin-zustand';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query';

import { useHomeStore } from '@features/home/store/homeStore';
import { queryClient } from '@shared/query/client';

/**
 * The Reactotron desktop app listens on the dev machine. `hostUri` is the
 * address the device already uses to reach Metro, which is exactly the host we
 * need on physical devices over LAN. Tunnel URLs point at a relay instead of
 * the dev machine, so fall back to localhost there (Android emulators reach it
 * through `adb reverse`).
 */
const resolveHost = (): string => {
  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  if (!host || host.endsWith('exp.direct') || host.includes('ngrok')) {
    return 'localhost';
  }
  return host;
};

const queryClientManager = new QueryClientManager({ queryClient });

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({
    name: Constants.expoConfig?.name ?? 'linkawy-ecommerce',
    host: resolveHost(),
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative({
    // Apollo's HttpLink and plain fetch() calls both surface here.
    networking: { ignoreUrls: /symbolicate|\/logs|\/inspector/ },
  })
  .use(reactotronReactQuery(queryClientManager))
  .use(
    reactotronZustand({
      stores: [{ name: 'home', store: useHomeStore }],
      omitFunctionKeys: true,
    })
  )
  .connect();

// Drop logs from the previous session so each reload starts clean.
reactotron.clear();

// Available app-wide as `console.tron` (typed in src/shared/types/reactotron.d.ts).
console.tron = reactotron;

export default reactotron;
