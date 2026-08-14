
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useRNColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  /** null = follow system, otherwise user's manual choice */
  themeOverride: ThemeMode | null;
  isHydrated: boolean;
  setThemeOverride: (mode: ThemeMode) => void;
  setHydrated: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      themeOverride: null,
      isHydrated: false,
      setThemeOverride: (mode) => set({ themeOverride: mode }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

/** Resolves the active scheme: manual override wins, otherwise falls back to system */
export function useResolvedTheme(): ThemeMode {
  const systemScheme = useRNColorScheme();
  const themeOverride = useThemeStore((state) => state.themeOverride);

  if (themeOverride) return themeOverride;
  return systemScheme === "dark" ? "dark" : "light";
}