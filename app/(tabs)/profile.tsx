import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { router } from "expo-router";

import { useAuthStore } from "@features/customer/store/useAuthStore";
import { useCustomerProfile, useLogout } from "@features/customer/hooks/useCustomerAuth";
import { LogIn, LogOut } from "lucide-react-native";
import { Button } from "@shared/components/ui/button";

export default function ProfileScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // 1. Apollo useQuery uses `loading` (not `isLoading`)
  const { data: profileData, loading } = useCustomerProfile();

  // 2. Apollo useLogout hook returns { logout }
  const { logout } = useLogout();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
  const customer = profileData?.customer;

  return (
    <View className="flex-1 p-6 justify-center items-center bg-background">
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View className="items-center w-full gap-4">
          {/* Display Customer Info */}
          <View className="items-center mb-4">
            <Text className="text-2xl font-bold text-foreground">
              Hello, {customer?.firstName || "Customer"} 👋
            </Text>
            {customer?.email && (
              <Text className="text-mutedForeground text-sm mt-1">
                {customer.email}
              </Text>
            )}
          </View>

          {/* Sign Out Button */}
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
      )}
    </View>
  );
}