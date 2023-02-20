<script setup>
import { ref, inject, computed } from 'vue';

import chevronDownIcon from '@/assets/images/icons/chevron-down-dark-grey.svg';

const props = defineProps({
    title: { type: String, required: true },
    content: { type: String, required: true },
})

const index = ref(null);
const contentRef = ref(null);
const accordion = inject('accordion');
index.value = accordion.count++;
const visible = computed(() => index.value === accordion.active);

// console.log(visible);

const open = () => {
    if (visible.value) {
        accordion.active = null;
    } else {
        accordion.active = index.value;
    }
}
</script>

<template>
    <div class="accordion__item">
        <div class="accordion__header">
            <div class="accordion__header--trigger" :class="{ 'accordion--trigger-active': visible }" @click="open">
                <span class="accordion__title">{{ title }}</span>
                <img class="accordion__icon chevron-down" :src="chevronDownIcon" alt="chevron down">
            </div>
        </div>

        <div class="accordion__body">
            <Collapse :when="visible" class="collapse">
                <div class="accordion__content">
                    <p>{{ content }}</p>
                </div>
            </Collapse>
        </div>
</div>
</template>

<style lang="scss" scoped>@import "../assets/styles/components/_accordion.scss";</style>