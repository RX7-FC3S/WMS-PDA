import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../views/index.vue'), meta: { title: '首页' } },

    // inbound

    // inbound order of finished goods
    {
        path: '/receiving_orders',
        component: () => import('../views/inbound/receivingOrder/receivingOrder.vue'),
        meta: { title: '收货单' },
        props: {
            defaultQuery: {
                orderType: 'FG_IN'
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