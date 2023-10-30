<script setup>
import scrollTable from '@/components/scrollTable.vue'
import { storeToRefs } from 'pinia'
import { useShippingOrderStore } from '@/stores/shipping_order.js';
const shippingOrderStore = useShippingOrderStore()
const { queryParams, tableHead, tableData } = shippingOrderStore
// const tableHead = []
console.log(tableHead)
// for (let key in tableData[0]) {
//     tableHead.push(key)
// }


</script>

<template>
    <div class="query">
        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="发货单号"
                    v-model="queryParams.shippingOrderNumber"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="发货方"
                    v-model="queryParams.sender"></var-input>
            </var-col>
        </var-row>
        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="收货方"
                    v-model="queryParams.receiver"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="时间范围" v-model="queryParams.timeSpan">
                    <template #append-icon>
                        <var-icon namespace="mdi" name="calendar-clock" size="24px" @click="datePickerVisible = true" />
                    </template>
                </var-input>
            </var-col>
        </var-row>
    </div>

    <div class="content">
        <scroll-table :finished="finished" :loading="loading" @load="load">
            <thead>
                <tr>
                    <th v-for="cell in tableHead" :id="cell">{{ cell }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in tableData">
                    <td v-for="cell in row">{{ cell }}</td>
                </tr>
            </tbody>
        </scroll-table>
    </div>

    <var-row :gutter="12">
        <var-col :span="12">
            <var-button block>查询</var-button>
        </var-col>
        <var-col :span="12">
            <var-button block type="primary">返回</var-button>
        </var-col>
    </var-row>
</template>
  
<style scoped>
.query {
    margin-bottom: 12px;
}

.query .var-row {
    margin-bottom: 12px !important;
}

.query .var-row:nth-last-child(1) {
    margin-bottom: 0 !important;
}

.content {
    height: calc(100% - 156px);
    margin-bottom: 12px;
}

.buttons {
    width: 100%;
    min-height: 40px;
    display: flex;
    color: var(--black);
}

.buttons * {
    width: 100%;
    height: 100%;
    flex-grow: 1;
}

.var-date-picker {
    width: calc(100vw - 24px);
}
</style>
  