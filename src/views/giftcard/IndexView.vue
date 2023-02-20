<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useFooterStore } from '@/stores/footer';
import { $vfm } from 'vue-final-modal';

import Button from "@/components/Button.vue";
import Accordion from "@/components/Accordion.vue";
import Modal from '@/components/Modal.vue';
import CustomTextInput from "@/components/CustomTextInput.vue";

import { encryptedStorage } from '@/utils/storage';

import faq from "@/assets/data/faq.json";

const { setFooterMini } = useFooterStore();
setFooterMini(false);

const router = useRouter();

const giftcardNr = ref('');

const openModal = () => {
    $vfm.show('giftcard-check');
}

const handleKeyup = (event) => {
    let val = event.target.value.split('-').join('');
    giftcardNr.value = val.match(/.{1,6}/g).join('-');
}

onMounted(() => {
    encryptedStorage.removeItemFromPattern('giftcard');
})
</script>

<template>
    <div class="giftcard">
        <Modal class="giftcard__modal" name="giftcard-check">
            <template v-slot:content>
                <div class="modal__body">
                    <div class="modal__icon"></div>
                    <div class="modal__title">Utalvány ellenőrzése</div>
                    <div class="modal__text">Itt ellenőrizheti az utalványának aktuális állapotát! Kérjük adja meg az
                        utalványának számát!</div>
                    <div class="modal__giftcard-check">
                        <CustomTextInput v-model="giftcardNr" class="giftcard-check__input" id="giftcard-check"
                            name="giftcard-check" label="" placeholder="Adja meg az utalvány azonosítóját" size="sm" maxLength="13"
                            @keyup="handleKeyup" />
                        <Button class="giftcard-check__btn" text="Ellenőrzés" color="secondary" size="sm" />
                    </div>
                </div>
            </template>
        </Modal>

        <div class="header">
            <div class="container">
                <div class="headline__wrapper">
                    <h1 class="headline__title">Repülőjegy utalvány</h1>
                    <p class="headline__subtitle">Tökéletes ajándék a felejthetetlen élményekért!</p>
                </div>

                <div class="giftcard__header-btn hidden-sm">
                    <Button @click="router.push('/utalvany/szerkeszto')" class="btn-giftcard" color="secondary"
                        text="Utalvány vásárlása" />
                </div>
            </div>
        </div>

        <div class="container">
            <section class="block block--benefits">
                <h4 class="block__title">Miért válassza a repjegy utalványt?</h4>

                <div class="block__items row">
                    <div class="block__item col-xs-12 col-sm-6 col-md-3">
                        <div class="block__icon__wrapper">
                        </div>
                        <h6 class="block__name">Egyszerűen testreszabható</h6>
                        <p class="block__description">Ön választhatja ki, hogy mekkora összeget szeretne ajándékozni.
                        </p>
                    </div>

                    <div class="block__item col-xs-12 col-sm-6 col-md-3">
                        <div class="block__icon__wrapper">
                        </div>
                        <h6 class="block__name">Azonnal küldhető</h6>
                        <p class="block__description">Írjon egy rövid üzenetet és azonnal küldheti is az ajándékkártyát
                            emailben.
                        </p>
                    </div>

                    <div class="block__item col-xs-12 col-sm-6 col-md-3">
                        <div class="block__icon__wrapper">
                        </div>
                        <h6 class="block__name">Hosszú érvényesség</h6>
                        <p class="block__description">Utalvány a vásárlástól számítva 1 évig érvényes.</p>
                    </div>

                    <div class="block__item col-xs-12 col-sm-6 col-md-3">
                        <div class="block__icon__wrapper">
                        </div>
                        <h6 class="block__name">Egyszerűen felhasználható</h6>
                        <p class="block__description">Az utalvány bármilyen repülőjegy foglalásakor felhasználható.</p>
                    </div>
                </div>

                <div class="giftcard__landing-btn row show-sm">
                    <div class="col-sm-12 col-lg-6">
                        <Button @click="router.push('/utalvany/szerkeszto')" text="Utalvány vásárlása" color="secondary" />
                    </div>
                </div>

            </section>

            <section class="block block--banners">
                <div class="row">
                    <div class="banner banner__giftcard col-xs-12 col-md-6 col-lg-7 col-xl-8">
                        <div class="banner__wrapper">
                            <h2 class="banner__title">Ajándékvásárlás <span class="text--bold">sorbanállás
                                    nélkül,</span> néhány
                                kattintással, online.</h2>
                            <h5 class="banner__subtitle text--bold">Ne hagyja ki!</h5>
                            <p class="banner__description">Válasszon megjelenést, adja meg az összeget és írjon egy
                                rövid
                                személyesebbé teheti a meglepetést.</p>
                            <!-- <RouterLink to="/utalvany/szerkeszto"> -->
                            <Button @click="router.push('/utalvany/szerkeszto')" class="banner__btn"
                                text="Utalvány vásárlása" color="secondary" size="sm" />
                            <!-- </RouterLink> -->
                        </div>
                    </div>

                    <div class="banner banner__giftcard-check col-xs-12 col-md-6 col-lg-5 col-xl-4">
                        <div class="banner__wrapper">
                            <h2 class="banner__title">Már rendelkezik <span class="text--bold">ajándékutalvánnyal?</span>
                            </h2>
                            <p class="banner__description"><span class="text--bold">Itt ellenőrizheti</span> az
                                utalványának
                                akutális állapotát!</p>
                            <Button class="banner__btn" text="Utalvány ellenőrzése" color="outline-secondary" size="sm"
                                @click="openModal" />
                        </div>
                    </div>
                </div>
            </section>

            <section class="block block--faq">
                <h4 class="block__title">Gyakran ismételt kérdések a repjegy.hu utalvánnyal kapcsolatban</h4>
                <Accordion :items="faq" />
            </section>
        </div>
</div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/pages/giftcard/_giftcard_index.scss";
@import "../../assets/styles/components/modals/_giftcard_modal.scss";</style>