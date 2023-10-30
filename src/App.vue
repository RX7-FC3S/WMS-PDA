<script setup>
import { StyleProvider } from '@varlet/ui'
import { useRouter } from 'vue-router'
import { useGlobalStore } from '@/stores/global.js'

const globalStroe = useGlobalStore()
StyleProvider(globalStroe.rootStyleVars)


// 导航返回按钮跳转的路径
const router = useRouter()
const toIndex = () => {
  router.push('/')
}

</script>

<template>
  <!-- 导航栏 -->
  <var-app-bar :title="globalStroe.currentPageTitle" title-position="center">
    <template #left>
      <var-button color="transparent" text-color="#fff" round text @click="toIndex()">
        <var-icon name="chevron-left" :size="24" />
      </var-button>
    </template>

    <template #right>
      <var-menu>
        <var-button color="transparent" text-color="#fff" round text>
          <var-icon name="menu" :size="24" />
        </var-button>

        <template #menu>
          <var-cell ripple>
            用户：{{ globalStroe.currentUserInfo.username }}
            <br>
            姓名：{{ globalStroe.currentUserInfo.employeeName }}
            <br>
            仓库：{{ globalStroe.currentUserInfo.warehouse }}
          </var-cell>
        </template>
      </var-menu>
    </template>
  </var-app-bar>
  <!-- 主要内容 -->
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.var-app-bar {
  background: rgb(38, 38, 38);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.main {
  width: 100%;
  height: calc(100% - 54px);

  position: fixed;
  top: 54px;

  padding: 12px;

  display: flex;
  flex-direction: column;
}
</style>
