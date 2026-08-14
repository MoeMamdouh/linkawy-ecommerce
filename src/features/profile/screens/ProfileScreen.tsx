import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfileGuestView } from "../components/ProfileGuestView/ProfileGuestView";
import { ProfileHeaderView } from "../components/ProfileHeader/ProfileHeaderView";
import { ProfileMenuItemView } from "../components/ProfileMenuItem/ProfileMenuItemView";
import { ProfileStatsView } from "../components/ProfileStats/ProfileStatsView";
import { useProfileMenu } from "../hooks/useProfileMenu";
import { useProfileScreen } from "../hooks/useProfileScreen";
import { createProfileScreenStyles } from "./profileScreen.styles";

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const styles = createProfileScreenStyles(colors);

  const {
    isAuthenticated,
    isHydrated,
    loading,
    error,
    customer,
    wishlistCount,
    handleLogout,
  } = useProfileScreen();

  const { stats, menuItems, logoutMenuItem } = useProfileMenu({
    wishlistCount,
    onLogout: handleLogout,
  });

  const handleSignIn = () => {
    router.push("/login");
  };

  if (!isHydrated || (isAuthenticated && loading)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!isAuthenticated || error || !customer) {
    return <ProfileGuestView onSignInPress={handleSignIn} />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header & Stats */}
        <ProfileHeaderView
          firstName={customer.firstName || "Customer"}
          lastName={customer.lastName || ""}
          email={customer.email || ""}
        >
          <ProfileStatsView stats={stats} />
        </ProfileHeaderView>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map(({ key, ...itemProps }) => (
            <ProfileMenuItemView key={key} {...itemProps} />
          ))}

          {/* Destructive Logout Button */}
          <ProfileMenuItemView {...logoutMenuItem} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}