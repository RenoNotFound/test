export default function useNumberFormat(number) {
    if (typeof number === null) {
        console.log('null')
        return 0
    } else if (number === 'string') {
        console.log(parseInt(number.split(' ').join('')));
        return new Intl.NumberFormat().format(parseInt(number.split(' ').join(''))); 
    }

    return new Intl.NumberFormat().format(number)
}