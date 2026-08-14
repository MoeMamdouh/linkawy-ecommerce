import { UserAddress } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import { MapPin } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { createAddressCardStyles } from "./addressCard.styles";

interface AddressCardViewProps {
  address: UserAddress;
}

export function AddressCardView({ address }: AddressCardViewProps) {
  const { colors } = useTheme();
  const styles = createAddressCardStyles(colors);
  const { t, i18n } = useTranslation();
  const isRTL = (i18n.language || "en").startsWith("ar");

  const cityStateZip = [address.city, address.province, address.zip]
    .filter(Boolean)
    .join(", ");

  const textAlignStyle = { textAlign: isRTL ? ("right" as const) : ("left" as const) };

  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MapPin size={22} color={colors.primary} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.headerRow}>
          <Text style={[styles.streetAddress, textAlignStyle]}>
            {address.address1} {address.address2 ? `(${address.address2})` : ""}
          </Text>
          {address.isDefault && (
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>
                {t("profile.default", { defaultValue: "Default" })}
              </Text>
            </View>
          )}
        </View>

        {!!cityStateZip && <Text style={[styles.subText, textAlignStyle]}>{cityStateZip}</Text>}
        {!!address.country && <Text style={[styles.subText, textAlignStyle]}>{address.country}</Text>}
        {!!address.phone && <Text style={[styles.subText, textAlignStyle]}>{address.phone}</Text>}
      </View>
    </View>
  );
}
