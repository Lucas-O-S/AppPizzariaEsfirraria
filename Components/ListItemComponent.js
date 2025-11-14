import { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import CustomAlert from "./CustomAlert";

export function ListItemComponent({ 
    content = null,
    editFunction = (() => {return}),
    deleteFunction = null,
    confirmationMessage = "Deseja realmente excluir?",
    confirmationMessageTitle = "Confirmar exclusão",
    deleteButtomLabel = null
    
  }) {
  const [alertVisible, setAlertVisible] = useState(false);

  function callDelete() {
    setAlertVisible(true);
  }

  return (
    <View>
      <TouchableOpacity onPress={editFunction}>
        {content && content()}
      </TouchableOpacity>

    {
      deleteFunction && 

      <TouchableOpacity onPress={callDelete}>
        { deleteButtomLabel &&
            <Text>{deleteButtomLabel}</Text>
        }
      </TouchableOpacity>

    }

      <CustomAlert
        visible={alertVisible}
        title={confirmationMessage}
        message={confirmationMessageTitle}
        onCancel={() => setAlertVisible(false)}
        onConfirm={async () => {
          await deleteFunction();
          setAlertVisible(false);
        }}
      />
    </View>
  );
}
