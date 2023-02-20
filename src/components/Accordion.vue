<script setup>
import { reactive, provide } from 'vue';

import AccordionItem from "@/components/AccordionItem.vue";

const props = defineProps({
    items: { type: Array, required: true }
})

const accordion = reactive({ count: 0, active: null });
provide('accordion', accordion)
</script>

<template>
    <div class="accordion">
        <AccordionItem v-for="item in items" :title="item.question" :content="item.answer" />
</div>
</template>

<style lang="scss" scoped>@import "../assets/styles/components/_accordion.scss";</style>