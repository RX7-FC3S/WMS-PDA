<script setup>
import { StyleProvider } from '@varlet/ui'
import { ref } from 'vue';
import { watch } from 'vue';
import { onMounted, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router'

// global styles
let rootStyleVars

rootStyleVars = {
  // font style
  '--font-size-lg': '20px',

  // input style
  '--field-decorator-outlined-normal-padding-top': '8px',
  '--field-decorator-outlined-normal-padding-bottom': '8px',
  '--field-decorator-outlined-normal-padding-left': '12px',
  '--field-decorator-outlined-normal-padding-right': '12px',

  // outlined input style
  '--field-decorator-focus-color': 'var(--black)',
  
  // button style
  '--button-normal-height': '40px',

  '--button-normal-font-size': '18px',

  '--button-default-color': 'var(--yellow)',
  '--button-default-text-color': 'var(--black)',

  '--button-primary-color': 'var(--black)',

  // popup style
  '--popup-content-background-color': 'none',

  // date-picker style
  '--date-picker-title-background': 'var(--yellow)',
  '--date-picker-title-color': 'var(--black)'


}

StyleProvider(rootStyleVars)


let route = useRoute()
let title = ref('')
watch(route, () => {
  title.value = route.meta.title
})

const router = useRouter()
const toIndex = () => {
  router.push('/')
}

</script>

<template>
  <!-- header -->
  <var-app-bar :title="title" title-position="center">
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
          <var-cell ripple>选项卡</var-cell>
          <var-cell ripple>选项卡</var-cell>
          <var-cell ripple>选项卡</var-cell>
        </template>
      </var-menu>
    </template>
  </var-app-bar>
  <!-- main -->
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
