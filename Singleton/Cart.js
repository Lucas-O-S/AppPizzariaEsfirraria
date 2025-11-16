import OrderModel from '../Models/OrderModel';
import OrderItemModel from '../Models/OrderItemModel';
import ProductModel from '../Models/ProductModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Cart {
    static #instance = null;
    static #userId = null;
    static #token = null;

    static async getInstance(userId = null, token = null) {
        if (!Cart.#instance) {
            Cart.#instance = new OrderModel({ userId });
            Cart.#userId = userId;
            Cart.#token = token;
            await Cart.loadFromStorage();
        }
        if (userId && Cart.#userId !== userId) {
            Cart.#userId = userId;
            Cart.#instance.userId = userId;
        }
        if (token) {
            Cart.#token = token;
        }
        return Cart.#instance;
    }

    static async addItem(productModel, quantity = 1) {
        const cart = await Cart.getInstance();
        const existingItem = cart.items.find(item => item.productModel.id === productModel.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new OrderItemModel({ productModel, quantity });
            cart.addItem(newItem);
        }
        await Cart.saveToStorage();
    }

    static async removeItem(productId) {
        const cart = await Cart.getInstance();
        const itemToRemove = cart.items.find(item => item.productModel.id === productId);
        if (itemToRemove) {
            cart.removeItem(itemToRemove.id);
            await Cart.saveToStorage();
        }
    }

    static async updateItemQuantity(productId, quantity) {
        const cart = await Cart.getInstance();
        const item = cart.items.find(item => item.productModel.id === productId);
        if (item) {
            item.quantity = quantity;
            await Cart.saveToStorage();
        }
    }

    static async getItems() {
        const cart = await Cart.getInstance();
        return cart.items;
    }

    static async getTotalPrice() {
        const cart = await Cart.getInstance();
        return cart.priceTotal;
    }

    static async clearCart() {
        Cart.#instance = null;
        await AsyncStorage.removeItem('cart');
    }

    static async getOrder() {
        return await Cart.getInstance();
    }

    static async saveToStorage() {
        try {
            const cart = Cart.#instance;
            if (cart) {
                const cartData = {
                    userId: Cart.#userId,
                    token: Cart.#token,
                    items: cart.items.map(item => ({
                        id: item.id,
                        orderId: item.orderId,
                        productModel: {
                            id: item.productModel.id,
                            name: item.productModel.name,
                            description: item.productModel.description,
                            price: item.productModel.price,
                            productImage: item.productModel.productImage,
                            imagem64: item.productModel.imagem64,
                            imagemFile: item.productModel.imagemFile,
                        },
                        quantity: item.quantity,
                        priceTotal: item.priceTotal,
                    })),
                    priceTotal: cart.priceTotal,
                };
                await AsyncStorage.setItem('cart', JSON.stringify(cartData));
            }
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    static async loadFromStorage() {
        try {
            const cartData = await AsyncStorage.getItem('cart');
            if (cartData) {
                const parsedData = JSON.parse(cartData);
                Cart.#userId = parsedData.userId;
                Cart.#token = parsedData.token;
                Cart.#instance.userId = parsedData.userId;
                Cart.#instance.items = parsedData.items.map(itemData => {
                    const productModel = new ProductModel(itemData.productModel);
                    return new OrderItemModel({
                        id: itemData.id,
                        orderId: itemData.orderId,
                        productModel,
                        quantity: itemData.quantity,
                    });
                });
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
        }
    }

    static getToken() {
        return Cart.#token;
    }

    static setToken(token) {
        Cart.#token = token;
    }
}
