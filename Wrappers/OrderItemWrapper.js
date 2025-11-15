export const OrderItemWrapper = (orderItemModel) => {
    return {
        productId: orderItemModel.productModel ? orderItemModel.productModel.id : null,
        quantity: orderItemModel.quantity,
        priceTotal: orderItemModel.priceTotal
    };
};
