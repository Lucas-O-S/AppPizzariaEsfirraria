import { ProductService } from "../Service/Product.Service";
import ProductModel from "../Models/ProductModel";

export default class ProductController {

    static async findAllProducts(includeImages = false) {
        try {
            return await ProductService.findAll(includeImages);
        } catch (error) {
            console.log("Erro ao buscar produtos:", error.message);
            throw new Error(error.message);
        }
    }

    static async findOneProduct(id, includeImages = false) {
        try {
            if (!id || isNaN(id)) {
                throw new Error("ID do produto inválido");
            }

            return await ProductService.findOne(id, includeImages);
        } catch (error) {
            console.log("Erro ao buscar produto:", error.message);
            throw new Error(error.message);
        }
    }
}
