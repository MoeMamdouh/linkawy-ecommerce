import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ShoppingBag, Truck, CreditCard, ArrowRight } from "lucide-react-native";

import { useTheme } from "@shared/hooks/use-theme";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { FontFamily, FontSize, Palette } from "@shared/constants/theme";
import { Button } from "@shared/components/ui/button";

export default function OnboardingScreen() {
  const { colors, isDark } = useTheme();
  const [onboardStep, setOnboardStep] = useState(0);
  const completeOnboarding = useAuthStore((state) => state.completeOnboarding);

  const slides = [
    {
      Icon: ShoppingBag,
      title: "Discover Top Products",
      desc: "Explore thousands of products with unbeatable prices and exclusive deals.",
      bg: colors.secondary,
      iconColor: isDark ? Palette.purple400 : Palette.purple600,
    },
    {
      Icon: Truck,
      title: "Fast & Reliable Shipping",
      desc: "Get your packages delivered right to your door with real-time tracking.",
      bg: isDark ? "rgba(59, 130, 246, 0.15)" : "#E0F2FE",
      iconColor: isDark ? Palette.blue400 : Palette.blue500,
    },
    {
      Icon: CreditCard,
      title: "Safe & Flexible Payment",
      desc: "Pay securely with multiple payment options including Cash on Delivery.",
      bg: isDark ? "rgba(16, 185, 129, 0.15)" : "#D1FAE5",
      iconColor: Palette.green500,
    },
  ];

  const slide = slides[onboardStep];

  const handleFinish = async () => {
    await completeOnboarding();
    router.replace("/(tabs)");
  };

  const handleNext = () => {
    if (onboardStep < slides.length - 1) {
      setOnboardStep((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-between" style={{ backgroundColor: colors.background }}>
      {/* Header: Skip Button */}
      <View className="flex-row justify-end px-5 pt-3">
        <TouchableOpacity onPress={handleFinish} hitSlop={15}>
          <Text style={{ color: colors.mutedForeground, fontFamily: FontFamily.medium, fontSize: FontSize.sm }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Slide Content */}
      <View className="flex-1 items-center justify-center px-8 text-center">
        <View
          className="w-52 h-52 rounded-[40px] items-center justify-center mb-8"
          style={{ backgroundColor: slide.bg }}
        >
          <slide.Icon size={90} color={slide.iconColor} />
        </View>

        <Text className="text-center leading-tight" style={{color: colors.foreground, fontFamily: FontFamily.black, fontSize: FontSize.xxl }}>
          {slide.title}
        </Text>

        <Text className="mt-3 text-center leading-relaxed max-w-xs" style={{ color: colors.mutedForeground, fontFamily: FontFamily.regular, fontSize: FontSize.sm }}>
          {slide.desc}
        </Text>
      </View>

      {/* Footer Navigation */}
      <View className="flex-row items-center justify-between px-8 pb-8">
        {/* Step Dots */}
        <View className="flex-row gap-2">
          {slides.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => setOnboardStep(i)}
              className={`h-2 rounded-full ${
                i === onboardStep ? "w-8" : "w-2"
                  }`}
                  style={{ backgroundColor: i === onboardStep ? colors.primary : colors.muted }}
            />
          ))}
        </View>

        {/* Action Button */}
        <Button
          onPress={handleNext}
          className="rounded-2xl gap-2 shadow-lg w-fit px-7 py-3 h-auto"
        >
          <Text style={{color: colors.primaryForeground, fontFamily: FontFamily.bold, fontSize: FontSize.md }}>
            {onboardStep < slides.length - 1 ? "Next" : "Get Started"}
          </Text>
          <ArrowRight size={18} color={colors.primaryForeground} />
        </Button>
      </View>
    </SafeAreaView>
  );
}