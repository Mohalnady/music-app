import Vue from 'vue';
import App from './App.vue';
import store from './store';
import './scss/main.scss';
import 'normalize.css';

//font - Source sans pro
import '@fontsource/koho/200.css';
import '@fontsource/koho/300.css';
import '@fontsource/koho/400.css';
import '@fontsource/koho/600.css';
import '@fontsource/koho/700.css';
import './assets/global.css';

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import {
    faBackward,
    faForward,
    faHeart,
    faPlay,
    faPause,
    faMagnifyingGlass,
    faArrowLeft,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faHeart,
    faForward,
    faBackward,
    faPlay,
    faPause,
    faMagnifyingGlass,
    faArrowLeft,
    faTrash
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
new Vue({
    store,
    render: (h) => h(App),
}).$mount('#app');
