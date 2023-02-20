<script setup>
import { ref, inject, computed } from 'vue';
import useNumberFormat from "@/use/useNumberFormat";

const props = defineProps({
    price: { type: [Number, String], required: true },
    selectPrice: { type: Function, required: true }
})

const emit = defineEmits(['setPrice'])

const index = ref(null);
const priceTag = inject('priceTag');
index.value = priceTag.count++;
priceTag.value = props.price;

const selected = computed(() => index.value === priceTag.selected);
const defaultSelected = computed(() => priceTag.defaultPrice === props.price);

const value = computed(() => {
    if (isNaN(props.price)) {
        return 'Más összeg';
    } else {
        return useNumberFormat(props.price) + " Ft";
    }
})

const select = () => {
    priceTag.defaultPrice = null;

    if (selected.value) {
        priceTag.selected = null;
    } else {
        priceTag.selected = index.value;
    }

    props.selectPrice(props.price);
}

</script>

<template>
    <div class="col-xs-12 col-sm-4 col-lg-2 col-xl-2">
        <div class="giftcard__price-tag" :class="{
            'selected': selected || defaultSelected
        }" @click="select">{{ value }} </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/pages/giftcard/_giftcard_editor.scss";
</style>