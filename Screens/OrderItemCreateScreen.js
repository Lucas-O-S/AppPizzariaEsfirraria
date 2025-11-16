import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrderItemModel from '../Models/OrderItemModel.js';
import ProductModel from '../Models/ProductModel.js';
import ImageComponent from '../Components/ImageComponent';
import Cart from '../Singleton/Cart';

export default function OrderItemCreateScreen({ route, navigation }) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState('1');
    const [loading, setLoading] = useState(false);

    const handleAddToCart = async () => {
        const qty = parseInt(quantity);
        if (isNaN(qty) || qty < 1) {
            Alert.alert('Erro', 'Quantidade deve ser um número maior que 0');
            return;
        }

        setLoading(true);
        try {
            const productModel = new ProductModel({
                id: Number(product.id),
                name: product.name,
                description: product.description,
                price: product.price,
                imagem64: product.imagem64,
                productImage: product.productImage
            });

            const orderItem = new OrderItemModel({
                productModel,
                quantity: qty
            });

            await Cart.addItem(orderItem);

            Alert.alert('Sucesso', 'Item adicionado ao carrinho!');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Adicionar ao Carrinho</Text>

            <View style={styles.productInfo}>
                <ImageComponent
                    image64={product.imagem64}
                    style={styles.productImage}
                    placeholderText="Sem imagem"
                />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.description}</Text>
                <Text style={styles.productPrice}>R$ {product.price.toFixed(2)}</Text>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Quantidade"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleAddToCart} disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    productInfo: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        alignItems: 'center',
    },
    productImage: {
        width: 150,
        height: 150,
        marginBottom: 15,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
