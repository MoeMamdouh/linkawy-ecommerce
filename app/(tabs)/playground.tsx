import { Button } from "@shared/components/ui/button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function Playground() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-background p-4">
      <Button
        variant="default"
        onPress={() =>
          router.push({
            pathname: "/playgroundnav",
            params: { type: "buttons" },
          })
        }
      >
        Buttons
      </Button>
      <Button
        variant="default"
        onPress={() =>
          router.push({
            pathname: "/playgroundnav",
            params: { type: "inputFields" },
          })
        }
      >
        Input Fields
      </Button>
    </View>
  );
}
