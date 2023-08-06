import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/index.vue'), meta: { title: '首页' } },

    // inbound

    // inbound order of finished goods
    {
        path: '/inbound-order-of-finished-goods',
        component: () => import('../views/inbound/order/inboundOrder.vue'),
        meta: { title: '成品入库' },
        props: {
            defaultQuery: {
                orderType: 'FG_IN'
            }
        }
    },
    // inbound order of intermediate goods
    {
        path: '/inbound-order-of-intermediate-goods',
        component: () => import('../views/inbound/order/inboundOrder.vue'),
        meta: { title: '半成品入库' },
        props: {
            defaultQuery: {
                orderType: 'IG_IN',
            }
        }
    },

    // inWarehouse
    { path: '/materials', component: () => import('../views/inWarehouse/materials.vue'), meta: { title: '物料信息' } },

    // debug components
    { path: '/scroll-table', component: () => import('../components/scrollTable.vue'), meta: { title: 'scroll-table' } },
    { path: '/date-range-input', component: () => import('../components/dateRangeInput.vue'), meta: { title: 'date-range-input' } },
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