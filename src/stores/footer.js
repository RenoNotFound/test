import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFooterStore = defineStore('footer', () => {
    const isFooterMini = ref(false);

    const setFooterMini = (value) => isFooterMini.value = value;

    return { isFooterMini, setFooterMini }
}, { persist: true })