import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import UsuarioController from '../Controller/Usuario.Controller';
import UsuarioModel from '../Models/UsuarioModel';

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleRegister() {
        try {
            const usuarioModel = new UsuarioModel({});

            usuarioModel.name = name.trim();
            usuarioModel.password = password.trim();

            setLoading(true);
            await UsuarioController.createUsuario(usuarioModel);
            Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    }

    function handleBackToLogin() {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar</Text>
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
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Registrando...' : 'Registrar'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLogin}>
                <Text style={styles.backButtonText}>Voltar ao Login</Text>
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
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    backButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
