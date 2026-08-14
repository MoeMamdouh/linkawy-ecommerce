
import { useResolvedTheme } from "@shared/store/useThemeStore";

export function useColorScheme() {
  return useResolvedTheme();
}