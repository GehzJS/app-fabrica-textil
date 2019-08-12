import Vue from "vue";
import './plugins/axios';
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import vuetify from './plugins/vuetify';
import '@babel/polyfill';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import es from 'vee-validate/dist/locale/es';
import VeeValidate, { Validator } from 'vee-validate';
import VueMask from 'v-mask';
import VueHtmlToPaper from 'vue-html-to-paper';

const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
        // 'https://unpkg.com/kidlat-css/css/kidlat.css',
        // 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
        // 'https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css',
        // 'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'
    ]
};

Vue.use(VueHtmlToPaper, options);

Vue.use(VueMask);

Vue.use(VeeValidate, {
    events: 'change'
});
Validator.localize("es", es);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");