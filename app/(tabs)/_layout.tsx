import { Tabs } from 'expo-router';
import { Heart, Home, ShoppingBag, ShoppingCart, User } from 'lucide-react-native';
import React from 'react';

import { HapticTab } from '@shared/components/haptic-tab';
import { Colors, FontFamily } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const activeColor = Colors[colorScheme ?? 'light'].tabIconSelected;
  const inactiveColor = Colors[colorScheme ?? 'light'].tabIconDefault;

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
