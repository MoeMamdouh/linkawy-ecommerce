import { Tabs } from "expo-router";
import {
  Heart,
  Home,
  ShoppingBag,
  ShoppingCart,
  User,
} from "lucide-react-native";

import { HapticTab } from "@shared/components/haptic-tab";
import { FontFamily } from "@shared/constants/theme";
import { useTheme } from "@shared/hooks/use-theme";

export default function TabLayout() {
  const { colors } = useTheme();

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
    </Tabs>
  );
}
