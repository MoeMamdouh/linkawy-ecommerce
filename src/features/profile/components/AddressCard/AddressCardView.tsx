import { useDeleteAddress } from "@features/profile/hooks/useDeleteAddress";
import { UserAddress } from "@features/profile/types/profile.types";
import { useTheme } from "@shared/hooks/use-theme";
import { MapPin, Trash2 } from "lucide-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { createAddressCardStyles } from "./addressCard.styles";

interface AddressCardViewProps {
  address: UserAddress;
  onDeleteSuccess?: () => void;
}

export function AddressCardView({ address, onDeleteSuccess }: AddressCardViewProps) {
  const { colors } = useTheme();
  const styles = createAddressCardStyles(colors);
  const { t, i18n } = useTranslation();
  const isRTL = (i18n.language || "en").startsWith("ar");

  const { deleteAddress, deletingId } = useDeleteAddress();
  const isDeleting = deletingId === address.id;

  const handleDeletePress = async () => {
    const success = await deleteAddress(address.id);
    if (success && onDeleteSuccess) {
      onDeleteSuccess();
    }
  };

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

          <View style={styles.actionsContainer}>
            {address.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultBadgeText}>
                  {t("profile.default", { defaultValue: "Default" })}
                </Text>
              </View>
            )}

            <TouchableOpacity
              onPress={handleDeletePress}
              disabled={isDeleting}
              style={styles.deleteButton}
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              {isDeleting ? (
                <ActivityIndicator size="small" color="#EF4444" />
              ) : (
                <Trash2 size={16} color="#EF4444" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {!!cityStateZip && <Text style={[styles.subText, textAlignStyle]}>{cityStateZip}</Text>}
        {!!address.country && <Text style={[styles.subText, textAlignStyle]}>{address.country}</Text>}
        {!!address.phone && <Text style={[styles.subText, textAlignStyle]}>{address.phone}</Text>}
      </View>
    </View>
  );
}

