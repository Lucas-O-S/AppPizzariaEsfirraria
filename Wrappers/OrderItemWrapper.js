export const OrderItemWrapper = (orderItemModel) => {
    console.log("itemasdsad" )
    console.log("item " + orderItemModel.productModel)
    // Ensure productId is numeric and comes from the actual productModel selected by the user
    const productId = orderItemModel.productModel && orderItemModel.productModel.id != null ? Number(orderItemModel.productModel.id) : null;
    if (productId === null || isNaN(productId) || productId <= 0) {
        throw new Error('ID do produto inválido no item do carrinho');
    }

    const quantity = orderItemModel.quantity != null ? Number(orderItemModel.quantity) : 0;
    const priceTotal = orderItemModel.priceTotal != null ? Number(orderItemModel.priceTotal) : 0;

    return {
        productId,
        quantity,
        priceTotal
    };
};
