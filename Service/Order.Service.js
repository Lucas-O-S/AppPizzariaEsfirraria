import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { jsonHeader } from "../utils/HeaderHelper";
import { AuthHelper } from "../utils/AuthHelper";
import OrderModel from "../Models/OrderModel";
import { OrderWrapper } from "../Wrappers/OrderWrapper";

export class OrderService {

    static async create(orderModel) {
        console.log("Entrou em create Order");

        const headers = {
            ...jsonHeader,
            ...AuthHelper.getAuthHeader()
        };

        const body = OrderWrapper(orderModel);

        const result = await ExecuteHttpRequest.callout({
            url: "/order",
            method: "POST",
            body: body,
            headers: headers
        });

        console.log(JSON.stringify(result));

        const resultBody = result.data;
        if (result.data.status !== 201) {
            throw new Error(resultBody.message);
        }

        return result;
    }
}
