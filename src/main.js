import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { defineRule } from 'vee-validate';
import Vue3Autocounter from 'vue3-autocounter';
import { vfmPlugin } from 'vue-final-modal';
import { Collapse } from 'vue-collapsed'
import 'animate.css';

import App from './App.vue'
import router from './router'

import './assets/styles/main.scss'

defineRule('required', value => {
    if (!value || !value.length || !value.trim()) {
        return 'A mező kitöltése kötelező!';
    }
    return true;
});

defineRule('requiredSelect', value => !value || !value.length ? 'Válasszon egy opciót!' : true)

defineRule('email', value => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!value || !value.length) {
        return true;
    }

    if (!mailFormat.test(value)) {
        return 'Helytelen formátum!';
    }

    return true;
})

defineRule('giftcard_price', value => {
    return value >= 10000 ? true : 'Az utalvány minimum értéke 10 000 Ft!'
})

defineRule('min', (value, [limit]) => {
    // The field is empty so it should pass
    if (!value || !value.length) {
        return true;
    }

    if (value.length < limit) {
        return 'Helytelen formátum!';
    }

    return true;
});

const app = createApp(App)

app.directive('capitalize', (el) => {
    const value = el.innerText;
    const capitalizedFirstLetter = value[0].toUpperCase();
    const rest = value.slice(1);
    el.innerText = capitalizedFirstLetter + rest;
})

app.use(createPinia())
app.use(router)
app.use(vfmPlugin({
    key: 'vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
}))

app.component('vue3-autocounter', Vue3Autocounter)
app.component('Collapse', Collapse)

app.mount('#app')
