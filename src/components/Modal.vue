<script setup>
import { ref } from 'vue';
import closeIcon from "@/assets/images/icons/close.svg"
import closeIconDarkGrey from "@/assets/images/icons/close-dark-grey.svg"

const props = defineProps({
    name: { type: String, required: true }
})

const showModal = ref(false);
const closeBtnHovered = ref(false);
</script>

<template>
    <vue-final-modal v-model="showModal" v-slot="{ close }" :name="name" classes="modal-container"
        content-class="modal-content">
        <button class="modal__close" @click="close" @mouseenter="closeBtnHovered = true"
            @mouseleave="closeBtnHovered = false">
            <img v-if="!closeBtnHovered" :src="closeIcon" alt="close modal icon">
            <img v-else :src="closeIconDarkGrey" alt="close modal icon">
        </button>

        <div class="modal__header">
            <span class="modal__title">
                <slot name="title"></slot>
            </span>
        </div>

        <div class="modal__content">
            <slot name="content"></slot>
        </div>
    </vue-final-modal>
</template>

<style lang="scss" scoped>
@import "../assets/styles/components/modals/_modal.scss";
</style>