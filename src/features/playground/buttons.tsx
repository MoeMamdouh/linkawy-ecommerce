import { ScrollView, View } from "react-native";
import { ThemedText } from "@shared/components/themed-text";
import { Button } from "@shared/components/ui/button";

const variants = ["default", "destructive", "transparent", "secondary", "ghost", "link"] as const;
const sizes = ["default", "sm", "lg", "icon"] as const;

export default function ButtonsScreen() {

  return (
    <ScrollView className="flex-1 p-4 bg-background mb-6">
      {sizes.map((size) => (
        <View key={size} className="mb-6">
          <ThemedText style={{ fontSize: 16, fontWeight: '600', marginBottom: 8 }}>{size}</ThemedText>
          <View>
            {variants.map((variant) => (
              <View key={variant} className="mr-3 mb-3">
                <Button variant={variant as any} size={size as any}>{variant}</Button>
              </View>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}