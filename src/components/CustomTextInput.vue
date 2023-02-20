<script setup>
import { ref, toRef, onMounted } from 'vue';
import { useField } from 'vee-validate';
import { useFocus } from '@vueuse/core';
import { encryptedStorage, checkIfPersistedKeyExists, getPersistedKeyValue, setPersistedKeyValue } from '@/utils/storage';

import alertIcon from '@/assets/images/icons/alert.svg';

const props = defineProps({
    id: { type: String, default: "custom-field", required: true },
    name: { type: String, default: "custom-field", required: true },
    label: { type: [String, Boolean], default: "Label", required: true },
    type: { type: String, default: "text" },
    size: { type: String, default: "" },
    modelValue: { type: [String, Number, null], default: "" },
    placeholder: { type: String, default: "" },
    maxLength: { type: [String, Number] },
    autoFocus: { type: Boolean, default: false },
    autoComplete: { type: String, default: "off" },
    isNumeric: { type: Boolean, default: false },
    isFloating: { type: Boolean, default: false },
    errorType: { type: String, default: "default" },
    validate: { type: Boolean, default: true },
    persist: { type: Boolean, default: false },
    persistPattern: { type: String }
})

const hasValue = ref(false);
const isActive = ref(false);
const input = ref(null);
const name = toRef(props, "name");

const { focused } = useFocus(input, { initialValue: props.autoFocus })

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
    isActive.value = true;
    hasValue.value = true;
}

const handleBlurs = (event) => {
    isActive.value = false;
    if (!event.target.value) {
        hasValue.value = false;
    }

    if (props.persist) {
        setPersistedKeyValue(props.name, event.target.value, props.persistPattern);
    }

    handleBlur(event, true);
}

const handleKeypress = (event) => {
    if (props.isNumeric) {
        let keyCode = event.which;

        /* 8 - (backspace), 32 - (space), 48-57 - (0-9)Numbers */
        if ((keyCode != 8 || keyCode == 32) && (keyCode < 48 || keyCode > 57)) {
            return event.preventDefault();
        }
    }

    if (props.hyphen) {
        let val = asd.value.split('-').join('');
        return val.match(/.{1,6}/g).join('-');
    }
}

onMounted(() => {
    if (!!input.value.value.length || !!props.modelValue?.length) {
        hasValue.value = true;
    }

    if (checkIfPersistedKeyExists(props.name, props.persistPattern) && props.persist) {
        hasValue.value = true;
        modelValue.value = getPersistedKeyValue(props.name, props.persistPattern);
    }
})
</script>

<template>
    <div class="custom-input__wrapper">
        <label v-show="!isFloating" :class="{'hidden' : !label}" for="custom-input">{{ label }}</label>

        <div class="custom-input"
            :class="[size === 'sm' ? 'custom-input-sm' : size === 'lg' ? 'custom-input-lg' : ''],
            { 'custom-input--float': isFloating, 'has-val': hasValue, 'active': isActive, 'has-error': (!!errorMessage && meta.touched) && validate, 'success': (meta.valid && meta.touched && meta.dirty) && validate }">

            <label v-if="isFloating" :for="id">{{ label }}</label>
            <input ref="input" v-model="modelValue" :id="id" :name="name" :type="type"
                :placeholder="(isFloating && isActive) || !isFloating ? placeholder : ''" :autocomplete="autoComplete"
                :maxlength="maxLength" @focus="handleFocus" @blur="handleBlurs" @change="handleChange"
                @input="handleChange" @keypress="handleKeypress">
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
@import "../assets/styles/components/_forms";
</style>