<script setup>
import { ref } from 'vue'
import scrollTable from '@/components/scrollTable.vue'
import { get_receiving_orders } from '@/api/receivingOrder.js'
import { useReceivingOrderStore } from '@/stores/receiving_order';

const receivingOrderStore = useReceivingOrderStore()


// Methods
function inquire() {
    finished.value = false
    table.value.data = []
    load()
}

function datePickerChange() {
    query.value.dateRange = displayDateRange(dateRange.value)
}

function load() {
    receivingOrderStore.loading = true
    get_receiving_orders({
        params: {
            id: null,
            create_at: null,
            update_at: null,
            order_number: null,
        },
        config: {
            limit: 10,
            offset: 0
        }
    })
        .then(response => {
            const { status, message, data } = response
            if (status === 'error') {
                console.log('error', message)
                receivingOrderStore.loading = false
                receivingOrderStore.failed = true
            }
            else {
                if (headLoaded === false) {
                    for (let key in data[0]) {
                        table.value.head.push(key)
                    }
                    headLoaded = true
                }
                // 加载表身
                for (let row of data) {
                    table.value.data.push(row)
                }
                // 是否没有更多了
                if (data.length === 0) {
                    finished.value = true
                }
                loading.value = false
            }
        })
        .catch(() => {
            receivingOrderStore.loading = false
            receivingOrderStore.failed = true
        })
}

</script>

<template>
    <div class="query">
        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="收货单号"
                    v-model="receivingOrderStore.orderNumber"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="发货方"
                    v-model="receivingOrderStore.sender"></var-input>
            </var-col>
        </var-row>

        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="收货方"
                    v-model="receivingOrderStore.receiver"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="时间范围"
                    v-model="receivingOrderStore.timeSpan">
                    <template #append-icon>
                        <var-icon namespace="mdi" name="calendar-clock" size="24px"
                            @click="receivingOrderStore.datePickerVisible = true" />
                    </template>
                </var-input>
            </var-col>
        </var-row>
    </div>

    <div class="content">
        <scroll-table :finished="receivingOrderStore.finished" :loading="receivingOrderStore.loading"
            :failed="receivingOrderStore.failed" @load="load">
            <thead>
                <tr>
                    <th v-for="cell in receivingOrderStore.tableHead" :id="cell">{{ cell }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in receivingOrderStore.tableData">
                    <td v-for="cell in row">{{ cell }}</td>
                </tr>
            </tbody>
        </scroll-table>
    </div>

    <div class="buttons">
        <var-row :gutter="12">
            <var-col :span="12">
                <var-button block @click="inquire">查询</var-button>
            </var-col>
            <var-col :span="12">
                <var-button block type="primary">返回</var-button>
            </var-col>
        </var-row>
    </div>

    <!-- date picker -->
    <var-popup v-model:show="receivingOrderStore.datePickerVisible">
        <var-date-picker type="date" v-model="receivingOrderStore.timeSpan" @change="datePickerChange()"></var-date-picker>
    </var-popup>
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
  