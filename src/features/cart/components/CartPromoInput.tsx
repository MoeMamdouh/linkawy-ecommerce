import { Button } from '@shared/components/ui/button';
import { Input } from '@shared/components/ui/input';
import { FontFamily, FontSize, Palette } from '@shared/constants/theme';
import { useTheme } from '@shared/hooks/use-theme';
import { Check, Tag, X } from 'lucide-react-native';
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from 'react-native';
import { AppliedPromo } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
interface CartPromoInputProps {
  promoCode: string;
  setPromoCode: (code: string) => void;
  appliedPromo: AppliedPromo | null;
  promoError: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}

export function CartPromoInput({
  promoCode,
  setPromoCode,
  appliedPromo,
  promoError,
  onApply,
  onRemove,
}: CartPromoInputProps) {

  const { colors } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.promoContainer}>
      {appliedPromo ? (
        <View
          style={[
            styles.appliedPromoBox,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.appliedPromoContent}>
            <View style={[styles.promoIconCircle, { backgroundColor: colors.primary }]}>
              <Check size={14} color={colors.white} />
            </View>
            <View>
              <Text style={[styles.appliedPromoCode, { color: colors.foreground }]}>
                {t("cart.appliedPromoCode", { code: appliedPromo.code })}
              </Text>
              <Text style={[styles.appliedPromoDiscount, { color: Palette.green500 }]}>
                {t("cart.appliedPromoDiscount", { discount: appliedPromo.discountPercent })}
              </Text>
            </View>
          </View>
          <Pressable onPress={onRemove} style={styles.removePromoButton} hitSlop={8}>
            <X size={18} color={colors.mutedForeground} />
          </Pressable>
        </View>
      ) : (
        <View>
          <View style={styles.promoRow}>
            <View style={{ flex: 1 }}>
              <Input
                placeholder={t("cart.promoCode")}
                leftIcon={<Tag size={18} />}
                value={promoCode}
                className="h-[44px] py-0"
                onChangeText={setPromoCode}
                autoCapitalize="characters"
                autoCorrect={false}
                error={promoError || undefined}
                style={{ fontFamily: FontFamily.regular }}
              />
            </View>
            <Button
              variant="default"
              className="py-0"
              textStyle={{
                fontFamily: FontFamily.bold,
                fontSize: FontSize.sm,
              }}
              onPress={() => onApply(promoCode)}
              style={styles.applyBtn}
            >
              {t("cart.applyPromo")}
            </Button>
          </View>
        </View>
      )}
    </View>
  );
}
