import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserManagementScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Management Screen</Text>
      <Text>User management functionality to be implemented</Text>
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
