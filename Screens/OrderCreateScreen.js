import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import ProductController from '../Controller/Product.Controller';
import { ListItemComponent } from '../Components/ListItemComponent';

export default function OrderCreateScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const productsList = await ProductController.findAllProducts(true);
            setProducts(productsList);
        } catch (error) {
            Alert.alert('Erro', 'Erro ao carregar produtos: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleProductPress = (product) => {
        navigation.navigate('OrderItemCreateScreen', {
            product: product
        });
    };

    const renderProductItem = ({ item }) => (
        <ListItemComponent
            onPress={() => handleProductPress(item)}
            showDeleteButton={false}
            content={() => (
                <View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productDescription}>{item.description}</Text>
                    <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
                </View>
            )}
        />
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Carregando produtos...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Selecionar Produto</Text>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProductItem}
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
});
