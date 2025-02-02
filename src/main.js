import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueSpinners from 'vue-spinners';
import DatetimePicker from 'vuetify-datetime-picker';
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(DatetimePicker)
Vue.use(VueSpinners)
Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(PiniaVuePlugin)
const pinia = createPinia()

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
