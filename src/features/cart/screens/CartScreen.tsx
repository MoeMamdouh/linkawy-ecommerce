import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';
import { Colors } from '@shared/constants/theme';
import { useColorScheme } from '@shared/hooks/use-color-scheme';
import { useCart } from '../hooks/useCart';
import { styles } from '../styles/cart-screen.styles';
import { CartHeader } from '../components/CartHeader';
import { CartItemCard } from '../components/CartItemCard';
import { CartPriceCard } from '../components/CartPriceCard';

export default function CartScreen() {
    const colorScheme = useColorScheme() ?? 'light';
    const colors = Colors[colorScheme];

    const {
        cartItems,
        totalItemCount,
        subtotal,
        total,
        handleUpdateQuantity,
        handleRemoveItem,
    } = useCart();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Header */}
            <CartHeader totalItemCount={totalItemCount} />

            {cartItems.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <View style={[styles.emptyIconCircle, { backgroundColor: colors.muted }]}>
                        <ShoppingCart size={40} color={colors.mutedForeground} />
                    </View>
                    <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>Your cart is empty</Text>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Cart Item Cards */}
                    {cartItems.map((item) => (
                        <CartItemCard
                            key={item.id}
                            item={item}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemoveItem={handleRemoveItem}
                        />
                    ))}

                    {/* Price Calculation Summary Box */}
                    <CartPriceCard subtotal={subtotal} total={total} />
                </ScrollView>
            )}
        </View>
    );
}