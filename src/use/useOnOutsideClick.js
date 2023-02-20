import { onBeforeUnmount, onMounted } from 'vue'

export default function useOnOutsideClick(component, callback, classNamesToSkip) {
    if (!component) return
    const listener = (event) => {
        if ((event.target !== component.value && event.composedPath().includes(component.value)) || event.target.classList.contains("nav-user__icon__button") || event.target.classList.contains("nav-user__icon") || event.target.classList.contains("nav-user__icon__wrapper") || event.target.classList.contains("nav-user__icon__button") || event.target.classList.contains("nav-user__profile") || event.target.classList.contains("nav-user__profile-name") || event.target.classList.contains("nav-user__profile-bonus") || event.target.classList.contains("icon-chevron-down") || event.target.classList.contains("nav-submenu__button") || event.target.classList.contains("nav-submenu__item") || event.target.classList.contains("nav-submenu__item__btn") || event.target.classList.contains("btn-sm__slot") || event.target.classList.contains("btn-sm__text")) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeUnmount(() => { window.removeEventListener('click', listener) })

    return { listener }
}