import field from './_field';
import URL from '../URL'
import hoveredItem from './hoveredItem';

const FIELD_NAME = 'currentMode';

export default {
    get: field.getter(FIELD_NAME),
    set(val) {
        field.setter(FIELD_NAME)(val);
        hoveredItem.set({});
        URL.set("hash", FIELD_NAME, val);
        URL.pushState();
    },
};