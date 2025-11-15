import { OrderItemWrapper } from './OrderItemWrapper.js';

export const OrderWrapper = (orderModel) => {
    return {
        userId: orderModel.userId,
        priceTotal: orderModel.priceTotal,
        items: orderModel.items.map(item => OrderItemWrapper(item))
    };
};
