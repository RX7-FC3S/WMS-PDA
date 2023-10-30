import { request } from "../utils/request";

export const get_user_info = (params) => {
    return request({
        url: '/get_user_info',
        method: 'post',
        data: params
    })
}