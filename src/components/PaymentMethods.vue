<script setup>
import { ref } from 'vue';
import cardIcon from '../assets/images/icons/credit-card.svg';

defineProps({
    card: { type: Boolean, required: true, default: true },
    transfer: { type: Boolean, required: true, default: true },
    paypal: { type: Boolean, required: true, default: false },
})

const checked = ref(true);

const isCardPayment = ref(true);
const cardMethod = ref(null);

const isTransferPayment = ref(false);
const transferMethod = ref(null);

const isPaypalPayment = ref(false);
const paypalMethod = ref(false);

const selectPaymentMethod = (event, method) => {
    if (method === "credit-card") {
        isCardPayment.value = true;
        cardMethod.value.checked = true;
        isPaypalPayment.value = false;
        isTransferPayment.value = false;
    } else if (method === "transfer") {
        isTransferPayment.value = true;
        transferMethod.value.checked = true;
        isCardPayment.value = false;
        isPaypalPayment.value = false;
    } else {
        isPaypalPayment.value = true;
        paypalMethod.value.checked = true;
        isCardPayment.value = false;
        isTransferPayment.value = false;
    }
}
</script>

<template>
    <div class="payment-methods__wrapper">
        <div v-if="card" class="row payment-methods credit-card" :class="{ 'selected': isCardPayment }"
            @click="selectPaymentMethod(e, 'credit-card')">
            <div class="payment-method col-md-1 col-xs-1 col-sm-1 col-lg-1">
                <div class="custom-radio__wrapper">
                    <label class="custom-radio">
                        <input ref="cardMethod" type="radio" checked="checked" name="radio">
                        <div class="circle" :class="{ 'checked': checked }" @click="checked = !checked">
                            <div class="circle-inner">
                            </div>
                        </div>
                    </label>
                </div>

            </div>
            <div class="payment-method col-md-11 col-xs-11 col-sm-11 col-lg-11">
                <div class="payment-method__title">
                    <img :src="cardIcon" alt="mastercard" style="{color: #a6a6bb}">
                    <div>Bankk??rty??s fizet??s</div>
                </div>
            </div>
            <div class="hidden-sm show-md col-md-1"></div>

            <div class="payment-method__body col-xs-12 col-md-10" :class="{ 'hidden': !isCardPayment }">
                A megrendel??s sor??n a PayU biztons??gos k??rtyaelfogad?? oldal??n, a k??rtyaadatok megad??s??val
                t??rt??nik a
                fizet??s. Ezt k??vet??en e-mailben automatikusan elk??ldj??k az utalv??ny felhaszn??l??s??hoz sz??ks??ges
                k??dot,
                illetve mag??t az utalv??nyt is, nyomtathat?? form??ban.
            </div>
        </div>

        <div v-if="transfer" class="row payment-methods transfer" :class="{ 'selected': isTransferPayment }"
            @click="selectPaymentMethod(e, 'transfer')">
            <div class="payment-method col-md-1 col-xs-1 col-sm-1 col-lg-1">
                <div class="custom-radio__wrapper">
                    <label class="custom-radio">
                        <input ref="transferMethod" type="radio" name="radio">
                        <div class="circle" :class="{ 'checked': checked }" @click="checked = !checked">
                        </div>
                    </label>
                </div>
            </div>
            <div class="payment-method col-md-11 col-xs-11 col-sm-11 col-lg-11">
                <div class="payment-method__title">
                    <img :src="cardIcon" alt="mastercard">
                    <div>Banki ??tutal??s</div>
                </div>
            </div>
            <div class="hidden-sm show-md col-md-1"></div>

            <div class="payment-method__body col-xs-12 col-md-10" :class="{ 'hidden': !isTransferPayment }">
                A megrendel??s ut??n, a megadott e-mail c??mre elk??ldj??k a banki ??tutal??shoz sz??ks??ges adatokat ??s
                a
                sz??mlasz??mot. Az utalv??ny fizet??si hat??rideje 2 munkanap. K??rj??k, a hat??rid??t tartsa be,
                ellenkez??
                esetben az utalv??nyt nem tudjuk ki??ll??tani!
            </div>
        </div>

        <div v-if="paypal" class="row payment-methods paypal" :class="{ 'selected': isPaypalPayment }"
            @click="selectPaymentMethod(e, 'paypal')">
            <div class="payment-method col-md-1 col-xs-2 col-sm-2 col-lg-1">
                <div class="custom-radio__wrapper">
                    <label class="custom-radio">
                        <input ref="paypalMethod" type="radio" name="radio">
                        <div class="circle" :class="{ 'checked': checked }">
                        </div>
                    </label>
                </div>
            </div>
            <div class="payment-method col-md-11 col-xs-10 col-sm-10 col-lg-11">
                <div class="payment-method__title">
                    <img :src="cardIcon" alt="mastercard">
                    <div>Paypal</div>
                </div>
            </div>
            <div class="hidden-sm show-md col-md-1"></div>
            <div class="payment-method__body col-xs-12 col-md-10" :class="{ 'hidden': !isPaypalPayment }">
                Ha rendelkezik PayPal online sz??ml??val, akkor a megrendel??s??t bankk??rtya adatok megad??sa n??lk??l is
                kifizetheti. A sikeres fizet??st k??vet??en egy automatikus e-mail form??j??ban azonnal elk??ldj??k ??nnek az
                utalv??ny felhaszn??l??s??hoz sz??ks??ges k??dot, ??s az utalv??nyt nyomtathat?? form??ban..
            </div>
        </div>
    </div>
</template>

<style scoped>
@import "../assets/styles/components/_payment_methods.scss";
</style>