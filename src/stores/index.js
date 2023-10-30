import { defineStore } from 'pinia'

export const useIndexStore = defineStore('index', () => {
    const menus = [
        {
            title: '入库',
            items: [
                {
                    title: '收货单',
                    to: '/receiving_orders'
                }
            ]
        },
        {
            title: '出库',
            items: [
                {
                    title: '发货单',
                    to: '/shipping_orders'
                }
            ]
        },
        {
            title: '库内',
            items: [
                {
                    title: '物料信息',
                    to: '/items'
                },

            ]
        },
        {
            title: '调试',
            items: [
                {
                    title: 'date-range-input',
                    to: '/date-range-input'
                },
                {
                    title: 'scroll-table',
                    to: '/scroll-table'
                },
            ]
        }
    ]
    return { menus }
})