import { ProfileMenuItem, ProfileStat } from "@features/profile/types/profile.types";
import { useResolvedTheme } from "@shared/store/useThemeStore";
import { useRouter } from "expo-router";
import { Globe, Moon, Package, Pencil } from "lucide-react-native";
import { useTranslation } from "react-i18next";

interface UseProfileMenuArgs {
  ordersCount?: string;
  wishlistCount?: string;
  reviewsCount?: string;
}

export function useProfileMenu({
  ordersCount = "3",
  wishlistCount = "2",
  reviewsCount = "12",
}: UseProfileMenuArgs = {}) {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const themeMode = useResolvedTheme();

  const stats: ProfileStat[] = [
    { label: t("profile.orders"), value: ordersCount },
    { label: t("profile.wishlist"), value: wishlistCount },
    { label: t("profile.reviews"), value: reviewsCount },
  ];

  const currentThemeLabel =
    themeMode === "dark" ? t("profile.darkMode") : t("profile.lightMode");

  const currentLanguageLabel =
    i18n.language === "ar" ? t("profile.arabic") : t("profile.english");

  const menuItems: ProfileMenuItem[] = [
    {
      key: "orders",
      label: t("profile.myOrders"),
      value: "",
      Icon: Package,
      onPress: () => {}, //TODO: create a new page named orders and add the orders screen to it
    },
    {
      key: "edit",
      label: t("profile.editProfile"),
      value: "",
      Icon: Pencil,
      onPress: () => router.push("/edit-profile"),
    },
    {
      key: "appearance",
      label: t("profile.appearance"),
      value: currentThemeLabel,
      Icon: Moon,
      onPress: () => router.push("/theme"),
    },
    {
      key: "language",
      label: t("profile.language"),
      value: currentLanguageLabel,
      Icon: Globe,
      onPress: () => router.push("/language"),
    },
  ];

  return { stats, menuItems };
}