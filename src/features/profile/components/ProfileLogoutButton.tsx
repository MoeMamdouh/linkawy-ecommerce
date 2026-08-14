import { Button } from "@shared/components/ui/button";
import { LogOut } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

interface ProfileLogoutButtonProps {
  onPress: () => void;
  isLoggingOut: boolean;
}

export function ProfileLogoutButton({ onPress, isLoggingOut }: ProfileLogoutButtonProps) {
  const { t } = useTranslation();

  return (
    <Button
      onPress={onPress}
      disabled={isLoggingOut}
      variant="destructive"
      style={{
        height: 62,
        borderRadius: 16,
        marginTop: 5,
        paddingHorizontal: 16,
        paddingVertical: 14,
      }}
    >
      <LogOut size={18} color="#f00" />
      <Text style={{ color: "#f00" }} className="font-semibold">
        {isLoggingOut ? t("profile.signingOut") : t("profile.logout")}
      </Text>
    </Button>
  );
}