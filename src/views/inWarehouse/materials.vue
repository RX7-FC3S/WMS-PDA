<script setup>
import { ref } from 'vue'
import { request } from '../../utils/request.js'
import scrollTable from '../../components/scrollTable.vue';

const table = ref({
    head: [],
    data: []
})

// query
const query = ref({
    item_code: '',
    item_name: '',
})
// query end


// scroll-table
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

function load() {
    loading.value = true
    setTimeout(() => {
        let item_code = query.value.item_code
        let item_name = query.value.item_name
        let offset = table.value.data.length
        let limit = 10
        request(`/get_materials?item_code=${item_code}&item_name=${item_name}&offset=${offset}&limit=${limit}`)
            .then(res => {
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
                // 是否没有更多了
                if (res.length === 0) {
                    finished.value = true
                }
                loading.value = false
            })
    0}, 1000)
}


</script>

<template>
    <var-row :gutter="12">
        <var-col :span="12">
            <var-input style="flex-grow: 1;" variant="outlined" placeholder="物料编码" v-model="query.item_code"></var-input>
        </var-col>
        <var-col :span="12">
            <var-input style="flex-grow: 1;" variant="outlined" placeholder="物料描述" v-model="query.item_name"></var-input>
        </var-col>
    </var-row>

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
    
    <var-row :gutter="12">
        <var-col :span="12">
            <var-button block @click="inquire">查询</var-button>
        </var-col>
        <var-col :span="12">
            <var-button block type="primary">返回</var-button>
        </var-col>
    </var-row>
</template>
  
<style scoped>
.var-style-provider {
    flex-grow: 1;
}

.var--ellipsis {
    height: 100% !important;
}

.content {
    height: calc(100% - 52px - 52px);
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
</style>
  