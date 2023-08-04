import axios from 'axios'

export function request(config) {
    const instance = axios.create({
        baseURL: '/api',
        timeout: 5000
    })

    // 拦截器
    // 请求
    instance.interceptors.request.use(
        config => {
            return config
        },
        error => {
            console.log(`请求失败，${error}`)
        }
    )
    // 响应
    instance.interceptors.response.use(
        res => {
            return res.data
        },
        error => {
            console.log(`请求失败，${error}`)
        }
    )

    // 发送请求
    return instance(config)
}