import { FontFamily, FontSize } from "@shared/constants/theme";
import { Text, View } from "react-native";
import { ShoppingBag } from 'lucide-react-native';
import { useTheme } from "@shared/hooks/use-theme";

export default function LoginHeader() {
  const { colors } = useTheme();

  return (
    <View className="flex items-start justify-center px-6 pt-14 pb-8" style={{ backgroundColor: colors.primary }}>
      <View className="flex-row items-center gap-3 mb-1">
        <View className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: colors.primaryForeground, opacity: 0.2 }}>
          <ShoppingBag color={colors.primaryForeground} size={18} />
        </View>
        <Text style={{ color: colors.primaryForeground, fontFamily: FontFamily.black, fontSize: FontSize.xl }}>Linkawy</Text>
      </View>
      <Text className="pt-5" style={{ color: colors.primaryForeground, fontFamily: FontFamily.black, fontSize: FontSize.xxl }}>
        Sign In
      </Text>
      <Text className="pt-1" style={{ color: colors.primaryForeground, opacity: 0.6, fontFamily: FontFamily.regular, fontSize: FontSize.sm }}>
        Welcome back!
      </Text>
    </View>
  );
}