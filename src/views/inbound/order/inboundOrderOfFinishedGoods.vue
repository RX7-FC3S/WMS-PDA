<script setup>
import { ref } from 'vue'
import { request } from '../../../utils/request.js'
import scrollTable from '../../../components/scrollTable.vue'
// style
const styleVars = ref({
    '--date-picker-title-background': 'red'
})

// query
const query = ref({
    inbound_order_num: '',
    sender: '',
    dateSpan: new Date().toLocaleDateString() + ' ~ ' + new Date(new Date().valueOf() + 86400000).toLocaleDateString().slice(5)
})
// query end

// date picker
const datePickerVisible = ref(false)
const dateSpan = ref([])
// date picker end

// scroll-table
const table = ref({
    head: [],
    data: []
})
const finished = ref(false)
let headLoaded = false
// scroll table end


// Methods
function inquire() {
    finished.value = false
    table.value.data = []
    load()
}

function datePickerPopup() {
    datePickerVisible.value = true
}

function datePickerChange() {
    const start = new Date(dateSpan.value[0]).toLocaleDateString()
    const end = new Date(dateSpan.value[1]).toLocaleDateString().slice(5)
    query.value.dateSpan = start+ ' ~ ' + end
}

function load() {
    setTimeout(() => {
        let offset = table.value.data.length
        let limit = 20
        request(`/get_inbound_orders?offset=${offset}&limit=${limit}`)
            .then(res => {
                finished.value = true
                // 加载表头
                if (headLoaded === false) {
                    for (let key in res[0]) {
                        table.value.head.push(key)
                    }
                    headLoaded = true
                }
                // 加载表身
                for (let row of res) {
                    table.value.data.push(row)
                }
                finished.value = false
                // 是否没有更多了
                if (res.length === 0) {
                    finished.value = true
                }

            })
    }, 100)
}

</script>

<template>
    <div class="query">
        <var-row :gutter="12">
            <var-col :span="12">
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="客户订单号"
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
                <var-input style="flex-grow: 1;" variant="outlined" placeholder="时间范围" v-model="query.dateSpan"
                    @focus="datePickerPopup()"></var-input>
            </var-col>
        </var-row>
    </div>

    <div class="content">
        <scroll-table :finished="finished" @load="load">
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

    <var-row :gutter="12">
        <var-col :span="12">
            <var-button block @click="inquire">查询</var-button>
        </var-col>
        <var-col :span="12">
            <var-button block type="primary">返回</var-button>
        </var-col>
    </var-row>

    <var-style-provider :style-vars="styleVars">
        <var-popup v-model:show="datePickerVisible">
            <var-date-picker type="date" v-model="dateSpan" range @change="datePickerChange()"></var-date-picker>
        </var-popup>
    </var-style-provider>
</template>
  
<style scoped>
.query .var-row {
    margin-bottom: 12px !important;
}

.query .var-row:nth-last-child(1) {
    margin-bottom: 0 !important;
}

.content {
    flex-grow: 1;
    margin: 12px 0;
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
    /* height: 70%; */
}
</style>
  