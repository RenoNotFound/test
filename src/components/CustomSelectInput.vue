<script setup>
import { ref, toRef, onMounted } from 'vue';
import { useField, Field } from 'vee-validate';
import { useFocus } from '@vueuse/core';
import { checkIfPersistedKeyExists, getPersistedKeyValue, setPersistedKeyValue } from '@/utils/storage';

import alertIcon from '@/assets/images/icons/alert.svg';

const props = defineProps({
    id: { type: String, default: "custom-field", required: true },
    name: { type: String, default: "custom-field", required: true },
    label: { type: [String, Boolean], default: "Label", required: true },
    size: { type: String, default: "" },
    modelValue: { type: [String, Number, null], default: "" },
    placeholder: { type: String, default: "" },
    autoFocus: { type: Boolean, default: false },
    isFloating: { type: Boolean, default: false },
    errorType: { type: String, default: "default" },
    validate: { type: Boolean, default: true },
    persist: { type: Boolean, default: false },
    persistPattern: { type: String },
    options: { type: Array },
})

const emit = defineEmits(['update:modelValue'])

const hasValue = ref(false);
const isActive = ref(false);
const select = ref(null);
const name = toRef(props, 'name');

const {
    value: modelValue,
    meta,
    errorMessage,
    handleBlur,
    handleChange,
} = useField(name, undefined, {
    initialValue: props.modelValue,
});

const handleFocus = () => {
    hasValue.value = true;
    isActive.value = true;
}

const handleBlurs = (event) => {
    isActive.value = false;
    if (!event.target.value) {
        hasValue.value = false;
    }

    if (props.persist) {
        setPersistedKeyValue(props.name, event.target.value, props.persistPattern);
    }

    handleBlur(event, true)
}

onMounted(() => {
    if (checkIfPersistedKeyExists(props.name, props.persistPattern) && props.persist) {
        hasValue.value = true;
        modelValue.value = getPersistedKeyValue(props.name, props.persistPattern);
    }

    if (!!props.modelValue?.length) {
        hasValue.value = true;
    }
})
</script>

<template>
    <div class="custom-input__wrapper">
        <label v-show="!isFloating" :class="{'hidden' : !label}" for="custom-input">{{ label }}</label>

        <div class="custom-input select"
            :class="[size === 'sm' ? 'custom-input-sm' : size === 'lg' ? 'custom-input-lg' : ''],
            { 'custom-input--float': isFloating, 'has-val': hasValue, 'active': isActive, 'has-error': (!!errorMessage && meta.touched) && validate, 'success': (meta.valid && meta.touched) && (validate && !errorMessage)}">

            <label v-if="isFloating" :for="id">{{ label }}</label>
            <Field v-model="modelValue" ref="select" :id="id" :name="name" as="select"
                @change="handleChange" @focus="handleFocus" @blur="handleBlurs">
                <option value=""></option>
                <option v-for="option in options" :value="option.value">{{ option.text }}</option>
            </Field>
        </div>

        <div v-if="!!errorMessage && meta.touched" class="custom-error">
            <div v-if="errorType === 'tooltip'" class="custom-error__tooltip-msg">
                <span>{{ errorMessage }}</span>
            </div>
            <div v-else class="custom-error__msg">
                <img :src="alertIcon" alt="alert icon" height="13">
                <span>{{ errorMessage }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/_forms.scss";
</style>