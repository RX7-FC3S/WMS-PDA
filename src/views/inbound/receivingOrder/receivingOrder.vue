<script setup>
import { ref } from 'vue'
import scrollTable from '../../../components/scrollTable.vue'
import { get_receiving_orders } from '../../../api/receivingOrder.js'

const props = defineProps({
    defaultQuery: Object
})

function displayDateRange(dateArray) {
    const strat_date = new Date(dateArray[0])
    const end_date = new Date(dateArray[1])
    return strat_date.toLocaleDateString() + ' ~ ' + (end_date.getMonth() + 1) + '/' + end_date.getDate()
}


// query
const query = ref({
    orderNum: '',
    orderType: props.defaultQuery.orderType,
    dateRange: displayDateRange([
        // today
        new Date().toLocaleDateString(),
        // tomorrow
        new Date(new Date().valueOf() + 86400000).toLocaleDateString()
    ])
})
// query end

// date picker
const datePickerVisible = ref(false)
const dateRange = ref([])
// date picker end

// scroll-table
const table = ref({
    head: [],
    data: []
})
const finished = ref(false)
const loading = ref(false)
let headLoaded = false
// scroll table end


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
    loading.value = true
    setTimeout(() => {
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
    }, 1000)
}

</script>

<template>
    <div class="query">
        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="收货单号"
                    v-model="query.inbound_order_num"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="发货方" v-model="query.sender"></var-input>
            </var-col>
        </var-row>

        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="收货方" v-model="query.item_name"></var-input>
            </var-col>
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="时间范围" v-model="query.dateRange">
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
                    <th v-for="cell in table.head" :id="cell">{{ cell }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in table.data">
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
    <var-popup v-model:show="datePickerVisible">
        <var-date-picker type="date" v-model="dateRange" range @change="datePickerChange()"></var-date-picker>
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
  