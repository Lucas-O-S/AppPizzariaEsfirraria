import StandardModel from "./StandardModel";
import OrderItemModel from "./OrderItemModel";

export default class OrderModel extends StandardModel {

    #userId;
    #priceTotal;
    #items;

    constructor({id = null, userId = null, items = []}) {
        super(id);
        this.#userId = userId;
        this.#items = items;
        this.#priceTotal = this.calculatePriceTotal();
    }

    get userId() {
        return this.#userId;
    }

    get priceTotal() {
        return this.#priceTotal;
    }

    get items() {
        return this.#items;
    }

    set userId(value) {
        if (value === null || isNaN(value)) {
            throw new Error("ID do usuário deve ser um número válido");
        }
        this.#userId = Number(value);
    }

    set items(value) {
        if (!Array.isArray(value)) {
            throw new Error("Itens devem ser um array");
        }
        for (let item of value) {
            if (!(item instanceof OrderItemModel)) {
                throw new Error("Cada item deve ser uma instância de OrderItemModel");
            }
        }
        this.#items = value;
        this.#priceTotal = this.calculatePriceTotal();
    }

    calculatePriceTotal() {
        return this.#items.reduce((total, item) => total + item.priceTotal, 0);
    }

    addItem(item) {
        if (!(item instanceof OrderItemModel)) {
            throw new Error("Item deve ser uma instância de OrderItemModel");
        }
        this.#items.push(item);
        this.#priceTotal = this.calculatePriceTotal();
    }

    removeItem(itemId) {
        this.#items = this.#items.filter(item => item.id !== itemId);
        this.#priceTotal = this.calculatePriceTotal();
    }
}
