import { useTheme } from '@shared/hooks/use-theme';
import { useTranslation } from "react-i18next";
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/cart-screen.styles';
interface CartHeaderProps {
  totalItemCount: number;
}

export function CartHeader({ totalItemCount }: CartHeaderProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
const { t } = useTranslation();
  return (
    <View style={[styles.header, { backgroundColor: colors.card, paddingTop: insets.top + 16 }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>{t('cart.title')}</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {t('cart.items', { count: totalItemCount })}
      </Text>
    </View>
  );
}
