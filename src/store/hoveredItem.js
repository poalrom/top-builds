import field from './_field';

const FIELD_NAME = 'hoveredItem';

export default {
    get: field.getter(FIELD_NAME, {}),
    set(value) {
        if (!value.id) value.id = 0;
        if (!value.permanent) value.permanent = false;

        field.setter(FIELD_NAME)(value);
    },
};