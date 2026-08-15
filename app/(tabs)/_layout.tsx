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

export default function TabLayout() {
  const { colors, isDark } = useTheme();

  const cart = useCartStore((state) => state.cart);
  const initializeCart = useCartStore((state) => state.initializeCart);

  useEffect(() => {
    initializeCart();
  }, [initializeCart]);

  const totalCartItems = cart?.lines.reduce((acc, line) => acc + line.quantity, 0) || 0;

  return (
    <Tabs
      backBehavior="history"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: isDark ? colors.background : colors.card,
          borderTopColor: colors.border,
          borderTopWidth: isDark ? 0 : 1,
          elevation: isDark ? 0 : 8,
          shadowOpacity: isDark ? 0 : 0.06,
        },
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
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
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
          title: "Wishlist",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          href: null,
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
