import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useLogout } from "@features/auth/hooks/useAuth";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { Button } from "@shared/components/ui/button";
import { LogIn, LogOut, ChevronLeft } from "lucide-react-native";
import { useTheme } from "@shared/hooks/use-theme";

export default function ProfileScreen() {
  const { colors } = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const { data: profileData, loading, error } = useCustomerProfile();

  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const customer = profileData?.customer ?? null;

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

  // --- GUEST VIEW ---
  if (!isAuthenticated) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ChevronLeft color={colors.foreground} size={28} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center p-6">
          <Button onPress={() => router.push("/login")}>
            <LogIn size={20} color="#fff" />
            <Text className="text-white font-bold ml-2">Sign In</Text>
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  // --- LOGGED-IN VIEW ---
  if (!isHydrated || loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ChevronLeft color={colors.foreground} size={28} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center p-6">
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !customer) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="px-6 py-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <ChevronLeft color={colors.foreground} size={28} />
          </TouchableOpacity>
        </View>
        <View className="flex-1 justify-center items-center p-6">
          <View className="items-center gap-4 w-full">
            <View className="items-center">
              <Text className="text-2xl font-bold text-foreground text-center">
                Your session expired
              </Text>
              <Text className="text-mutedForeground text-sm mt-1 text-center">
                Please sign in again to view your profile.
              </Text>
            </View>

            <Button onPress={() => router.push("/login")} className="w-full">
              <LogIn size={20} color="#fff" />
              <Text className="text-white font-bold ml-2">Sign In</Text>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="px-6 py-4 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft color={colors.foreground} size={28} />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-foreground">Profile</Text>
      </View>
      <View className="flex-1 p-6 justify-center items-center">
        <View className="items-center w-full gap-4">
          <View className="items-center mb-4">
            <Text style={{ color: "#da2222" }} >
              Hello, {customer.firstName || "Customer"}
            </Text>
            {customer.email && (
              <Text style={{ color: "#da2222" }}>
                {customer.email}
              </Text>
            )}
          </View>

          <Button
            onPress={handleLogout}
            disabled={isLoggingOut}
            variant="destructive"
            className="w-full flex-row items-center justify-center gap-2"
          >
            <LogOut size={18} color="#f00" />
            <Text style={{ color: "#f00" }} className="font-semibold">
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
