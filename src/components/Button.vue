<script setup>
defineProps({
    text: { type: String, required: true, default: "gomb" },
    type: { type: String, default: "button" },
    color: { type: String, required: true, default: "" },
    size: { type: String, default: "" }
})
</script>

<template>
    <button :type="type" class="btn" :class="[
        color === 'primary' ? 'btn-primary' : color === 'secondary' ? 'btn-secondary' : '',
        color === 'outline-primary' ? 'btn-outline-primary' : color === 'outline-secondary' ? 'btn-outline-secondary' : '',
        size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''
    ]">
        <slot class="btn__slot" name="icon" />
        <span class="btn__text">{{ text }}</span>
</button>
</template>

<style lang="scss" scoped>@import "../assets/styles/components/_buttons.scss";</style>