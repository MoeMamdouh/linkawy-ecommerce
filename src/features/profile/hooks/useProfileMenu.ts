import { ProfileMenuItem, ProfileStat } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import { useRouter } from "expo-router";
import { Globe, LogOut, MapPin, Moon, Package, Pencil } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useCustomerAddresses } from "./useCustomerAddresses";

interface UseProfileMenuArgs {
  ordersCount?: string | number;
  wishlistCount?: string | number;
  reviewsCount?: string | number;
  onLogout?: () => void;
}

export function useProfileMenu({
  ordersCount = 0,
  wishlistCount = 0,
  reviewsCount = 12,
  onLogout,
}: UseProfileMenuArgs = {}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const { scheme } = useTheme();
  const { addressCount } = useCustomerAddresses();

  const stats: ProfileStat[] = [
    { label: t("profile.orders", { defaultValue: "Orders" }), value: ordersCount },
    { label: t("profile.wishlist", { defaultValue: "Wishlist" }), value: wishlistCount },
    { label: t("profile.reviews", { defaultValue: "Reviews" }), value: reviewsCount },
  ];

  const currentThemeLabel =
    scheme === "dark"
      ? t("profile.darkMode", { defaultValue: "Dark Mode" })
      : t("profile.lightMode", { defaultValue: "Light Mode" });

  const currentLanguageLabel =
    i18n.language === "ar"
      ? t("profile.arabic", { defaultValue: "Arabic" })
      : t("profile.english", { defaultValue: "English" });

  const addressCountLabel = addressCount
    ? `${addressCount} ${addressCount === 1 ? "address" : "addresses"}`
    : "";

  const menuItems: ProfileMenuItem[] = [
    {
      key: "orders",
      label: t("profile.myOrders", { defaultValue: "My Orders" }),
      value: "",
      Icon: Package,
      onPress: () => router.push("/orders" as any),
    },
    {
      key: "addresses",
      label: "Address List",
      value: addressCountLabel,
      Icon: MapPin,
      onPress: () => router.push("/addresses" as any),
    },
    {
      key: "edit",
      label: t("profile.editProfile", { defaultValue: "Edit Profile" }),
      value: "",
      Icon: Pencil,
      onPress: () => router.push("/edit-profile" as any),
    },
    {
      key: "appearance",
      label: t("profile.appearance", { defaultValue: "Appearance" }),
      value: currentThemeLabel,
      Icon: Moon,
      onPress: () => router.push("/theme" as any),
    },
    {
      key: "language",
      label: t("profile.language", { defaultValue: "Language" }),
      value: currentLanguageLabel,
      Icon: Globe,
      onPress: () => router.push("/language" as any),
    },
  ];

  const logoutMenuItem: ProfileMenuItem = {
    key: "logout",
    label: t("profile.logout", { defaultValue: "Logout" }),
    Icon: LogOut,
    isDestructive: true,
    onPress: () => onLogout?.(),
  };

  return { stats, menuItems, logoutMenuItem };
}
