<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue';

const props = defineProps({
  tableLoading: Boolean,
  tableFinished: Boolean,
  cellpadding: String, // px or %
  cellspaceing: String, // px or %
})

const emit = defineEmits({
  load: Function
})

const detector = ref()


onMounted(() => {
  emit('load')
})

</script>

<template>
  <table :cellpadding="cellpadding" :cellspacing="cellspaceing">
    <slot>
      <!--
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody> 
      -->
    </slot>
    <!-- div.detector 用于检测表格是否触发加载 -->
    <div class="detector" ref="detector"></div>
    <div class="load" v-if="!tableLoading && !tableFinished" @click="emit('load')">
      <slot name="load">点击加载更多</slot>
    </div>
    <div class="loading" v-if="tableLoading">

      <slot name="loading">加载中...</slot>
    </div>
    <div class="finished" v-if="tableFinished">
      <slot name="finished">没有更多了</slot>
    </div>
  </table>
</template>

<style>
table {
  width: 100%;
  height: 100%;
  display: block;
  box-shadow: 0 0 4px rgb(166, 166, 166);
  overflow: scroll;
}

table thead {
  background: rgb(250, 191, 0);
  height: 41px;
  position: sticky;
  /* 只有 table.display = block 的时候，thead.position = sticky 才会生效 */
  top: -1px;
  overflow-y: overlay;
}

table thead tr th {
  padding: 8px;
  border-bottom: 2px solid rgb(38, 38, 38);
}

table tbody {
  margin-top: 40px;
  overflow-y: scroll;
}

table tbody td {
  height: 40px;
  border-bottom: 1px solid rgb(166, 166, 166);
  white-space: nowrap;
  text-align: center;
}

.load,
.loading,
.finished {
  height: 40px;
  color: rgb(166, 166, 166);
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  left: 0;
}
</style>
