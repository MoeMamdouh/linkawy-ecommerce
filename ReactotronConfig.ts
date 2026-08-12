import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { NativeModules } from 'react-native'; // <-- Add NativeModules import
import reactotronZustand from 'reactotron-plugin-zustand';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query';

import { useHomeStore } from '@features/home/store/homeStore';
import { queryClient } from '@shared/query/client';

/**
 * Resolves the host IP address of the development machine running Reactotron.
 * 
 * Inspects `NativeModules.SourceCode.scriptURL` which dynamically contains
 * the dev server IP address used by Metro to serve the bundle.
 */

const resolveHost = (): string => {
  // 1. Check NativeModules scriptURL
  const scriptURL = NativeModules.SourceCode?.scriptURL;
  if (scriptURL) {
    const host = scriptURL.split('://')[1]?.split('/')[0]?.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return host;
    }
  }

  // 2. Check Expo Manifest & Config fallbacks
  const hostUri =
    Constants.expoConfig?.hostUri ||
    (Constants.manifest as any)?.debuggerHost ||
    (Constants.manifest2 as any)?.extra?.expoGo?.developer?.tool;

  if (hostUri) {
    const host = hostUri.split(':')[0];
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return host;
    }
  }

  // 3. Fallback to localhost (for emulators/simulators)
  return 'localhost';
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

reactotron.clear();

console.tron = reactotron;

export default reactotron;