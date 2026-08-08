import ButtonsScreen from "@features/playground/buttons";
import { useLocalSearchParams } from "expo-router";

export default function PlaygroundNav() {
  const { type } = useLocalSearchParams<{ type?: string | string[] }>();
  const resolvedType = Array.isArray(type) ? type[0] : type;

  switch (resolvedType) {
    case "buttons":
      return <ButtonsScreen/>;
    default:
      return null;
  }
}
