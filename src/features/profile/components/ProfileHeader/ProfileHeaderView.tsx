import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { Text, View } from "react-native";
import { createProfileHeaderStyles } from "./profileHeader.styles";

interface ProfileHeaderViewProps {
  firstName: string;
  lastName?: string;
  email?: string;
  children?: React.ReactNode;
}

export function ProfileHeaderView({
  firstName,
  lastName = "",
  email = "",
  children,
}: ProfileHeaderViewProps) {
  const { colors } = useTheme();
  const styles = createProfileHeaderStyles(colors);

  const initials = `${firstName?.[0] || "U"}${lastName?.[0] || ""}`.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {firstName} {lastName}
          </Text>
          {!!email && <Text style={styles.userEmail}>{email}</Text>}
        </View>
      </View>

      {children}
    </View>
  );
}
