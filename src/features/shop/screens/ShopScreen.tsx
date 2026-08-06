import { ThemedText } from "@shared/components/themed-text";
import { View } from "react-native";

export default function ShopScreen() { 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Shop Screen</ThemedText>
        </View>
    );
}