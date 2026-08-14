import { useLogout } from "@features/auth/hooks/useAuth";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { ProfileHeaderCard } from "@features/profile/components/ProfileHeaderCard";
import { ProfileLogoutButton } from "@features/profile/components/ProfileLogoutButton";
import { ProfileMenuList } from "@features/profile/components/ProfileMenuList";
import { SessionExpiredState } from "@features/profile/components/SessionExpiredState";
import { SignedOutState } from "@features/profile/components/SignOutState";
import { useProfileMenu } from "@features/profile/hooks/useProfileMenu";
import { Colors } from "@shared/constants/theme";
import { useColorScheme } from "@shared/hooks/use-color-scheme";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

export default function ProfileScreen() {
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const { data: profileData, loading, error } = useCustomerProfile();
  const { logout } = useLogout();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const customer = profileData?.customer ?? null;
  const { stats, menuItems } = useProfileMenu();

  useEffect(() => {
    if (isAuthenticated && !loading && error) {
      void logout();
    }
  }, [error, isAuthenticated, loading, logout, profileData]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (e) {
      console.warn("Logout failed:", e);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!isAuthenticated) {
    return <SignedOutState />;
  }

  if (!isHydrated || loading) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !customer) {
    return <SessionExpiredState />;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <ProfileHeaderCard
        firstName={customer?.firstName ?? undefined}
        lastName={customer?.lastName ?? undefined}
        email={customer?.email ?? undefined}
        stats={stats}
        colorScheme={colorScheme}
      />

      <View style={{ paddingHorizontal: 20, paddingTop: 22, gap: 12 }}>
        <ProfileMenuList items={menuItems} colorScheme={colorScheme} />
        <ProfileLogoutButton onPress={handleLogout} isLoggingOut={isLoggingOut} />
      </View>
    </ScrollView>
  );
}