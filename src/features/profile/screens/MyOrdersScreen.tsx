import { ScreenHeader } from "@shared/components/ui/screen-header";
import { useTheme } from "@shared/hooks/use-theme";
import { Package } from "lucide-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OrderCardView } from "../components/OrderCard/OrderCardView";
import { OrderFilterChipsView } from "../components/OrderFilterChips/OrderFilterChipsView";
import { useCustomerOrders } from "../hooks/useCustomerOrders";
import { createMyOrdersScreenStyles } from "./myOrdersScreen.styles";

export default function MyOrdersScreen() {
  const { colors } = useTheme();
  const styles = createMyOrdersScreenStyles(colors);
  const { t } = useTranslation();
  const { orders, loading } = useCustomerOrders();
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredOrders = orders.filter((order) => {
    if (selectedFilter === "all") return true;
    return order.status.includes(selectedFilter);
  });

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
        <ScreenHeader title={t("profile.myOrders", { defaultValue: "My Orders" })} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }} edges={["top"]}>
      <ScreenHeader title={t("profile.myOrders", { defaultValue: "My Orders" })} />

      <View style={styles.container}>
        <OrderFilterChipsView
          selectedFilter={selectedFilter}
          onSelectFilter={setSelectedFilter}
        />

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Package size={56} color={colors.mutedForeground} opacity={0.4} />
            <Text style={styles.emptyTitle}>No Orders Found</Text>
            <Text style={styles.emptySubtitle}>
              You haven't placed any orders matching this status.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <OrderCardView order={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
