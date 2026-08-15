import { useTheme } from "@shared/hooks/use-theme";
import { LogIn, User } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { createProfileGuestViewStyles } from "./profileGuestView.styles";

interface ProfileGuestViewProps {
  onSignInPress: () => void;
  title?: string;
  subtitle?: string;
}

export function ProfileGuestView({
  onSignInPress,
  title,
  subtitle,
}: ProfileGuestViewProps) {
  const { colors } = useTheme();
  const styles = createProfileGuestViewStyles(colors);
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <User size={32} color={colors.primary} />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>
            {title || t("profile.sessionExpiredTitle", { defaultValue: "Sign In Required" })}
          </Text>
          <Text style={styles.subtitle}>
            {subtitle || t("profile.sessionExpiredMessage", { defaultValue: "Please sign in to access your profile." })}
          </Text>
        </View>

        <TouchableOpacity
          onPress={onSignInPress}
          activeOpacity={0.8}
          style={styles.button}
        >
          <LogIn size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>{t("profile.signIn", { defaultValue: "Sign In" })}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
