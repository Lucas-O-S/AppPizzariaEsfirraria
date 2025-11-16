import StandardModel from "./StandardModel";
import ProductModel from "./ProductModel";

export default class OrderItemModel extends StandardModel {

    #orderId;
    #productModel;
    #quantity;
    #priceTotal;

    constructor({id = null, orderId = null, productModel = null, quantity = 1}) {
        super(id);
        this.#orderId = orderId;
        this.#productModel = productModel;
        this.#quantity = quantity;
        this.#priceTotal = this.calculatePriceTotal();
    }

    get orderId() {
        return this.#orderId;
    }

    get productModel() {
        return this.#productModel;
    }

    get quantity() {
        return this.#quantity;
    }

    get priceTotal() {
        return this.#priceTotal;
    }

    set orderId(value) {
        if (value === null || isNaN(value)) {
            throw new Error("ID do pedido deve ser um número válido");
        }
        this.#orderId = Number(value);
    }

    set productModel(value) {
        if (!(value instanceof ProductModel)) {
            throw new Error("Produto deve ser uma instância de ProductModel");
        }
        this.#productModel = value;
        this.#priceTotal = this.calculatePriceTotal();
    }

    set quantity(value) {
        if (value === null || isNaN(value) || value < 1) {
            throw new Error("Quantidade deve ser um número válido e maior que 0");
        }
        this.#quantity = Number(value);
        this.#priceTotal = this.calculatePriceTotal();
    }

    calculatePriceTotal() {
        if (this.#productModel && this.#quantity) {
            return this.#productModel.price * this.#quantity;
        }
        return 0;
    }
}
