import { request } from "../utils/request";

export const get_receiving_orders = (params) => {
    return request({
        url: '/get_receiving_orders',
        method: 'post',
        data: params
    })
}

