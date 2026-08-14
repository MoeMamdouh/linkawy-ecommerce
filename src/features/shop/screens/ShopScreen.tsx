import { ThemedText } from "@shared/components/themed-text";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function ShopScreen() { 
    const { t } = useTranslation();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>{t('shop.title')}</ThemedText>
        </View>
    );
}