import AddEditScreen from "@/features/add-edit";
import { useLocalSearchParams } from "expo-router";

export default function EditRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <AddEditScreen id={id} />;
}
