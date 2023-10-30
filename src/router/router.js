import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    // 首页
    { path: '/', component: () => import('@/views/index.vue'), meta: { title: '首页' } },

    // 入库
    {
        path: '/receiving_orders',
        component: () => import('@/views/inbound/receivingOrder/receivingOrder.vue'),
        meta: { title: '收货单' }
    },
    // 出库
    {
        path: '/shipping_orders',
        component: () => import('@/views/outbound/shippingOrder/shippingOrder.vue'),
        meta: { title: '发货单' }
    },

    // 库内
    { path: '/items', component: () => import('@/views/warehouseManagement/item.vue'), meta: { title: '物料信息' } },

    // 调试
    { path: '/scroll-table', component: () => import('@/components/scrollTable.vue'), meta: { title: 'scroll-table' } },
    { path: '/date-range-input', component: () => import('@/components/dateRangeInput.vue'), meta: { title: 'date-range-input' } },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title
    next()
})

export { router }