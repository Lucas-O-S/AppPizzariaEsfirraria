import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import UsuarioController from '../Controller/Usuario.Controller';
import { AuthHelper } from '../utils/AuthHelper';
import UsuarioModel from '../Models/UsuarioModel';

export default function LoginScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        try {
           
            setLoading(true);
           
            const usuarioModel = new UsuarioModel({});

            usuarioModel.name = name.trim();
            usuarioModel.password = password.trim();

            await UsuarioController.login(usuarioModel);
           
            if (AuthHelper.getAccessToken() && !AuthHelper.isTokenExpired()) {
                navigation.navigate('Home');
            }
            
            else {
                Alert.alert('Erro', 'Token inválido ou expirado');
            }
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleRegister() {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Entrando...' : 'Entrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerButtonText}>Registrar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

