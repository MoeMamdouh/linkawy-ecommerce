
import { Colors } from "@shared/constants/theme";
import { useResolvedTheme } from "@shared/store/useThemeStore";

export function useTheme() {
  const scheme = useResolvedTheme();

  return {
    colors: Colors[scheme],
    isDark: scheme === "dark",
    scheme,
  };
}