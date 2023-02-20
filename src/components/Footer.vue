<script setup>
import { ref, onMounted, onUnmounted, inject } from "vue";
import { RouterLink } from 'vue-router';
import { Form } from 'vee-validate';
import { onIntersect } from '@/use/useOnIntersect';
import { useFooterStore } from '@/stores/footer';


import CustomTextInput from "@/components/CustomTextInput.vue";
import Button from "@/components/Button.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";

import phoneIcon from '@/assets/images/icons/phone.svg';
import userGroupIcon from '@/assets/images/icons/user-group.svg';
import fbIcon from '@/assets/images/icons/face.svg';
import instaIcon from '@/assets/images/icons/instagram.svg';
import chevronDownIcon from '@/assets/images/icons/chevron-down.svg';
import mastercardLogo from '@/assets/images/icons/mastercard.svg';
import visaLogo from '@/assets/images/icons/visa.svg';
import payuLogo from '@/assets/images/icons/payu.svg';
import paypalLogo from '@/assets/images/icons/paypal.svg';

const footerStore = useFooterStore();

const autoCounter1 = ref(null);
const autoCounter2 = ref(null);
const autoCounter3 = ref(null);
const autoCounter4 = ref(null);
const autoCounter5 = ref(null);
const autoCounter6 = ref(null);

const observer = ref({});
const scrollRef = ref({});

const props = defineProps({
    isFooterMini: Boolean
})

const onEnter = () => {
    startCounter();
};

const startCounter = () => {
    autoCounter1.value.start();
    autoCounter2.value.start();
    autoCounter3.value.start();
    autoCounter4.value.start();
    autoCounter5.value.start();
    autoCounter6.value.start();
}

const schema = {
    test: 'required',
    newsletter__name: 'required',
    newsletter__email: 'required|email',
    newsletter__checkbox: value => {
        return value ? true : 'Az adatkezelési tájékoztató elfogadása kötelező!';
    },
};

const onSubmit = (values) => {
    const data = { ...values }
    console.log(JSON.stringify(data, null, 2));
}

onMounted(() => {
    if (!footerStore.isFooterMini) {
        observer.value = onIntersect(scrollRef.value, { threshold: 0.6 }, onEnter);
    }
})

onUnmounted(() => {
    if (!footerStore.isFooterMini) {
        observer.value.disconnect();
    }
}) 
</script>

