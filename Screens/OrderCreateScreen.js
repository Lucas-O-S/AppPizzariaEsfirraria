import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function OrderCreateScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Create Screen</Text>
      <Text>Order creation functionality to be implemented</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
