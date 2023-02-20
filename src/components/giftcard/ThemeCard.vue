<script setup>
import { ref, inject, computed } from 'vue';

const props = defineProps({
    modelValue: { type: Number },
    theme: { type: String, required: true },
    selectTheme: { type: Function, required: true }
})

const emit = defineEmits(['setTheme'])

const index = ref(null);
const themeCard = inject('themeCard');

themeCard.theme = props.theme;
index.value = themeCard.count++;

const selected = computed(() => index.value === themeCard.selected);
const defaultSelected = computed(() => themeCard.defaultSelected === props.theme);
const imgUrl = computed(() => `https://www.repjegy.hu/images/redesign2019/utalvanyv2/images/alap/utalvany_${props.theme}.jpg`)

const themeName = computed(() => {
    if (props.theme === "default") {
        return "repülés";
    } else if (props.theme === "metropolisz") {
        return "világváros";
    } else if (props.theme === "karacsony") {
        return "karácsony";
    } else if (props.theme === "gratulacio") {
        return "gratulació";
    } else {
        return props.theme;
    }
})

const select = () => {
    themeCard.defaultSelected = null;
    if (selected.value) {
        themeCard.selected = null;
    } else {
        themeCard.selected = index.value;
    }

    props.selectTheme(props.theme);
}
</script>

<template>
    <div class="col-xs-12 col-sm-6 col-md-4">
        <div class="giftcard__theme-card grow" :class="{
            'selected': selected || defaultSelected
        }, theme" @click="select" :style="{ backgroundImage: 'url(' + imgUrl + ')' }" v-capitalize>{{ themeName }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/pages/giftcard/_giftcard_editor.scss";
</style>