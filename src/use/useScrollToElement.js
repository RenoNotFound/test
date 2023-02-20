import { useFocus } from '@vueuse/core';

export default function useScrollToElement(id, scrollBehavior = 'smooth', block = 'center', focus = true) {
    const el = document.getElementById(id);
    const { focused } = useFocus(el, { initialValue: false })
    const options = {
        behavior: scrollBehavior, block: block
    }
    
    if (el) {
        el.scrollIntoView(options);
        focused.value = focus;
    };
}