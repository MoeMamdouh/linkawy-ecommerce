// ReactotronConfig.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { NativeModules } from 'react-native';
import reactotronZustand from 'reactotron-plugin-zustand';
import Reactotron from 'reactotron-react-native';
import { QueryClientManager, reactotronReactQuery } from 'reactotron-react-query';

import { useHomeStore } from '@features/home/store/homeStore';
import { queryClient } from '@shared/query/client';

if (__DEV__) {
  const resolveHost = (): string => {
    const scriptURL = NativeModules.SourceCode?.scriptURL;
    if (scriptURL) {
      const host = scriptURL.split('://')[1]?.split('/')[0]?.split(':')[0];
      if (host && host !== 'localhost' && host !== '127.0.0.1') {
        return host;
      }
    }

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
      asyncStorage: true,
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
}