<script setup>
import { ref } from 'vue'

const value = ref([])

import { useIndexStore } from '@/stores/index.js'
const indexStore = useIndexStore()

</script>
<template>
    <var-collapse v-model="value" :offset="false">
        <var-collapse-item v-for="menu in indexStore.menus" :title="menu.title">
            <var-cell v-for="item in menu.items" index>
                <router-link :to="item.to">{{ item.title }}</router-link>
            </var-cell>
        </var-collapse-item>
    </var-collapse>
</template>

<style scoped></style>
