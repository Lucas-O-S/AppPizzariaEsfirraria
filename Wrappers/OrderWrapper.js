import { OrderItemWrapper } from './OrderItemWrapper.js';

export const OrderWrapper = (orderModel) => {
    console.log("user" +orderModel.userId )
    return {
        userId: orderModel.userId,
        priceTotal: orderModel.priceTotal,
        items: Array.isArray(orderModel.items) ? orderModel.items.map(item => OrderItemWrapper(item)) : []
    };
};
