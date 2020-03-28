import startCase from 'lodash/fp/startCase';

export default function(slotName) {
    if (!slotName) {
        return '';
    }
    return startCase(slotName.replace(/(\d)/g, "").toLowerCase());
}