<script setup>
import { ref } from 'vue'

const props = defineProps({
    defaultDateSpan: Array
})
defineEmits(['update:defaultDateSpan'])

const datePickerVisible = ref(false)

function datePickerChange() {
    console.log()
}

</script>

<template>
    <!-- <var-input variant="outlined" placeholder="时间范围">
        <template #append-icon>
            <var-icon namespace="mdi" name="calendar-clock" size="24px" @click="datePickerVisible = true" />
        </template>
    </var-input>

    <var-popup v-model:show="datePickerVisible">
        <var-date-picker type="date" v-model="defaultDateSpan" range @change="datePickerChange()"></var-date-picker>
    </var-popup> -->
</template>

<style>
.var-date-picker {
    width: calc(100vw - 24px);
}
</style>
