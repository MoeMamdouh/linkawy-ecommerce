import { Tabs } from "expo-router";
import {
  Heart,
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react-native";

import { useCartStore } from "@features/cart/store/cartStore";
import { HapticTab } from "@shared/components/haptic-tab";
import { FontFamily } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
export default function TabLayout() {
  const { colors } = useTheme();
  const { t } = useTranslation();

  const cart = useCartStore((state) => state.cart);
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const totalCartItems = cart?.lines.reduce((acc, line) => acc + line.quantity, 0) || 0;

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarButton: (props: any) => <HapticTab {...props} />,
        tabBarLabelStyle: {
          fontFamily: FontFamily.medium,
          fontSize: 10,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === "index") {
            return <Home color={color} size={size} />;
          } else if (route.name === "shop") {
            return <ShoppingBag color={color} size={size} />;
          } else if (route.name === "cart") {
            return <ShoppingCart color={color} size={size} />;
          } else if (route.name === "wishlist") {
            return <Heart color={color} size={size} />;
          } else if (route.name === "profile") {
            return <User color={color} size={size} />;
          }
          return null;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home.title"),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: t("shop.title"),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t("cart.title"),
          tabBarBadge: totalCartItems > 0 ? totalCartItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.destructive,
            color: colors.white,
            fontFamily: FontFamily.bold,
            fontSize: 10,
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            lineHeight: 15,
            textAlign: 'center',
            textAlignVertical: 'center',
            padding: 0,
          },
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: t("wishlist.title"),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile.title"),
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
