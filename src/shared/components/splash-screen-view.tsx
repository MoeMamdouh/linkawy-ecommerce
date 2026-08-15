import React from "react";
import { View, Text } from "react-native";
import { ShoppingBag } from "lucide-react-native";
import { useTheme } from "@shared/hooks/use-theme";
import { FontFamily, FontSize } from "@shared/constants/theme";

interface SplashScreenViewProps {
  appName?: string;
  tagline?: string;
}

export const SplashScreenView = ({
  appName = "LINKAWY",
  tagline = "Your Ultimate Shop",
}: SplashScreenViewProps) => {
  const { colors } = useTheme();

  return (
    <View className="flex-1 items-center justify-center relative" style={{ backgroundColor: colors.primary }}>
      {/* Background Decorative Circles */}
      <View
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full"
        style={{backgroundColor: colors.primaryForeground, opacity: 0.1 }}
      />
      <View
        className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full"
        style={{ backgroundColor: colors.primaryForeground, opacity: 0.05 }}
      />
      <View
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{ backgroundColor: colors.primaryForeground, opacity: 0.05, top: "50%", left: "50%", transform: [{ translateX: -250 }, { translateY: -250 }] }}
      />

      {/* Main Content */}
      <View className="z-10 items-center">
        <View className="w-24 h-24 rounded-[28px] items-center justify-center mb-5 border" style={{backgroundColor: colors.primaryForeground, opacity: 0.2 , borderColor: colors.primaryForeground, borderWidth: 1}}>
          <ShoppingBag size={44} color={colors.primaryForeground} />
        </View>
        <Text className="tracking-[0.15em]" style={{ color: colors.primaryForeground, fontFamily: FontFamily.black, fontSize: FontSize.splashAppName }}>
          {appName}
        </Text>
        <Text className="mt-2 tracking-[0.2em] uppercase" style={{ color: colors.primaryForeground, opacity: 0.6, fontFamily: FontFamily.regular, fontSize: FontSize.sm }}>
          {tagline}
        </Text>
      </View>
    </View>
  );
};
