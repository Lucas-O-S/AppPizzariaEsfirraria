import OrderModel from '../Models/OrderModel';
import OrderItemModel from '../Models/OrderItemModel';

export default class Cart {
    static #instance = null;

    static getInstance(userId = null) {
        if (!Cart.#instance) {
            Cart.#instance = new OrderModel({ userId });
        }
        if (userId && Cart.#instance.userId !== userId) {
            // Accept only valid numeric userId; caller may pass string from token
            if (!isNaN(userId)) {
                Cart.#instance.userId = Number(userId);
            }
        }
        return Cart.#instance;
    }

    static addItem(productModel, quantity = 1) {
        const cart = Cart.getInstance();
        const existingItem = cart.items.find(item => item.productModel.id === productModel.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            const newItem = new OrderItemModel({ productModel, quantity });
            cart.addItem(newItem);
        }
    }

    static removeItem(productId) {
        const cart = Cart.getInstance();
        const itemToRemove = cart.items.find(item => item.productModel.id === productId);
        if (itemToRemove) {
            cart.removeItem(itemToRemove.id);
        }
    }

    static updateItemQuantity(productId, quantity) {
        const cart = Cart.getInstance();
        const item = cart.items.find(item => item.productModel.id === productId);
        if (item) {
            item.quantity = quantity;
        }
    }

    static getItems() {
        return Cart.getInstance().items;
    }

    static getTotalPrice() {
        return Cart.getInstance().priceTotal;
    }

    static clearCart() {
        Cart.#instance = null;
    }

    static getOrder() {
        return Cart.getInstance();
    }
}
