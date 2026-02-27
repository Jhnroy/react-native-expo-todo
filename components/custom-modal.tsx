import { Modal, Text, View } from "react-native";
import { CustomButton } from "./custom-butotn";

type Props = {
  modalVisible: boolean;
  onClose: VoidFunction;
  onDelete: VoidFunction;
};

export const CustomModal = ({ modalVisible, onDelete, onClose }: Props) => {
  return (
    <Modal
      transparent
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => onClose}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white w-80 p-6 rounded-2xl">
          <Text className="text-lg font-bold mb-4 text-center">
            Delete Task
          </Text>
          <Text className="mb-6">
            Are you sure you want to delete this task?
          </Text>

          <View className="flex-row justify-center  gap-4">
            {/* <TouchableOpacity onPress={() => onClose()}>
                <Text className="text-gray-500 bg-white py-2 px-4 rounded-2xl">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onDelete}>
                <Text className="text-white bg-red-500 py-2 px-4 rounded-2xl font-bold">
                  Delete
                </Text>
              </TouchableOpacity> */}
            <CustomButton variant="outlined" onPress={() => onClose()}>
              Cancel
            </CustomButton>
            <CustomButton onPress={() => onClose()} className="bg-red-500">
              Delete
            </CustomButton>
          </View>
        </View>
      </View>
    </Modal>
  );
};
