<script setup>
import { ref, reactive, watchEffect, onMounted, computed } from 'vue';
import { Form } from 'vee-validate';
import { storeToRefs } from 'pinia';

import { checkIfPersistedKeyExists, getPersistedKeyValue, setPersistedKeyValue } from '@/utils/storage';
import { useGiftcardStore } from '@/stores/giftcard';
import { useFooterStore } from '@/stores/footer';

import useScrollToElement from '@/use/useScrollToElement';

import CustomTextInput from "@/components/CustomTextInput.vue";
import CustomSelectInput from "@/components/CustomSelectInput.vue";
import PaymentMethods from "@/components/PaymentMethods.vue";
import Button from "@/components/Button.vue";
import CustomCheckBox from "@/components/CustomCheckBox.vue";

import invoiceIcon from '@/assets/images/icons/invoice.svg';
import userIcon from '@/assets/images/icons/user-grey.svg';
import cardIcon from '@/assets/images/icons/credit-card.svg';

const { setFooterMini } = useFooterStore();
setFooterMini(true);

const giftcardStore = useGiftcardStore();
const { giftcardTitle, giftcardMsg, price, selectedTheme } = storeToRefs(giftcardStore);
const { persistPattern } = giftcardStore;

const billingTown = ref("");
const postCode = ref("");

const selectedItems = reactive({
    kapcs_titulus: "n",
    szamla_orszag: "HUN",
    szamla_tip: "magan",
    kapcs_telorszag: "0036"
})

const titulus = [
    { text: 'Nincs', value: 'n' },
    { text: 'Dr.', value: 'Dr.' },
    { text: 'Prof', value: 'Prof' }
];

const szamlaTipusok = [
    { text: 'Magánszemély', value: 'magan' },
    { text: 'Cég számára', value: 'ceg' },
];

const schema = {
    kapcs_titulus: 'requiredSelect',
    kapcs_vezeteknev: 'required',
    kapcs_keresztnev: 'required',
    kapcs_tel: 'required|min:8',
    kapcs_telorszag: 'requiredSelect',
    kapcs_email: 'required|email',
    szamla_nev: 'required',
    szamla_irszam: 'required',
    szamla_telepules: 'required',
    szamla_cim: 'required',
    szamla_tip: 'requiredSelect',
    szamla_orszag: 'requiredSelect',
    szamla_adoszam: selectedItems.szamla_tip === 'magan' ? '' : 'required',
    confirm__checkbox: value => {
        return value ? true : 'A repjegy.hu szabályzatának elfogadása kötelező!';
    },
};

const imgUrl = computed(() => `https://www.repjegy.hu/images/redesign2019/utalvanyv2/images/alap/utalvany_${selectedTheme.value}.jpg`)

const btnText = computed(() => `utalvány megrendelése, fizetendő: ${price.value} Ft`)

function onSubmit(values) {
    const data = { ...values, ...selectedItems }
    console.log(JSON.stringify(data, null, 2));
}

function onInvalidSubmit({ values, errors, results }) {
    const id = Object.keys(errors)[0];
    useScrollToElement(id);

    // console.log(values); // current form values
    // console.log(errors); // a map of field names and their first error message
    // console.log(results); // a detailed map of field names and their validation results
}

onMounted(() => {
    giftcardStore.getCountries();
    giftcardStore.getCountriesWithDialingCode();
    giftcardStore.getToken();

    if (checkIfPersistedKeyExists('price', persistPattern)) {
        const price = getPersistedKeyValue('price', persistPattern);
        giftcardStore.$patch({ selectedPrice: price})
        if (price === 'custom') {
            giftcardStore.$patch({customPrice: getPersistedKeyValue('giftcard__price', persistPattern)})
        }
    }

    if (checkIfPersistedKeyExists('theme', persistPattern)) {
        const theme = getPersistedKeyValue('theme', persistPattern);
        giftcardStore.$patch({selectedTheme: theme})
    }
})

watchEffect(() => {
    if (postCode.value.length === 4) {
        giftcardStore.getTownByPostCode(postCode.value);
        billingTown.value = giftcardStore.townByPostCode;
    } else {
        giftcardStore.resetTownByPostCode();
        billingTown.value = "";
    }
})
</script>

