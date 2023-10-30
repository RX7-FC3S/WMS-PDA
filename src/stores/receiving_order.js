import { defineStore } from 'pinia'

export const useReceivingOrderStore = defineStore('receiving_order', {
    state: () => {
        return {
            // 查询参数
            orderNumber: null,
            sender: null,
            receiver: null,
            timeSpan: [],

            // 日期选择器状态
            datePickerVisible: false,

            // 表格状态
            loading: false,
            finished: false,
            failed: false,

            // 表格数据
            tableHead: [],
            tableData: []

        }
    }
})
