import { ThemedText } from "@shared/components/themed-text";
import { View } from "react-native";

export default function HomeScreen() { 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Home Screen</ThemedText>
        </View>
    );
}