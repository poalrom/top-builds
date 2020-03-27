import Vue from 'vue';

export default {
    getter(name) {
        return function () {
            return Vue.store.get(name);
        }
    },
    setter(name) {
        return function (value) {
            Vue.store.set(name, value);
        }
    },
};
