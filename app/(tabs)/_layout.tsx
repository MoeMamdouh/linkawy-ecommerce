import { Tabs } from 'expo-router';
import { Heart, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native';
import React, { useEffect } from 'react';

import { HapticTab } from '@shared/components/haptic-tab';
import { Colors, FontFamily } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { useCartStore } from '@features/cart/store/cartStore';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme ?? 'light';
  const activeColor = Colors[theme].tabIconSelected;
  const inactiveColor = Colors[theme].tabIconDefault;

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
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarButton: HapticTab,
        tabBarLabelStyle: {
          fontFamily: FontFamily.medium,
          fontSize: 10,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'index') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'shop') {
            return <ShoppingBag color={color} size={size} />;
          } else if (route.name === 'cart') {
            return <ShoppingCart color={color} size={size} />;
          } else if (route.name === 'wishlist') {
            return <Heart color={color} size={size} />;
          } else if (route.name === 'profile') {
            return <User color={color} size={size} />;
          }
          return null;
        },
      })}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: 'Shop',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: totalCartItems > 0 ? totalCartItems : undefined,
          tabBarBadgeStyle: {
            backgroundColor: Colors[theme].danger,
            color: Colors[theme].white,
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
          title: 'Wishlist',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
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
