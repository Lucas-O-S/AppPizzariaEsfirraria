import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import AlunoEditorScreen from './Screens/AlunoEditorScreen';
import AlunoListScreen from './Screens/AlunoListScreen';
import PedirLancheScreen from './Screens/PedirLancheScreen';
import ListaLancheNaoEntregueScreen from './Screens/ListaLancheNaoEntregueScreen';
import { ListaLancheEntregueScreen } from './Screens/ListaLancheEntregueScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AlunoEditorScreen" component={AlunoEditorScreen} />
        <Stack.Screen name="AlunoListScreen" component={AlunoListScreen} />
        <Stack.Screen name="PedirLancheScreen" component={PedirLancheScreen} />
        <Stack.Screen name="ListaLancheNaoEntregueScreen" component={ListaLancheNaoEntregueScreen} />
        <Stack.Screen name="ListaLancheEntregueScreen" component={ListaLancheEntregueScreen} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
