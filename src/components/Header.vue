<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { Form } from 'vee-validate';
import useOnOutsideClick from "@/use/useOnOutsideClick"
import CustomTextInput from "@/components/CustomTextInput.vue";
import Button from "@/components/Button.vue";

import phoneIcon from '@/assets/images/icons/phone.svg';
import phoneIconWhite from '@/assets/images/icons/phone-white.svg';
import userIcon from '@/assets/images/icons/user.svg';
import userIconBlue from '@/assets/images/icons/user-blue.svg';
import userGroupIcon from '@/assets/images/icons/user-group.svg';
import logoutIcon from '@/assets/images/icons/logout.svg';
import chevronDownIcon from '@/assets/images/icons/chevron-down-grey.svg';

const isDropdownOpen = ref(false);
const isTimesheetOpen = ref(false);
const isFavsOpen = ref(false);
const isUserOpen = ref(false);
const isUserHovered = ref(false);
const isLoggedIn = ref(false);

const userDropdown = ref(null);
const submenuDropdown = ref(null);

const schema = {
    "navuser__email": 'required|email',
    "navuser__password": 'required',
};

const onSubmit = (values) => {
    const data = { ...values }
    console.log(JSON.stringify(data, null, 2));
    console.log("object");
}

useOnOutsideClick(userDropdown, () => {
    isUserOpen.value = false;
})

useOnOutsideClick(submenuDropdown, () => {
    isDropdownOpen.value = false;
})

const handleDropdownDisplay = (dropdownType) => {
    if (dropdownType === "user") {
        isUserOpen.value = true;
        isDropdownOpen.value = false;
    } else {
        isDropdownOpen.value = true;
        isUserOpen.value = false;
    }
}

</script>

