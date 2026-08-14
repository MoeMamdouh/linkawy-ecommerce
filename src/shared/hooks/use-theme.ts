import { useColorScheme as useRNColorScheme } from "react-native";
import { useColorScheme as useNWColorScheme } from "nativewind";
import { Colors } from "@shared/constants/theme";

export function useTheme() {
  const rnColorScheme = useRNColorScheme();
  const { colorScheme: nwColorScheme } = useNWColorScheme();

  const activeScheme = nwColorScheme || rnColorScheme;
  const scheme = activeScheme === "dark" ? "dark" : "light";

  return {
    colors: Colors[scheme],
    isDark: scheme === "dark",
    scheme,
  };
}