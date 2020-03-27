import Vue from 'vue';
import VueStore from '@websanova/vue-store';
import Modes from '../Modes';
import URL from '../URL';

Vue.use(VueStore, {
    parseSuccessResponse: (res) => res.data,
});

export function initStore() {
    Vue.use(VueStore, {
        parseSuccessResponse: (res) => res.data,
    });

    Object.assign(Vue.store, {
        fillStoreFromURL() {
            Vue.store.set('currentMode', URL.get('hash', 'currentMode', Modes.stats, Object.values(Modes)));
            Vue.store.set('className', URL.get('params', 'class'));
            Vue.store.set('specName', URL.get('params', 'spec'));
        },
        storeToURL() {
            URL.set('hash', 'currentMode', Vue.store.get('currentMode'));
            URL.set('params', 'class', Vue.store.get('className'));
            URL.set('params', 'spec', Vue.store.get('specName'));
            URL.pushState();
        }
    });
}