import StandardModel from "./StandardModel";

export default class ProductModel extends StandardModel {

    #name;
    #description;
    #price;
    #productImage;
    #imagem64;
    #imagemFile;

    constructor({id = null, name = "", description = "", price = 0, productImage = null, imagem64 = "", imagemFile = null}) {
        super(id);
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#productImage = productImage;
        this.#imagem64 = imagem64;
        this.#imagemFile = imagemFile;
    }

    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    get price() {
        return this.#price;
    }

    get productImage() {
        return this.#productImage;
    }

    get imagem64() {
        return this.#imagem64;
    }

    get imagemFile() {
        return this.#imagemFile;
    }

    set name(value) {
        if (!value || value.length < 1) {
            throw new Error("Nome está vazio");
        }
        this.#name = value;
    }

    set description(value) {
        if (!value || value.length < 1) {
            throw new Error("Descrição está vazia");
        }
        this.#description = value;
    }

    set price(value) {
        if (value === null || isNaN(value) || value < 0) {
            throw new Error("Preço deve ser um número válido e não negativo");
        }
        this.#price = Number(value);
    }

    set productImage(value) {
        this.#productImage = value;
    }

    set imagem64(value) {
        if (!value || value.length < 1) {
            throw new Error("Imagem é obrigatória");
        }
        if (typeof value === "string" && !value.startsWith("data:image/")) {
            throw new Error("Formato de imagem inválido (esperado Base64)");
        }
        this.#imagem64 = value;
    }

    set imagemFile(file) {
        if (!file) {
            throw new Error("Arquivo de imagem inválido");
        }
        this.#imagemFile = file;
    }
}
