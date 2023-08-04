<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue';

const props = defineProps({
  finished: Boolean,
  loading: Boolean,
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
  <table cellpadding="0" cellspacing="0">
    <slot></slot>
    <div ref="detector"></div>
    <div class="load" v-if="!finished && !loading" @click="emit('load')">点击加载更多</div>
    <div class="loading" v-if="loading">加载中...</div>
    <div class="finished" v-if="finished">没有更多了</div>
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
  background: var(--yellow);
  height: 41px;

  /* 只有 table.display = block 的时候，thead.position = sticky 才会生效 */
  position: sticky;
  top: -1px
}

table thead tr th {
  padding: 8px;
  border-bottom: 2px solid var(--balck);
}

table tbody {
  margin-top: 40px;
  overflow-y: scroll;
}

table tbody td {
  height: 40px;
  border-bottom: 1px solid var(--gray);
  white-space: nowrap;
  text-align: center;
}

.load,
.loading,
.finished {
  height: 40px;
  color: var(--gray);

  display: flex;
  align-items: center;
  justify-content: center;

  position: sticky;
  left: 0;
}
</style>
