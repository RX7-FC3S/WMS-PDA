import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { get_user_info } from '@/api/userInfo.js'

export const useGlobalStore = defineStore('global', () => {
    // 当前页标题，用于为导航栏标题自动赋值
    const currentPageTitle = ref()
    const route = useRoute()
    watch(route, () => {
        // 取值为 router.js/routes/route.meta.title, 为手动设置
        currentPageTitle.value = route.meta.title
    })

    //获取当前登录用户的信息
    const currentUserInfo = ref({})
    get_user_info({}).finally(() => {
        currentUserInfo.value = {
            'username': 'X2004768',
            'employeeName': '张三',
            'warehouse': 'W1'
        }
    })

    // varlet 自定义样式
    const rootStyleVars = ref({
        // 字体大小
        '--font-size-lg': '20px',

        // 输入框样式
        '--field-decorator-outlined-normal-padding-top': '8px',
        '--field-decorator-outlined-normal-padding-bottom': '8px',
        '--field-decorator-outlined-normal-padding-left': '12px',
        '--field-decorator-outlined-normal-padding-right': '12px',

        // 外框线样式
        '--field-decorator-focus-color': 'var(--black)',

        // 按钮样式
        '--button-normal-height': '40px',
        '--button-normal-font-size': '18px',
        '--button-default-color': 'var(--yellow)',
        '--button-default-text-color': 'var(--black)',
        '--button-primary-color': 'var(--black)',

        // 弹窗样式
        '--popup-content-background-color': 'none',

        // 日期选择器样式
        '--date-picker-title-background': 'var(--yellow)',
        '--date-picker-title-color': 'var(--black)',

        // 图标样式
        '--field-decorator-outlined-normal-icon-padding': '0'
    })

    return { currentPageTitle, currentUserInfo, rootStyleVars }
})