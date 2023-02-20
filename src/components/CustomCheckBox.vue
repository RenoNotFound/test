<script setup>
import { toRef } from 'vue';
import { useField } from 'vee-validate';

import alertIcon from '@/assets/images/icons/alert.svg';

const props = defineProps({
    id: { type: String, required: true, default: "checkbox" },
    name: { type: String, required: true, default: "checkbox" },
    label: { type: String },
    value: { type: null, default: false },
    checked: { type: Boolean, default: false }
})

const name = toRef(props, "name");

const { errorMessage, handleChange, meta } = useField(name, undefined, {
    type: 'checkbox',
    valueProp: props.value,
    initialValue: false,
    checkedValue: true,
    uncheckedValue: false,
})
</script>

<template>
    <div class="checkbox checkbox--custom">
        <label>
            <input type="checkbox" :id="id" :name="name" :checked="checked" :value="value" @input="handleChange">
            <span class="checkbox__icon"></span>
            <span class="checkbox__label">
                <span v-if="label">{{ label }}</span>
                <slot v-else class="checkbox__label-slot" name="label" />
            </span>
        </label>
        <div v-if="errorMessage" class="error-message">
            <img :src="alertIcon" alt="alert icon" height="13">
            <span>{{ errorMessage }}</span>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/styles/components/_checkbox.scss";
</style>