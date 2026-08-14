import { Button } from "@shared/components/ui/button";
import { useRouter } from "expo-router";
import { LogIn } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export function SignedOutState() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 justify-center items-center p-6 bg-background">
      <Button onPress={() => router.push("/login")}>
        <LogIn size={20} color="#fff" />
        <Text className="text-white font-bold ml-2">{t("profile.signIn")}</Text>
      </Button>
    </View>
  );
}