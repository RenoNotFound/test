<script setup>
import { ref, reactive, provide, computed, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Form } from 'vee-validate';
import { useFooterStore } from '@/stores/footer';
import { useGiftcardStore } from '@/stores/giftcard';
import useScrollToElement from '@/use/useScrollToElement';
import { checkIfPersistedKeyExists, getPersistedKeyValue, setPersistedKeyValue } from '@/utils/storage';

import PriceTag from '@/components/giftcard/PriceTag.vue';
import ThemeCard from '@/components/giftcard/ThemeCard.vue';
import GiftcardPreview from '@/components/giftcard/GiftcardPreview.vue';
import CustomTextInput from '@/components/CustomTextInput.vue';
import CustomTextArea from '@/components/CustomTextArea.vue';
import Button from '@/components/Button.vue';

import eyeIcon from '@/assets/images/icons/eye.svg';
import customMsgIcon from '@/assets/images/icons/custom-msg.svg';
import coinsIcon from '@/assets/images/icons/coins.svg';

const router = useRouter();

const { setFooterMini } = useFooterStore();
setFooterMini(true);

const giftcardStore = useGiftcardStore();
const { giftcardTitle, giftcardMsg, price, customPrice, selectedPrice, selectedTheme } = storeToRefs(giftcardStore);
const { prices, themes, persistPattern, MAX_TITLE_LENGTH, MAX_MSG_LENGTH } = giftcardStore;

const priceTag = reactive({ count: 0, value: 0, selected: null, defaultPrice: selectedPrice.value });
const themeCard = reactive({ count: 0, theme: '', selected: null, defaultSelected: selectedTheme.value });

provide('priceTag', priceTag);
provide('themeCard', themeCard);

const schema = {
    giftcard__price: 'giftcard_price',
};

const charsLeft = computed(() => {
    return {
        giftcardTitle: MAX_TITLE_LENGTH - giftcardTitle.value.length,
        giftcardMsg: MAX_MSG_LENGTH - giftcardMsg.value.length
    }
})

const setSelectedPrice = (value) => {
    giftcardStore.$patch({ selectedPrice: value });
    setPersistedKeyValue('price', value, persistPattern);
}

const setSelectedTheme = (value) => {
    giftcardStore.$patch({ selectedTheme: value })
    setPersistedKeyValue('theme', value, persistPattern);
}

const onSubmit = (values) => {
    router.push('/utalvany/kapcsolat');
}

const onInvalidSubmit = ({ values, errors, results }) => {
    if (selectedPrice.value === 'custom') {
        const id = Object.keys(errors)[0];
        useScrollToElement(id);
    } else {
        router.push('/utalvany/kapcsolat');
    }
}

onMounted(() => {
    if (checkIfPersistedKeyExists('price', persistPattern)) {
        const price = getPersistedKeyValue('price', persistPattern);
        priceTag.defaultPrice = price
        giftcardStore.$patch({ selectedPrice: price })
        if (price === 'custom') {
            giftcardStore.$patch({ customPrice: getPersistedKeyValue('giftcard__price', persistPattern) })
        }
    }

    if (checkIfPersistedKeyExists('theme', persistPattern)) {
        const theme = getPersistedKeyValue('theme', persistPattern);
        themeCard.defaultSelected = theme
        giftcardStore.$patch({ selectedTheme: theme })
    }
})
</script>

<template>
    <div class="container">
        <Form @submit="onSubmit" @invalid-submit="onInvalidSubmit" :validation-schema="schema"
            v-slot="{ validate, errors }">
            <!-- {{ errors }} -->
            <div class="blocks__wrapper">
                <section class="block block--customization">
                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="coinsIcon" alt="">
                                </div>
                                <div class="card__header__title">Válasszon összeget!</div>
                            </div>
                        </div>

                        <div class="row">
                            <PriceTag v-for="price in prices" :selectPrice="setSelectedPrice" :price="price" />
                            <div v-show="selectedPrice === 'custom'" class="col-xs-12 col-lg-6">
                                <CustomTextInput v-model="customPrice" class="giftcard-price__input" id="giftcard__price"
                                    name="giftcard__price" label="" maxLength="15" :isNumeric="true" :autoFocus="true"
                                    :persist="true" :persistPattern="persistPattern" />
                                <small>Az utalvány minimum értéke 10 000 Ft!</small>
                            </div>
                        </div>
                    </div>

                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="eyeIcon" alt="" height="32">
                                </div>
                                <div class="card__header__title">Válasszon megjelenést!</div>
                            </div>
                        </div>

                        <div class="row">
                            <ThemeCard v-for="theme in themes" :selectTheme="setSelectedTheme" :theme="theme" />
                        </div>
                    </div>

                    <div class="card">
                        <div class="card__header">
                            <div class="card__header__item">
                                <div class="card__header__icon">
                                    <img :src="customMsgIcon" alt="" height="28">
                                </div>
                                <div class="card__header__title">Írjon egy személyes üzenetet!</div>
                            </div>
                        </div>

                        <div class="giftcard__title__wrapper">
                            <h6 class="card__subtitle">Ajándékutalvány címe</h6>
                            <CustomTextInput v-model="giftcardTitle" :value="giftcardTitle" class="giftcard__title"
                                id="giftcard__title" name="giftcard__title" label="" :maxLength="MAX_TITLE_LENGTH"
                                :validate="false" :persist="true" :persistPattern="persistPattern" />
                            <small>Hátralévő karakterszám: {{ charsLeft.giftcardTitle }}</small>

                        </div>
                        <div class="separator"></div>
                        <div class="giftcard__msg__wrapper">
                            <h6 class="card__subtitle">Ajándékutalvány rövid üzenete</h6>
                            <CustomTextArea v-model="giftcardMsg" class="giftcard__msg" id="giftcard__msg"
                                name="giftcard__msg" label="" :maxLength="MAX_MSG_LENGTH" :persist="true"
                                :persistPattern="persistPattern" />
                            <small>Hátralévő karakterszám: {{ charsLeft.giftcardMsg }}</small>
                        </div>
                    </div>
                </section>
                <section class="block block--preview sticky">
                    <GiftcardPreview :theme="selectedTheme" :price="price" :title="giftcardTitle" :message="giftcardMsg" />
                </section>
            </div>


            <div class="row">
                <div class="col-xs-12">
                    <Button type="submit" text="tovább az adatok megadásához" color="secondary" @click="validate" />
                </div>
            </div>
        </Form>
</div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts";
@import "../../assets/styles/pages/giftcard/_giftcard_editor.scss";

.container {
    margin-top: 6rem;
    margin-bottom: 3rem;

    .card {
        .giftcard-price__input {
            margin-bottom: .3rem;

            &~small {
                color: $gray;
                font-size: .8rem;
            }
        }

        .giftcard__msg__wrapper {
            >.custom-input {
                font-weight: bold;

                :deep(>textarea) {
                    height: 130px;
                }
            }
        }
    }
}

.separator {
    border-top: 1px solid #a9a9b875;
    margin-bottom: 15px;
    margin-top: 10px;
}
</style>