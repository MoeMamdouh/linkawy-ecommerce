import { ThemedText } from "@shared/components/themed-text";
import { View } from "react-native";

export default function ProfileScreen() { 
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText style={{ fontSize: 24, fontWeight: 'bold' }}>Profile Screen</ThemedText>
        </View>
    );
}