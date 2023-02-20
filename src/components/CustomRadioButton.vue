<script setup>
const props = defineProps({
    id: { type: String, required: true, default: "CustomCheckBox" },
    name: { type: String, required: true, default: "CustomCheckBox" },
    label: { type: String },
    value: { type: null, default: "" },
    checked: { type: Boolean, default: false }
})

</script>

<template>
    <div class="radio radio--custom">
        <label>
            <input type="radio" :name="name" :id="id" :value="value">
            <span class="radio__icon"></span>
            <span>{{ label }}</span>
        </label>
    </div>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/_radio_button.scss";
</style>