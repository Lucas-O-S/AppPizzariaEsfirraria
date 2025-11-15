import ImageHelper from '../utils/ImageHelper.js';

export const ProductWrapper = (productModel) => {
    const formData = new FormData();

    formData.append('name', productModel.name);
    formData.append('description', productModel.description);
    formData.append('price', productModel.price.toString());

    if (productModel.imagemFile) {
        formData.append('productImage', productModel.imagemFile);
    } else if (productModel.imagem64) {
        const file = ImageHelper.convertBase64ToFile(productModel.imagem64);
        formData.append('productImage', file);
    }

    return formData;
};
