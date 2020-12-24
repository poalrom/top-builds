import Vue from 'vue';

export default {
    getter(name, defaultValue) {
        return function () {
            return Vue.store.get(name) || defaultValue;
        }
    },
    setter(name) {
        return function (value) {
            Vue.store.set(name, value);
        }
    },
};
