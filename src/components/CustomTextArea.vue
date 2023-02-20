<script setup>
import { useField } from 'vee-validate';
import { ref, toRef, onMounted } from 'vue';
import { checkIfPersistedKeyExists, getPersistedKeyValue, setPersistedKeyValue } from '@/utils/storage';

const props = defineProps({
    id: { type: String, default: "custom-field", required: true },
    name: { type: String, default: "custom-field", required: true },
    label: { type: String, default: "Label", required: true },
    modelValue: { type: String, default: "" },
    value: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    maxLength: { type: [String, Number] },
    autoFocus: { type: Boolean, default: false },
    autoComplete: { type: String, default: "off" },
    persist: { type: Boolean, default: false },
    persistPattern: { type: String },
})

const hasValue = ref(false);
const isActive = ref(false);
const textarea = ref(null);
const name = toRef(props, "name");

const {
    value: modelValue,
} = useField(name, undefined, {
    initialValue: props.modelValue,
});

const handleFocus = () => {
    isActive.value = true;
    hasValue.value = true;
}

const handleBlur = (event) => {
    isActive.value = false;
    if (!event.target.value) {
        hasValue.value = false;
    }

    if (props.persist) {
        setPersistedKeyValue(props.name, event.target.value, props.persistPattern);
    }
}

onMounted(() => {
    if (!!textarea.value.value.length || !!props.modelValue?.length) {
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
        <div class="custom-input custom-input--float textarea" :class="{ 'has-val': hasValue, 'active': isActive }">
            <label :for="id">{{ label }}</label>
            <textarea ref="textarea" v-model="modelValue" :id="id" :name="name" @focus="handleFocus" @blur="handleBlur"
                :placeholder="isActive ? placeholder : ''" :autocomplete="autoComplete" :maxlength="maxLength" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/_forms.scss";
</style>