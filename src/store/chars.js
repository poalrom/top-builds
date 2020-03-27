import Vue from 'vue';

const FIELD_NAME = 'chars';

export default {
    get() {
        return Vue.store.isSuccess(FIELD_NAME) ?
            Vue.store.get(FIELD_NAME) :
            [];
    },
};