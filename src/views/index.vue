<script setup>
import { ref } from 'vue'

const value = ref('')


const menusAvailable = [
    {
        title: '入库',
        items: [
            {
                title: '成品入库',
                to: '/inbound-order-of-finished-goods'
            },
            {
                title: '半成品入库',
                to: '/inbound-order-of-intermediate-goods'
            },
            {
                title: '退货入库',
                to: '/#'
            },
        ]
    },
    {
        title: '出库',
        items: [
            {
                title: '成品出库',
                to: '/#'
            },
            {
                title: '配件出库',
                to: '/#'
            },
            {
                title: '返厂出库',
                to: '/#'
            },
        ]
    },
    {
        title: '库内',
        items: [
            {
                title: '物料信息',
                to: '/materials'
            },

        ]
    },
    {
        title: '调试',
        items: [
            {
                title: 'date-range-input',
                to: '/date-range-input'
            },
            {
                title: 'scroll-table',
                to: '/scroll-table'
            },
        ]
    }
]

</script>
<template>
    <var-collapse v-model="value" accordion :offset="false">
        <var-collapse-item v-for="menu in menusAvailable" :title="menu.title">
            <var-cell v-for="item in menu.items"><router-link  :to="item.to">{{ item.title }}</router-link></var-cell>
            
        </var-collapse-item>
    </var-collapse>
</template>

<style scoped></style>
