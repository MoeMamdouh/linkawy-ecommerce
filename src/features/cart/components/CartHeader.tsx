import { View, Text, TouchableOpacity } from 'react-native';
import { createCartStyles } from '../styles/cart-screen.styles';
import { useTheme } from '@shared/hooks/use-theme';
import { ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface CartHeaderProps {
  totalItemCount: number;
}

export function CartHeader({ totalItemCount }: CartHeaderProps) {
    const { colors } = useTheme();
    const styles = createCartStyles(colors);
    

  const router = useRouter();

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <TouchableOpacity onPress={() => router.back()} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <ChevronLeft color={colors.foreground} size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      <Text style={styles.headerSubtitle}>
        {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
      </Text>
    </View>
  );
}