<template>
    <footer class="footer">
        <div v-if="!footerStore.isFooterMini" ref="scrollRef" class="footer__top">
            <div class="container">
                <section class="block block--stats">
                    <h2 class="block__title">Miért válassza a repjegy.hu-t?</h2>
                    <ul class="block__list row">
                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <vue3-autocounter ref="autoCounter1" :startAmount="0" :endAmount="16" :duration="1"
                                    :autoinit="false" />
                                <span> éve</span>
                            </h3>
                            <p class="block__description">vagyunk jelen a hazai piacon</p>
                        </li>

                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <vue3-autocounter ref="autoCounter2" :startAmount="0" :endAmount="300000" :duration="1"
                                    :autoinit="false" separator=' ' />

                                <span>+</span>
                            </h3>
                            <p class="block__description">utast szolgáltunk ki eddig</p>
                        </li>

                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <vue3-autocounter ref="autoCounter3" :startAmount="0" :endAmount="500" :duration="1"
                                    :autoinit="false" />
                                <span>+</span>
                            </h3>
                            <p class="block__description">légitársaság ajánlatát kínáljuk egy helyen</p>
                        </li>

                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <vue3-autocounter ref="autoCounter4" :startAmount="0" :endAmount="4000" :duration="1"
                                    :autoinit="false" separator=' ' />
                                <span>+</span>
                            </h3>
                            <p class="block__description">úti célra kínálunk repjegyeket világszerte</p>
                        </li>

                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <vue3-autocounter ref="autoCounter5" :startAmount="0" :endAmount="150" :duration="1"
                                    :autoinit="false" />
                                <span> hívást</span>
                            </h3>
                            <p class="block__description">válaszolunk meg átlagosan naponta</p>
                        </li>

                        <li class="block__item col-xs-6 col-md-4 col-lg-2">
                            <div class="block__icon"></div>
                            <h3 class="block__name">
                                <span>Napi </span>
                                <vue3-autocounter ref="autoCounter6" :startAmount="0" :endAmount="8" :duration="1"
                                    :autoinit="false" />
                                <span> órában</span>
                            </h3>
                            <p class="block__description">érhető el magyar nyelvű ügyfélszolgálatunk</p>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
        <div v-if="!footerStore.isFooterMini" class="footer__middle-top">
            <div class="container">
                <div class="row">
                    <div class="block--help__wrapper col-xs-12 col-lg-6 col-xl-4">
                        <div class="block block--help">
                            <h2 class="block__title">Segítségre van szüksége?</h2>
                            <div class="block__content">
                                <div class="block__phone">
                                    <img :src="phoneIcon" alt="phone-icon">
                                    <span>061 510 0550</span>
                                </div>
                                <div class="block__timesheet timesheet">
                                    <div class="timesheet-row">
                                        <span class="timesheet-day">Hétfő - Péntek</span>
                                        <span class="timesheet-time">9:00 - 17:00</span>
                                    </div>
                                </div>
                            </div>

                            <RouterLink to="#" class="block__btn">
                                <Button text="Ügyfélszolgálat" color="secondary" size="sm">
                                    <template v-slot:icon>
                                        <img :src="userGroupIcon" alt="user-group" height="21" width="21">
                                    </template>
                                </Button>
                            </RouterLink>

                            <p class="block__footer">
                                Gyors megoldást keres? Nézze meg a
                                <span>
                                    <RouterLink to="#">gyakran feltett kérdésekre</RouterLink>
                                </span>
                                adott válaszainkat!
                            </p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-lg-6 col-xl-4">
                        <div class="block block--help">

                            <h2 class="block__title">Iratkozzon fel hírlevelünkre!</h2>

                            <div class="block__footer subscribe">
                                <Form class="block__newsletter__sign-up" @submit="onSubmit" :validation-schema="schema"
                                    v-slot="{ validate, values }">
                                    <div class="row">
                                        <div class="col-xs-12">
                                            <div class="row">
                                                <div class="col-xs-12">
                                                    <CustomTextInput id="newsletter__name" name="newsletter__name"
                                                        label="Név" :isFloating="true" />
                                                </div>
                                                <div class="col-xs-12">
                                                    <CustomTextInput id="newsletter__email" name="newsletter__email"
                                                        type="email" label="E-mail cím" :isFloating="true" />
                                                </div>
                                            </div>

                                            <CustomCheckBox id="newsletter__checkbox"
                                                name="newsletter__checkbox" :value="true"
                                                class="block__newsletter__checkbox">
                                                <template v-slot:label>
                                                    <span>
                                                        Feliratkozom a repjegy.hu hírlevelére, az <a
                                                            href="https://www.repjegy.hu/adatkezelesi-tajekoztato"
                                                            target="_blank">adatkezelési tájékoztatóban</a> leírtakat
                                                        elfogadom.
                                                    </span>
                                                </template>
                                            </CustomCheckBox>
                                            <Button class="block__newsletter__btn" type="submit" text="Feliratkozás"
                                                color="secondary" size="sm" @click="validate" />
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div class="block--social__wrapper col-xs-12 col-lg-6 col-xl-4">
                        <div class="block block--social">
                            <h2 class="block__title">Kövessen minket!</h2>
                            <p class="block__text">Ne maradjon le semmiről! Találkozzunk a közösségi oldalakon, ahol
                                rendszeresen jelentkezünk repülőjegy akciókkal, nyereményjátékokkal és úti cél
                                ajánlókkal!
                            </p>
                            <div class="block--social__links">
                                <a href="https://www.facebook.com/Repulojegy/" target="_blank">
                                    <img :src="fbIcon" style="width:50px;">
                                </a>
                                <a href="https://www.instagram.com/repjegy.hu/" target="_blank">
                                    <img :src="instaIcon" style="width:50px;">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="!footerStore.isFooterMini" class="footer__middle-bottom">
            <div class="container">
                <div class="block block--payment">
                    <h2 class="block__title">Fizetési lehetőségek</h2>
                    <div class="block__content">
                        <img :src="mastercardLogo" alt="mastercard logo">
                        <img :src="visaLogo" alt="visa logo">
                        <img :src="payuLogo" alt="payu logo">
                        <img :src="paypalLogo" alt="paypal logo">
                    </div>
                </div>

                <nav class="nav--footer">
                    <ul class="nav__list">
                        <li class="nav__item">
                            <RouterLink to="#" class="nav__link">Felhasználási feltételek</RouterLink>
                        </li>
                        <li class="nav__item">
                            <RouterLink to="#" class="nav__link">Adatkezelési tájékoztató</RouterLink>
                        </li>
                        <li class="nav__item">
                            <RouterLink to="#" class="nav__link">Hírlevél</RouterLink>
                        </li>
                        <li class="nav__item">
                            <RouterLink to="#" class="nav__link">Kapcsolat</RouterLink>
                        </li>
                        <li class="nav__item">
                            <RouterLink to="#" class="nav__link">Impresszium</RouterLink>
                        </li>
                    </ul>
                </nav>

                <p class="footer__copyright">© 2023 repjegy.hu I Minden jog fenntartva.</p>
            </div>
        </div>
        <div class="footer__bottom">
            <div class="container">
                <p class="footer__copyright">© 2023 repjegy.hu I Minden jog fenntartva.</p>
                <div class="footer__scroll-top">
                    <span>Felszállás</span>

                    <a href="#top">
                        <Button class="scroll-top__btn" text="" color="secondary">
                            <template v-slot:icon>
                                <img :src="chevronDownIcon" alt="scroll top">
                            </template>
                        </Button>
                    </a>
                </div>
            </div>
        </div>
</footer>
</template>

<style lang="scss" scoped>@import "../assets/styles/layout/_footer.scss";</style>