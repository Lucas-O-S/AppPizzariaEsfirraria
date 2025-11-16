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

    static async addItem(orderItem) {
        const cart = await Cart.getInstance();
        const existingItem = cart.items.find(item => item.productModel.id === orderItem.productModel.id);
        if (existingItem) {
            existingItem.quantity += orderItem.quantity;
        } else {
            cart.addItem(orderItem);
        }
        await Cart.saveToStorage();
    }

    static async removeItem(orderItemId) {
        const cart = await Cart.getInstance();
        const itemToRemove = cart.items.find(item => item.id === orderItemId);
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
                // Ensure we always persist an array for items and guard productModel access
                const itemsToPersist = Array.isArray(cart.items) ? cart.items.map(item => ({
                    id: item.id != null ? Number(item.id) : null,
                    orderId: item.orderId != null ? Number(item.orderId) : null,
                    productModel: item.productModel ? {
                        id: item.productModel.id != null ? Number(item.productModel.id) : null,
                        name: item.productModel.name || null,
                        description: item.productModel.description || null,
                        price: item.productModel.price != null ? Number(item.productModel.price) : 0,
                        productImage: item.productModel.productImage || null,
                        imagem64: item.productModel.imagem64 || null,
                        imagemFile: item.productModel.imagemFile || null,
                    } : null,
                    quantity: item.quantity != null ? Number(item.quantity) : 0,
                    priceTotal: item.priceTotal != null ? Number(item.priceTotal) : 0,
                })) : [];

                const cartData = {
                    userId: Cart.#userId !== undefined ? Cart.#userId : null,
                    token: Cart.#token || null,
                    items: itemsToPersist,
                    priceTotal: cart.priceTotal || 0,
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
                const parsedData = JSON.parse(cartData) || {};
                // When loading a cart from storage, userId may be null (guest) or a string.
                // The OrderModel.userId setter throws if given null/invalid value, so only set
                // it when we have a valid numeric userId. Also convert to Number when present.
                Cart.#userId = parsedData.userId !== null && !isNaN(parsedData.userId) ? Number(parsedData.userId) : null;
                Cart.#token = parsedData.token || null;
                if (Cart.#userId !== null) {
                    Cart.#instance.userId = Cart.#userId;
                }

                // Ensure items is an array before mapping; tolerate missing/undefined items.
                if (Array.isArray(parsedData.items)) {
                    Cart.#instance.items = parsedData.items.map(itemData => {
                        const pm = itemData.productModel ? {
                            id: itemData.productModel.id != null ? Number(itemData.productModel.id) : null,
                            name: itemData.productModel.name || "",
                            description: itemData.productModel.description || "",
                            price: itemData.productModel.price != null ? Number(itemData.productModel.price) : 0,
                            productImage: itemData.productModel.productImage || null,
                            imagem64: itemData.productModel.imagem64 || null,
                            imagemFile: itemData.productModel.imagemFile || null,
                        } : null;

                        const productModel = pm ? new ProductModel(pm) : null;

                        return new OrderItemModel({
                            id: itemData.id != null ? Number(itemData.id) : null,
                            orderId: itemData.orderId != null ? Number(itemData.orderId) : null,
                            productModel,
                            quantity: itemData.quantity != null ? Number(itemData.quantity) : 0,
                        });
                    });
                } else {
                    Cart.#instance.items = [];
                }
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
