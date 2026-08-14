import { Button } from "@shared/components/ui/button";
import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function SessionExpiredState() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <View className="items-center gap-4 w-full">
        <View className="items-center">
          <Text className="text-2xl font-bold text-foreground text-center">
            {t("profile.sessionExpiredTitle")}
          </Text>
          <Text className="text-mutedForeground text-sm mt-1 text-center">
            {t("profile.sessionExpiredMessage")}
          </Text>
        </View>

        <Button onPress={() => router.push("/login")} className="w-full">
          <LogIn size={20} color="#fff" />
          <Text className="text-white font-bold ml-2">{t("profile.signIn")}</Text>
        </Button>
      </View>
    </View>
  );
}