<template>
    <nav class="nav" role="navigation">
        <header class="nav__wrapper">
            <RouterLink to="/" class="nav-brand">
                <img src="https://www.repjegy.hu/assets/images/repjegy-logo.svg" alt="logo">
            </RouterLink>
            <div class="nav-menu">
                <ul class="nav-menu__items">
                    <li class="nav-menu__item">
                        <RouterLink to="#" class="nav-menu__link">
                            <span>Tervező</span>
                        </RouterLink>
                    </li>
                    <li class="nav-menu__item">
                        <RouterLink to="#" class="nav-menu__link">
                            <span>Súgó</span>
                        </RouterLink>
                    </li>
                    <li class="nav-menu__item">
                        <a href="https://www.booking.com/index.html?aid=2242406" class="nav-menu__link" target="_blank">
                            <span>Hotel</span>
                        </a>
                    </li>
                    <li class="nav-menu__item nav-menu__item__favs" :class="{ 'open': isFavsOpen }"
                        @mouseover="isFavsOpen = true" @mouseout="isFavsOpen = false">
                        <RouterLink to="#" class="nav-menu__link">
                            <span>Kedvencek</span>
                        </RouterLink>

                        <div class="nav-menu__dropdown__favs">
                            <div class="nav-wishlist">
                                <p class="nav-wishlist--empty"><span>Nincsenek elmentett keresések</span><br>
                                    Mentse el kedvenc útvonalait a keresés után! Később egyetlen kattintással új
                                    keresést indíthat.</p>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="nav-phone" :class="{ 'open': isTimesheetOpen, 'nav-phone--hidden': !isTimesheetOpen }"
                @mouseover="isTimesheetOpen = true" @mouseout="isTimesheetOpen = false"
                @click="isTimesheetOpen = !isTimesheetOpen">
                <div class="nav-phone__wrapper">
                    <img :src="phoneIconWhite" alt="phone-icon" height="22">
                    <div class="nav-phone__number">061 510 0550</div>
                    <div class="nav-phone__timesheet timesheet">
                        <div class="timesheet-row">
                            <span class="timesheet-day">Hétfő - Péntek</span>
                            <span class="timesheet-time">9:00 - 17:00</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nav-user" :class="{ 'open': isUserOpen, 'nav-user--logged-in': isLoggedIn }">
                <div class="nav-user__icon__button" @mouseover="isUserHovered = true" @mouseout="isUserHovered = false"
                    @click="handleDropdownDisplay('user')">
                    <div class="nav-user__icon__wrapper">
                        <img v-if="!isUserHovered && !isUserOpen" :src="userIcon" alt="user-icon" height="15"
                            class="nav-user__icon">
                        <img v-else :src="userIconBlue" alt="user-icon" height="15" class="nav-user__icon">
                    </div>

                    <div class="nav-user__profile nav-user__profile--logged-in">
                        <div class="nav-user__profile-info">
                            <p class="nav-user__profile-name">Gamper Renó</p>
                            <p class="nav-user__profile-bonus"><span>0</span> hűségpont</p>
                        </div>
                        <img :src="chevronDownIcon" alt="arrow-down" class="icon-chevron-down">

                    </div>
                </div>
                <div ref="userDropdown" class="nav-user__dropdown"
                    :class="{ 'open': isUserOpen, 'nav-user__dropdown--logged-in': isLoggedIn }">
                    <div class="nav-user__dropdown__wrapper">
                        <div class="nav-user__registration" :class="{ 'nav-user__registration--hidden': isLoggedIn }">
                            <p class="nav-user__title">Miért érdemes regisztrálni?</p>

                            <div class="nav-user__features">
                                <div class="nav-user__features-item">
                                    <div class="nav-user__features-icon-wrapper">
                                    </div>
                                    <p>Elmentheti a foglaláshoz szükséges adatokat, így sokkal gyorsabban tudja
                                        lefoglalni repülőjegyét.</p>
                                </div>
                                <div class="nav-user__features-item">
                                    <div class="nav-user__features-icon-wrapper">
                                    </div>
                                    <p>Egy helyen megtalálhatja minden korábbi repülőjegy foglalását.</p>
                                </div>
                                <!-- <div class="nav-user__features-item hidden">
                                            <div class="nav-user__features-icon-wrapper">
                                            </div>
                                            <p>A foglalások után kedvezményekre beváltható hűségpontokat írunk jóvá</p>
                                        </div> -->
                                <div class="nav-user__features-item">
                                    <div class="nav-user__features-icon-wrapper">
                                    </div>
                                    <p>Egyszerűbben feliratkozhat árfigyelő szolgáltatásunkra és kezelheti mentett
                                        kereséseit.</p>
                                </div>
                            </div>

                            <Button text="Regisztrálok" class="nav-user__registration__button" color="outline-secondary"
                                size="sm" />
                        </div>
                        <Form class="nav-user__sign-in" :class="{ 'hidden': isLoggedIn }" @submit="onSubmit"
                            :validation-schema="schema" v-slot="{ errors, validate, values }">
                            <p class="nav-user__title nav-user__title--sign-in">Belépés e-mail címmel:</p>
                            <CustomTextInput id="navuser__email" name="navuser__email" class="nav-user__input"
                                label="E-mail cím" :isFloating="true" />
                            <CustomTextInput id="navuser__password" name="navuser__password" class="nav-user__input"
                                label="Jelszó" :isFloating="true" />
                            <Button text="Belépés" class="nav-user__button" color="secondary" size="sm"
                                @click="isLoggedIn = true" />
                            <!-- <Button text="Belépés" class="nav-user__button" color="secondary" size="sm" @click="validate" /> -->

                            <div class="nav-user__anchors">
                                <RouterLink to="#" class="nav-user__lost-pass">Elfelejtettem a jelszavam</RouterLink>
                                <span class="nav-user__sign-up-link">
                                    <span>Még nincs fiókod? </span>
                                    <RouterLink to="#">Fiók létrehozása</RouterLink>
                                </span>
                            </div>
                        </Form>

                        <div class="nav-user__logged-in" :class="{ 'hidden': !isLoggedIn }">
                            <div class="nav-user__profile nav-user__profile--logged-in">
                                <div class="nav-user__profile-info">
                                    <p class="nav-user__profile-name">Gamper Renó</p>
                                    <p class="nav-user__profile-bonus"><span>0</span> hűségpont</p>
                                </div>
                            </div>
                            <ul class="nav-user__items">
                                <li>
                                    <RouterLink to=# class="nav-user__item-link">Adataim</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to=# class="nav-user__item-link">Hűségpontjaim</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to=# class="nav-user__item-link">Jelszó változtatás</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to=# class="nav-user__item-link">Foglalásaim</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="#" class="nav-user__item-link">Rögzített
                                        kapcsolattartóim</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="#" class="nav-user__item-link">Rögzített utasaim</RouterLink>
                                </li>
                                <li>
                                    <RouterLink to="#" class="nav-user__item-link">Aktív árfigyelők</RouterLink>
                                </li>
                            </ul>
                            <RouterLink to="#" @click="isLoggedIn = false" class="nav-user__logout">
                                <img :src="logoutIcon" alt="exit icon" class="icon icon-exit">
                                <span>Kijelentkezés</span>
                            </RouterLink>
                        </div>
                    </div>

                </div>
            </div>
            <div class="nav-submenu">
                <div ref="submenuDropdown" class="nav-submenu__button" :class="{ 'open': isDropdownOpen }"
                    @click="handleDropdownDisplay('dropdown')">
                    <div class="nav-submenu__icon"></div>
                </div>
                <span class="sr-only">menü</span>
                <div class="nav-submenu__dropdown dropdown-menu">
                    <div class="nav-submenu__wrapper">
                        <div class="nav-submenu__phone">
                            <div class="nav-submenu__phonenumber">
                                <img :src="phoneIcon" alt="phone-icon" height="17">
                                <span>061 510 0550</span>
                            </div>
                            <div class="nav-submenu__timesheet timesheet">
                                <div class="timesheet-row">
                                    <span class="timesheet-day">Hétfő - Péntek</span>
                                    <span class="timesheet-time">9:00 - 17:00</span>
                                </div>
                            </div>
                        </div>
                        <ul class="nav-submenu__items">
                            <RouterLink to="/#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    COVID-teszt
                                </li>
                            </RouterLink>
                            <RouterLink to="/#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Úti célok
                                </li>
                            </RouterLink>
                            <RouterLink to="/#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Légitársaságok
                                </li>
                            </RouterLink>
                            <RouterLink to="/#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Utalvány
                                </li>
                            </RouterLink>
                            <RouterLink to="/#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Árfigyelő
                                </li>
                            </RouterLink>
                            <RouterLink to="#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Reptéri parkolás
                                </li>
                            </RouterLink>
                            <RouterLink to="#" class="nav-submenu__link">
                                <li class="nav-submenu__item">
                                    Blog
                                </li>
                            </RouterLink>

                            <li class="nav-submenu__item">
                                <RouterLink to="#">
                                    <Button type="button" text="Ügyfélszolgálat" color="secondary" size="sm">
                                        <template v-slot:icon>
                                            <img :src="userGroupIcon" alt="user-group" height="21" width="21">
                                        </template>
                                    </Button>
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="nav-submenu__md-dropdown md-dropdown-menu">
                    <ul class="nav-submenu__items">
                        <RouterLink to="/#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                COVID-teszt
                            </li>
                        </RouterLink>
                        <RouterLink to="/#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Úti célok
                            </li>
                        </RouterLink>
                        <RouterLink to="/#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Légitársaságok
                            </li>
                        </RouterLink>
                        <RouterLink to="/#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Utalvány
                            </li>
                        </RouterLink>
                        <RouterLink to="/#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Árfigyelő
                            </li>
                        </RouterLink>
                        <RouterLink to="#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Reptéri parkolás
                            </li>
                        </RouterLink>
                        <RouterLink to="#" class="nav-submenu__link">
                            <li class="nav-submenu__item">
                                Blog
                            </li>
                        </RouterLink>

                        <li class="nav-submenu__item">
                            <RouterLink to="#">
                                <Button class="nav-submenu__item__btn" type="button" text="Ügyfélszolgálat"
                                    color="secondary" size="sm">
                                    <template v-slot:icon>
                                        <img :src="userGroupIcon" class="btn-sm__slot" alt="user-group" height="27"
                                            width="27">
                                    </template>
                                </Button>
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
</nav>
</template>

<style scoped>@import "../assets/styles/layout/_header.scss";</style>