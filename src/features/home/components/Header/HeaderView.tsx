// ──────────────────────────────────────────────
// Header — View
// ──────────────────────────────────────────────

import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import { Bell, Search, ShoppingCart } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { createHeaderStyles } from "./header.styles";

interface HeaderViewProps {
  displayName?: string;
  isCustomer?: boolean;
  notificationCount?: number;
  cartCount?: number;
  showSearchIcon?: boolean;
  onSearchPress?: () => void;
}

const HeaderView: React.FC<HeaderViewProps> = ({
  displayName,
  isCustomer = false,
  notificationCount = 0,
  cartCount = 0,
  showSearchIcon = false,
  onSearchPress,
}) => {
  const { colors } = useTheme();
  const styles = createHeaderStyles(colors);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Left: Greeting */}
      <View style={styles.leftSection}>
        <View style={styles.greetingContainer}>
          <Text style={styles.welcomeText}>
            {isCustomer ? "WELCOME BACK," : "WELCOME"}
          </Text>
          <Text style={styles.nameText}>{displayName || "Our Customer"}</Text>
        </View>
      </View>

      {/* Right: Search (if scrolling) + Notification + Cart */}
      <View style={styles.rightSection}>
        {showSearchIcon && (
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={onSearchPress}
          >
            <Search size={20} color={colors.foreground} />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Bell size={20} color={colors.foreground} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push("/cart")}
        >
          <ShoppingCart size={20} color={colors.foreground} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderView;
