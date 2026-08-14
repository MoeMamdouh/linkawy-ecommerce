import { UserAddress } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import { MapPin } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import { createAddressCardStyles } from "./addressCard.styles";

interface AddressCardViewProps {
  address: UserAddress;
}

export function AddressCardView({ address }: AddressCardViewProps) {
  const { colors } = useTheme();
  const styles = createAddressCardStyles(colors);

  const cityStateZip = [address.city, address.province, address.zip]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MapPin size={22} color={colors.primary} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.streetAddress}>
            {address.address1} {address.address2 ? `(${address.address2})` : ""}
          </Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>Default</Text>
            </View>
          )}
        </View>

        {!!cityStateZip && <Text style={styles.subText}>{cityStateZip}</Text>}
        {!!address.country && <Text style={styles.subText}>{address.country}</Text>}
        {!!address.phone && <Text style={styles.subText}>{address.phone}</Text>}
      </View>
    </View>
  );
}
