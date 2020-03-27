import field from './_field';

const FIELD_NAME = 'hoveredItem';

export default {
    get: field.getter(FIELD_NAME),
    set: field.setter(FIELD_NAME),
};