import { OrderItem } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import React from "react";
import { Image, Text, View } from "react-native";
import { createOrderCardStyles } from "./orderCard.styles";

interface OrderCardViewProps {
  order: OrderItem;
}

export function OrderCardView({ order }: OrderCardViewProps) {
  const { colors } = useTheme();
  const styles = createOrderCardStyles(colors);

  const displayedItems = order.items.slice(0, 3);
  const remainingCount = order.items.length - displayedItems.length;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <Text style={styles.orderDate}>{order.date}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>

      {displayedItems.length > 0 && (
        <View style={styles.itemsRow}>
          {displayedItems.map((item, index) => (
            <Image
              key={index}
              source={{ uri: item.image }}
              style={styles.thumbnail}
            />
          ))}
          {remainingCount > 0 && (
            <View style={styles.moreItemsBox}>
              <Text style={styles.moreItemsText}>+{remainingCount}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.footerRow}>
        <Text style={styles.itemCountText}>
          {order.items.length} {order.items.length === 1 ? "item" : "items"}
        </Text>
        <Text style={styles.totalPriceText}>
          {order.currencyCode} {order.total}
        </Text>
      </View>
    </View>
  );
}
