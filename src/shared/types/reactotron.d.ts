import type { ReactotronReactNative } from 'reactotron-react-native';

declare global {
  interface Console {
    /**
     * Reactotron client, wired up in ReactotronConfig.ts.
     *
     * Only present in development builds — guard usage with `__DEV__` or the
     * optional call form: `console.tron?.log?.('...')`.
     */
    tron: ReactotronReactNative;
  }
}

export {};
