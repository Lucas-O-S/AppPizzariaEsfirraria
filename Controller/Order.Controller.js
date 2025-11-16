import { OrderService } from "../Service/Order.Service";
import OrderModel from "../Models/OrderModel";
import { OrderWrapper } from "../Wrappers/OrderWrapper";

export default class OrderController {

    static async createOrder(orderModel) {
        try {
            console.log("AAAAAAAAAAA")
            const wrapper = OrderWrapper(orderModel);
            console.log("Wrapper" + wrapper)
            const result = await OrderService.create(wrapper);
            return result;
        } catch (error) {
            console.log("Erro ao criar pedido:", error.message);
            throw new Error(error.message);
        }
    }
}
