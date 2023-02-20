<script setup>
import { computed } from 'vue';

const props = defineProps({
    theme: { type: String, required: true },
    price: { type: [Number, String, null], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
})

const imgUrl = computed(() => `https://www.repjegy.hu/images/redesign2019/utalvanyv2/images/alap/utalvany_${props.theme}.jpg`)

const previewPrice = computed(() => {
    return props.price + " Ft";
})
</script>

<template>
    <div class="giftcard-preview" :style="{ backgroundImage: 'url(' + imgUrl + ')' }">
        <div class="giftcard-preview__top">
            <div class="giftcard-price__wrapper">
                <span class="giftcard-price">{{ previewPrice }}</span>
                <span class="giftcard-price__text">értékű repülőjegy
                    utalvány</span>
            </div>
        </div>
        <div class="giftcard-preview__middle">
            <div class="giftcard-preview__title">{{ title }}</div>
            <div class="giftcard-preview__msg">{{ message }}</div>
        </div>
        <div class="giftcard-preview__bottom">
            <div class="giftcard-preview__identifier">
                azonosító: XXXXXX-XXXXXX
            </div>
            <div class="giftcard-expiration__wrapper">
                felhasználási határidő: <span class="expiration">2024.2.3</span>
            </div>
            <div class="giftcard-preview__info">
                Az utalvány készpénzre nem váltható. Kizárólag a repjegy.hu oldalon váltható be
                repülőjegy
                vásárlásra. Az utalvány tulajdonosa az utalvány azonosító számával a
                www.repjegy.hu/utalvany/156145151651115165165 oldalon ellenőrizheti az utalvány
                státuszát,
                értékét,
                lejárati idejét. Az utalvány kiállítója: a repjegy.hu-t üzemeltető Weco-Travel Kft.<br>
                www.repjegy.hu | info@repjegy.hu | 06 1 510 0550 (h-p 9:00-17:00)
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/abstracts";
@import "../../assets/styles/pages/giftcard/_giftcard_editor.scss";


.giftcard-preview {
    @include flex-container(space-between, flex-start, $direction: column);
    @include size(100%, 600px);
    border-radius: $border-radius;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
    margin: 0 auto;

    & .giftcard-preview__top {
        height: 37%;
        display: flex;
        align-items: flex-end;
        margin-top: auto;
        margin-left: 1rem;
        padding: 0 1.5rem;

        .giftcard-price__wrapper {
            display: flex;
            flex-direction: column;
            gap: .5rem;

            .giftcard-price {
                font-size: 1.5rem;
                font-weight: bold;

                @include media-breakpoint-up(md) {
                    font-size: 1.8rem;
                }
            }

            .giftcard-price__text {
                font-size: 1rem;
                font-weight: bold;

                @include media-breakpoint-up(md) {
                    font-size: 1.1rem;
                }
            }
        }
    }

    .giftcard-preview__middle {
        height: 35%;
        width: 90%;
        margin: 1.9rem 1rem;
        // margin-top: 1.9rem;
        // margin-left: 1rem;
        padding: 0 1.5rem;

        >.giftcard-preview__title {
            font-size: 1.35rem;
            line-height: 1.5rem;
            font-weight: bold;
            margin-bottom: 1rem;
            word-wrap: break-word;

            @include media-breakpoint-up(md) {
                font-size: 1.5rem;
            }
        }

        >.giftcard-preview__msg {
            font-size: 0.75rem;
            word-wrap: break-word;

            @include media-breakpoint-up(md) {
                font-size: 0.9rem;
            }
        }
    }

    .giftcard-preview__bottom {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: flex-end;
        height: 25%;
        padding: 0.5rem;

        >.giftcard-preview__identifier,
        >.giftcard-expiration__wrapper {
            font-size: .75rem;
            line-height: 1rem;
            font-weight: bold;

            @include media-breakpoint-up(md) {
                font-size: 0.9rem;
            }

        }

        >.giftcard-preview__info {
            font-size: 0.45rem;
            line-height: normal;

            @include media-breakpoint-up(lg) {
                font-size: 0.578rem;
            }

        }
    }
}
</style>