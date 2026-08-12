import { ThemedText } from "@shared/components/themed-text";
import { Button } from "@shared/components/ui/button";
import { Colors, FontFamily, FontSize } from "@shared/constants/theme";
import { useColorScheme } from "@shared/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

import {
  Globe,
  Moon,
  Package,
  Pencil
} from "lucide-react-native";
import { ScrollView, View } from "react-native";






export default function ProfileScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const { t, i18n } = useTranslation();
  const stats = [
  { label: t("profile.orders"), value: "3" },
  { label: t("profile.wishlist"), value: "2" },
  { label: t("profile.reviews"), value: "12" },
];

  const menuItems = [
  { label: t("profile.myOrders"), value: "", Icon: Package },
  { label: t("profile.editProfile"), value: "", Icon: Pencil },
  {
    label: t("profile.appearance"),
    value: t("profile.lightMode"),
    Icon: Moon,
  },
  {
    label: t("profile.language"),
    value: t("profile.english"),
    Icon: Globe,
  },
];
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 20,
          paddingTop: 60,
          paddingBottom: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
          }}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: colors.primaryForeground,
              backgroundColor: colorScheme === "light"
                ? "#9B72E8"
                : colors.secondary,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              style={{
                color: colors.primaryForeground,
                fontSize: FontSize.xxl,
                fontFamily: FontFamily.semiBold,
              }}
            >
              SJ
            </ThemedText>
          </View>

          <View>
            <ThemedText
              style={{
                color: colors.primaryForeground,
                fontSize: FontSize.xxl,
                fontFamily: FontFamily.semiBold,
              }}
            >
              Sarah Johnson
            </ThemedText>

            <ThemedText
              style={{
                color: colorScheme === "light"
                  ? "#E5D9FF"
                  : colors.mutedForeground,
                fontSize: 15,
                marginTop: 4,
              }}
            >
              sarah@example.com
            </ThemedText>
          </View>
        </View>

        {/* Stats */}
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            marginTop: 25,
          }}
        >
          {stats.map((stat) => (
            <View
              key={stat.label}
              style={{
                flex: 1,
                backgroundColor: colorScheme === "light"
                  ? "#8050D8"
                  : colors.secondary,
                borderRadius: 18,
                paddingVertical: 15,
                alignItems: "center",
              }}
            >
              <ThemedText
                style={{
                  color: colors.primaryForeground,
                  fontSize: FontSize.xxl,
                  fontFamily: FontFamily.bold,
                }}
              >
                {stat.value}
              </ThemedText>

              <ThemedText
                style={{
                  color: colorScheme === "light"
                    ? "#E5D9FF"
                    : colors.mutedForeground,
                  fontSize: FontSize.sm,
                  marginTop: 3,
                }}
              >
                {stat.label}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      //menu
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 22,
          gap: 12,
        }}
        >
     
        {menuItems.map((item) => {
  const Icon = item.Icon;
        
  return (
          <Button
            key={item.label}
            variant="transparent"
            onPress={() => {
     if (item.label === t("profile.language")) {
    router.push("/language");
  }

       if (item.label === t("profile.editProfile")) {
      
      router.push("/edit-profile");
    }
    }}
            style={{
              height: 72,
              backgroundColor: colors.card,
              borderWidth: 1,
              borderColor: colors.border,
              borderRadius: 18,
              paddingHorizontal: 16,
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
                flex: 1,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  backgroundColor: colors.primaryLight,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
               <Icon
  size={20}
  color={colors.primary}
/>

              </View>

              <ThemedText
                style={{
                  color: colors.foreground,
                  fontSize: FontSize.md,
                  fontFamily: FontFamily.black,
                }}
              >
                {item.label}
              </ThemedText>
            </View>

            {item.value !== "" && (
              <ThemedText
                style={{
                  color: colors.mutedForeground,
                  fontSize: FontSize.sm,
                  marginRight: 10,
                }}
              >
                {item.value}
              </ThemedText>
            )}

            <ThemedText
              style={{
                color: colors.mutedForeground,
                fontSize: FontSize.xxl,
              }}
            >
              ›
            </ThemedText>
          </Button>
  );
        })}

        //logout button
        <Button
          variant="destructive"
          style={{
            height: 62,
    
          
            borderRadius: 16,
            marginTop: 5,
            paddingHorizontal: 16,
            paddingVertical: 14,
          }}
        >
          <ThemedText
            style={{
              color: colors.destructive,
              fontSize: FontSize.md,
              fontFamily: FontFamily.black,
            }}
          >
            {t("profile.logout")}
          </ThemedText>
        </Button>
      </View>
    </ScrollView>
  );
}