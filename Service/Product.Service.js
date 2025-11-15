import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { AuthHelper } from "../utils/AuthHelper";
import ProductModel from "../Models/ProductModel";
import ImageHelper from "../utils/ImageHelper";

export class ProductService {

    static async findAll(includeImages = false) {
        console.log("Entrou em findAll Products");

        const headers = {
            ...AuthHelper.getAuthHeader()
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/product",
            method: "GET",
            param: { includeImages: includeImages },
            headers: headers
        });

        console.log(JSON.stringify(result));

        let productsList = [];

        if (result.data && result.data.data) {
            result.data.data.forEach((dataUnit) => {
                let imagem64 = "";
                if (includeImages && dataUnit.productImage) {
                    imagem64 = ImageHelper.convertByteToBase64(dataUnit.productImage);
                }

                productsList.push(new ProductModel({
                    id: dataUnit.id,
                    name: dataUnit.name,
                    description: dataUnit.description,
                    price: dataUnit.price,
                    productImage: dataUnit.productImage || null,
                    imagem64: imagem64
                }));
            });
        }

        console.log(productsList);

        if (result.status !== 200) {
            throw new Error(result.data.message);
        }

        return productsList;
    }

    static async findOne(id, includeImages = false) {
        console.log("Entrou em findOne Product");

        const headers = {
            ...AuthHelper.getAuthHeader()
        };

        const result = await ExecuteHttpRequest.callout({
            url: "/product/" + id,
            method: "GET",
            param: { includeImages: includeImages },
            headers: headers
        });

        console.log(JSON.stringify(result));

        if (result.status !== 200) {
            throw new Error(result.data.message);
        }

        const dataUnit = result.data.data;

        let imagem64 = "";
        if (includeImages && dataUnit.productImage) {
            imagem64 = ImageHelper.convertByteToBase64(dataUnit.productImage);
        }

        return new ProductModel({
            id: dataUnit.id,
            name: dataUnit.name,
            description: dataUnit.description,
            price: dataUnit.price,
            productImage: dataUnit.productImage || null,
            imagem64: imagem64
        });
    }
}
