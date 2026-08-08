import ButtonsScreen from "@features/playground/screens/buttons";
import InputFieldsScreen from "@features/playground/screens/inputFields";
import { useLocalSearchParams } from "expo-router";

export default function PlaygroundNav() {
  const { type } = useLocalSearchParams<{ type?: string | string[] }>();
  const resolvedType = Array.isArray(type) ? type[0] : type;

  switch (resolvedType) {
    case "buttons":
      return <ButtonsScreen />;
    case "inputFields":
      return <InputFieldsScreen />;
    default:
      return null;
  }
}
