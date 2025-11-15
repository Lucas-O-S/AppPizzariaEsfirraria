import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Home Screen</Text>

      <ButtonComponent
        label="Find All Products"
        pressFunction={() => navigation.navigate("ProductListScreen")}
      />

      <ButtonComponent
        label="Create Order"
        pressFunction={() => navigation.navigate("OrderCreateScreen")}
      />

      <ButtonComponent
        label="User Management"
        pressFunction={() => navigation.navigate("UserManagementScreen")}
      />

    </View>
  );
}
