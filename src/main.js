import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from './store';
import {vfmPlugin} from 'vue-final-modal';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueTheMask from 'vue-the-mask'
import money from 'v-money';
import VueSocketIO from 'vue-3-socket.io'
import SocketIO from 'socket.io-client';
import ApiWrapper from '../src/api';
import VueObserveVisibility from 'vue-observe-visibility'

import './css/app.css';


createApp(App)
    .use(router)
    .use(store)
    .use(Toast)
    .use(VueTheMask)
    .use(money)
    .use(vfmPlugin({
        key: '$vfm',
        componentName: 'VueFinalModal',
        dynamicContainerName: 'ModalsContainer'
    }))
    .use(new VueSocketIO({
        debug: true,
        connection: SocketIO(ApiWrapper.services.websocket, {extraHeaders: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }}), //options object is Optional
        vuex: {
            store,
            actionPrefix: "SOCKET_",
            mutationPrefix: "SOCKET_"
        },
    }))
    .use(VueObserveVisibility)
    .mount("#app");

