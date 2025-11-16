import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";
import IconButtonComponent from "../Components/IconButtonComponent";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButtonComponent
          iconName="settings"
          size={30}
          color="#000"
          onPress={() => navigation.navigate("User")}
        />
        <IconButtonComponent
          iconName="cart"
          size={30}
          color="#000"
          onPress={() => navigation.navigate("CartScreen")}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Home Screen</Text>

        <ButtonComponent
          label="Criar Pedido"
          pressFunction={() => navigation.navigate("OrderCreateScreen")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  tokenInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
});
