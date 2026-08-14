import { useLogout } from "@features/auth/hooks/useAuth";
import { useAuthStore } from "@features/auth/store/useAuthStore";
import { useCustomerProfile } from "@features/customer/hooks/useCustomer";
import { useWishlistStore } from "@features/wishlist/store/useWishlistStore";
import { useCallback, useEffect, useState } from "react";

export function useProfileScreen() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const { data: profileData, loading, error } = useCustomerProfile();
  const { logout } = useLogout();

  const wishlistCount = useWishlistStore((state) => state.items.length);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const customer = profileData?.customer ?? null;

  useEffect(() => {
    if (isAuthenticated && !loading && error) {
      void logout();
    }
  }, [error, isAuthenticated, loading, logout, profileData]);

  const handleLogout = useCallback(async () => {
    setIsLoggingOut(true);
    try {
      await logout();
    } catch (e) {
      console.warn("Logout error:", e);
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout]);

  return {
    isAuthenticated,
    isHydrated,
    loading,
    error,
    customer,
    wishlistCount,
    isLoggingOut,
    handleLogout,
  };
}
