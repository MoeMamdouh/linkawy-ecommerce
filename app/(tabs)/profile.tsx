import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import { useLogout } from "@features/auth/hooks/useAuth";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { Button } from "@shared/components/ui/button";
import { LogIn, LogOut } from "lucide-react-native";

export default function ProfileScreen() {
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
      <View className="flex-1 justify-center items-center p-6 bg-background">
        <Button onPress={() => router.push("/login")}>
          <LogIn size={20} color="#fff" />
          <Text className="text-white font-bold ml-2">Sign In</Text>
        </Button>
      </View>
    );
  }

  // --- LOGGED-IN VIEW ---
  if (!isHydrated || loading) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-background">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !customer) {
    return (
      <View className="flex-1 justify-center items-center p-6 bg-background">
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
    );
  }

  return (
    <View className="flex-1 p-6 justify-center items-center bg-background">
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
  );
}
