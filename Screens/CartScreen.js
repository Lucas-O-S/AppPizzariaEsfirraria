import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ListItemComponent } from '../Components/ListItemComponent';
import ImageComponent from '../Components/ImageComponent';
import OrderController from '../Controller/Order.Controller';
import OrderModel from '../Models/OrderModel';
import { AuthHelper } from '../utils/AuthHelper';
import OrderItemModel from '../Models/OrderItemModel';
import ProductModel from '../Models/ProductModel';
import Cart from '../Singleton/Cart';

export default function CartScreen({ navigation }) {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        loadCartItems();
    }, []);

    const loadCartItems = async () => {
        try {
            const items = await Cart.getItems();
            setCartItems(items);
            // Update the total price whenever the cart items are loaded
            const total = await Cart.getTotalPrice();
            setTotalPrice(total || 0);
        } catch (error) {
            console.error('Error loading cart items:', error);
        }
    };



    const removeItemFromCart = async (itemId) => {
        try {
            await Cart.removeItem(itemId);
            await loadCartItems(); // Reload items from Cart singleton
        } catch (error) {
            console.error('Error removing item from cart:', error);
            Alert.alert('Erro', 'Erro ao remover item do carrinho');
        }
    };

    const updateItemQuantity = async (itemId, newQuantity) => {
        try {
            await Cart.updateItemQuantity(itemId, newQuantity);
            await loadCartItems(); // Reload items from Cart singleton
        } catch (error) {
            console.error('Error updating item quantity:', error);
        }
    };

    const getTotalPrice = async () => {
        try {
            return await Cart.getTotalPrice();
        } catch (error) {
            console.error('Error getting total price:', error);
            return 0;
        }
    };

    const handleCheckout = async () => {
        try {
            let userId = AuthHelper.getUserIdFromToken();
            if (!userId) {
                Alert.alert('Erro', 'Usuário não autenticado. Faça login novamente.');
                return;
            }

            // Ensure userId is a number before assigning to OrderModel (API requires numeric userId)
            userId = Number(userId);
            if (isNaN(userId) || userId <= 0) {
                Alert.alert('Erro', 'ID do usuário inválido. Faça login novamente.');
                return;
            }

            const orderModel = await Cart.getOrder();
            orderModel.userId = userId;
            console.log("AAAAAAAAAA")
            const result = await OrderController.createOrder(orderModel);

            // Clear cart after successful order
            await Cart.clearCart();
            setCartItems([]);

            Alert.alert('Sucesso', 'Pedido criado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Erro ao criar pedido: ' + error.message);
        }
    };

    const renderCartItem = ({ item, index }) => (
        <ListItemComponent
            key={index}
            showEditButton={false}
            showDeleteButton={true}
            deleteButtonLabel="Remover"
            deleteFunction={() => removeItemFromCart(item.id)}
            content={() => (
                <View style={styles.itemContent}>
                    <View style={styles.itemDetails}>
                        <Text style={styles.productName}>{item.productModel ? item.productModel.name : 'Produto não encontrado'}</Text>
                        <Text style={styles.productDescription}>{item.productModel ? item.productModel.description : ''}</Text>
                        <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
                        <Text style={styles.priceTotal}>Total: R$ {item.priceTotal ? item.priceTotal.toFixed(2) : '0.00'}</Text>
                    </View>
                </View>
            )}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carrinho</Text>

            {cartItems.length === 0 ? (
                <Text style={styles.emptyCart}>Seu carrinho está vazio</Text>
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                        renderItem={renderCartItem}
                        contentContainerStyle={styles.listContainer}
                    />

                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total: R$ {getTotalPrice().toFixed(2)}</Text>
                        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                            <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
    emptyCart: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: '#666',
    },
    listContainer: {
        paddingBottom: 20,
    },
    itemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        marginRight: 15,
    },
    itemDetails: {
        flex: 1,
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
    quantity: {
        fontSize: 14,
        marginBottom: 5,
    },
    priceTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    totalContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
    },
    checkoutButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
