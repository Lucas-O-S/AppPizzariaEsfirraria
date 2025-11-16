export const OrderItemWrapper = (orderItemModel) => {
    return {
        orderId: orderItemModel.orderId,
        productId: orderItemModel.productModel ? orderItemModel.productModel.id : null,
        quantity: orderItemModel.quantity,
        priceTotal: orderItemModel.priceTotal
    };
};
