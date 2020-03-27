import field from './_field';

const FIELD_NAME = 'className';

export default {
    get: field.getter(FIELD_NAME),
    set: field.setter(FIELD_NAME),
};