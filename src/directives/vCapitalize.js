export const vCapitalize = {
    mounted: (el) => {
        const value = el.innerText;
        const capitalizedFirst = value[0].toUpperCase();
        const rest = value.slice(1);
        el.innerText = capitalizedFirst + rest;
    }
}
