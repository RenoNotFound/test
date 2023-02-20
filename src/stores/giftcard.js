import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import useNumberFormat from '@/use/useNumberFormat';


export const useGiftcardStore = defineStore('giftcard', () => {
  const MAX_TITLE_LENGTH = ref(30);
  const MAX_MSG_LENGTH = ref(200);
  const giftcardTitle = ref('Sok szeretettel!');
  const giftcardMsg = ref('Az utazás életre szóló élmény. Remélem, ez az utalvány hozzájárul egy kellemes pihenéshez, felfedezéshez!');
  const customPrice = ref(null);
  const selectedPrice = ref('10000');
  const selectedTheme = ref('default');

  const persistPattern = ref('giftcard');
  const persistedKeys = ref(['giftcard__title', 'giftcard__msg', 'price', 'theme']);

  const isLoading = ref(true)
  const countries = ref([])
  const countriesWithDialingCode = ref([])
  const townByPostCode = ref('')
  const themes = ['default', 'tengerpart', 'egzotikus', 'romantikus', 'metropolisz', 'karacsony', 'gratulacio'];
  const prices = ['10000', '20000', '30000', '50000', '100000', 'custom'];

  const price = computed(() => {
    if (selectedPrice.value === 'custom') {
      return useNumberFormat(customPrice.value);
    } else {
      return useNumberFormat(selectedPrice.value);
    }
  })

  const getCountries = async () => {
    try {
      isLoading.value = true;
      const url = `http://utalvany.loc:8080/get-countries.php`;
      const response = await axios.get(url);
      countries.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const getCountriesWithDialingCode = async () => {
    try {
      isLoading.value = true;
      const url = `http://utalvany.loc:8080/get-countries-by-dialing-code.php`;
      const response = await axios.get(url);
      countriesWithDialingCode.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const getTownByPostCode = async (postCode) => {
    try {
      isLoading.value = true;
      const url = `http://utalvany.loc:8080/get-town-by-postcode.php?irszam=${postCode}`;
      const response = await axios.get(url);
      townByPostCode.value = response.data.length > 100 ? '' : response.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const getToken = async () => {
    try {
      isLoading.value = true;
      const url = 'https://irix.wecotravel.ro/reseller/oauth2/token';
      const response = await axios.post(url, { client_id: import.meta.env.VITE_CLIENT_ID, client_secret: import.meta.env.VITE_WS_CLIENT_SECRET, grant_type: 'client_credentials' }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
      // const url = getAuthorizationUrl();
      // const response = await axios.post(url, {}, {
      //   headers: {
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // });
      console.log(response)
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const getAuthorizationUrl = () => {
    const rootUrl = `https://irix.wecotravel.ro/reseller/oauth2/token`;

    const options = {
      client_id: import.meta.env.VITE_WS_CLIENT_ID, 
      client_secret: import.meta.env.VITE_WS_CLIENT_SECRET, 
      grant_type: 'client_credentials'
    }

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  }

  const resetTownByPostCode = () => townByPostCode.value = '';

  return {
    giftcardTitle, giftcardMsg, selectedPrice, customPrice, selectedTheme, price, prices, themes, countries, countriesWithDialingCode, townByPostCode, isLoading, MAX_TITLE_LENGTH, MAX_MSG_LENGTH, persistPattern, persistedKeys, getCountries, getCountriesWithDialingCode, getTownByPostCode, resetTownByPostCode, getToken
  }
})
