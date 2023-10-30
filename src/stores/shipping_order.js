import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useShippingOrderStore = defineStore('shipping_order', {
    state: () => {
        return {
            queryParams: {
                shippingOrderNumber: null,
                sender: null,
                receiver: null,
                timeSpan: null
            },
            tableHead: {
                'id': '序号',
                'order_number': '发货单号',
                'sender_name': '发货人',
                'sender_company': '发货方',
                'receiver_name': '收货人',
                'receiver_company': '收货方'
            },
            tableData: [],
        }
    },

    getters: () => {

    }
})