<template>
    <div class="container">
        <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit" :validation-schema="schema"
            v-slot="{ errors, validate, values }">
            <!-- {{ values }} -->
            <!-- {{ errors }} -->
            <div class="giftcard-contact__wrapper">
                <div class="giftcard-summary__wrapper">
                    <div class="card sticky-lg">
                        <div class="giftcard-summary__title">A megrendelés összegzése</div>
                        <div class="giftcard-summary__item">
                            <img :src="imgUrl" alt="" width="30" class="giftcard-summary__item__img">
                            <span class="giftcard-summary__item__text">Ajándékutalvány</span>
                            <span class="giftcard-summary__item__price">{{ price }} Ft</span>
                        </div>
                        <div class="giftcard-summary__price">Összesen: <h6>{{ price }} Ft</h6>
                        </div>
                    </div>
                </div>
                <div class="giftcard-input__wrapper">
                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="userIcon" alt="user-icon" height="21">
                                </div>
                                <div class="card__header__title">Kapcsolattartó</div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                <CustomSelectInput v-model="selectedItems.kapcs_titulus" id="kapcs_titulus"
                                    name="kapcs_titulus" label="Titulus" :options="titulus" :isFloating="true"
                                    :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <CustomTextInput id="kapcs_vezeteknev" name="kapcs_vezeteknev" label="Vezetéknév"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <CustomTextInput id="kapcs_keresztnev" name="kapcs_keresztnev" label="Keresztnév"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <CustomSelectInput v-model="selectedItems.kapcs_telorszag"
                                    :options="giftcardStore.countriesWithDialingCode" id="kapcs_telorszag"
                                    name="kapcs_telorszag" label="Telefonszám előhívó" :isFloating="true"
                                    :persist="true" :persistPattern="persistPattern" />
                            </div>
                            <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                <CustomTextInput id="kapcs_tel" name="kapcs_tel" label="Telefon"
                                    placeholder="pl. 06705288992" :isNumeric="true" :isFloating="true" :persist="true"
                                    :persistPattern="persistPattern" />
                            </div>
                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <CustomTextInput id="kapcs_email" name="kapcs_email" type="email" label="E-mail cím"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="invoiceIcon" alt="invoice-icon" height="24">
                                </div>
                                <div class="card__header__title">Számlázási adatok</div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                                <CustomSelectInput v-model="selectedItems.szamla_tip" :options="szamlaTipusok"
                                    id="szamla_tip" name="szamla_tip" label="Számla típusa" :isFloating="true"
                                    :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                                <CustomTextInput id="szamla_nev" name="szamla_nev" label="Számlázási név"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <CustomSelectInput v-model="selectedItems.szamla_orszag"
                                    :options="giftcardStore.countries" id="szamla_orszag" name="szamla_orszag"
                                    label="Ország" :isFloating="true" :persist="true"
                                    :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                                <CustomTextInput v-model="postCode" id="szamla_irszam" name="szamla_irszam"
                                    label="Irányítószám" :isNumeric="selectedItems.szamla_orszag === 'HUN'"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                                <CustomTextInput v-model="billingTown" id="szamla_telepules" name="szamla_telepules"
                                    label="Település" :isFloating="true" :persist="true"
                                    :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <CustomTextInput id="szamla_cim" name="szamla_cim" label="Cím" :isFloating="true"
                                    :persist="true" :persistPattern="persistPattern" />
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                :class="{ 'hidden': selectedItems.szamla_tip === 'magan' }">
                                <CustomTextInput id="szamla_adoszam" name="szamla_adoszam" label="Adószám"
                                    :isFloating="true" :persist="true" :persistPattern="persistPattern" />
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="cardIcon" alt="user-icon" height="27" style="fill: red">
                                </div>
                                <div class="card__header__title">Fizetési mód</div>
                            </div>
                            <div class="card__header__subtitle">Kérjük, válasszon a fizetési módok közül, amivel
                                szeretné
                                fizetni az utalványt!</div>
                        </div>
                        <PaymentMethods :card="true" :transfer="true" :paypal="false" />
                    </div>

                    <CustomCheckBox class="terms" id="confirm__checkbox" name="confirm__checkbox" :value="true">
                        <template v-slot:label>
                            Az utalvány megvásárlásával elfogadom a <a
                                href="https://www.repjegy.hu/adatkezelesi-tajekoztato" class="checkbox__label"
                                target="_blank">repjegy.hu</a> szabályzatát.
                        </template>
                    </CustomCheckBox>

                </div>
            </div>

            <div class="row">
                <div class="col-xs-12">
                    <Button type="submit" :text="btnText" color="secondary" @click="validate" />
                </div>
            </div>
        </Form>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts";

.container {
    margin-top: 6rem;
    margin-bottom: 3rem;

    @include media-breakpoint-up("lg") {
        margin-top: 3rem;
    }

    .giftcard-contact__wrapper {
        @include media-breakpoint-up("lg") {
            @include flex-container(space-between, $direction: row-reverse, $gap: 1.5rem);
        }

        .giftcard-summary__wrapper {
            @include media-breakpoint-up("lg") {
                width: 35%;
            }

            @include media-breakpoint-up("xl") {
                width: 25%;
            }

            .card {
                .giftcard-summary__title {
                    font-size: 1.1rem;
                    font-weight: bold;
                }

                .giftcard-summary__item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-top: 1px solid #a6a6bb;
                    border-bottom: 1px solid #a6a6bb;
                    padding: 0.5rem;
                    margin: 1rem 0;
                    font-size: 0.9rem;

                    .giftcard-summary__item__img {
                        margin-right: .7rem;
                    }

                    .giftcard-summary__item__text {
                        margin-right: auto;
                    }

                    .giftcard-summary__item__price {
                        margin-left: .7rem;

                        font-weight: bold;
                    }
                }

                .giftcard-summary__price {
                    display: flex;
                    justify-content: space-between;
                    font-size: 1.1rem;
                    font-weight: bold;
                }

            }
        }

        .giftcard-input__wrapper {
            @include media-breakpoint-up("lg") {
                width: 75%;
            }
        }
    }

}

.terms {
    margin-bottom: 1rem;
    font-size: 14px;
}

.terms .checkbox__label {
    @include font($emerald, .875rem, 700);
}
</style>