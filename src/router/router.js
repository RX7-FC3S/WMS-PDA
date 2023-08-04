import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/index.vue'), meta: { title: '首页' } },
    // inbound
    { path: '/inbound-order-of-finished-goods', component: () => import('../views/inbound/order/inboundOrderOfFinishedGoods.vue'), meta: { title: '成品出库' } },
    { path: '/inbound-order-of-intermediate-goods', component: () => import('../views/inbound/order/inboundOrderOfFinishedGoods.vue'), meta: { title: '成品出库' } },


    // outbound
    { path: '/outbound-order-finished-goods', component: () => import('../views/outbound/order/outboundOrderOfFinishedGoods.vue'), meta: { title: '成品出库' } },
    { path: '/outbound-order-intermediate-goods', component: () => import('../views/outbound/order/outboundOrderOfIntermediateGoods.vue'), meta: { title: '半成品出库' } },


    // inWarehouse
    { path: '/materials', component: () => import('../views/inWarehouse/materials.vue'), meta: { title: '物料信息' } },

    // debug components
    { path: '/scroll-table', component: () => import('../components/scrollTable.vue'), meta: { title: 'scroll-table' } },
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