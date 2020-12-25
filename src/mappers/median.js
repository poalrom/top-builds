export default function (array) {
    array = array.sort();
    if (array.length % 2 === 0) { // array with even number elements
        return Math.ceil((array[array.length / 2] + array[(array.length / 2) - 1]) / 2);
    }
    else {
        return array[(array.length - 1) / 2]; // array with odd number elements
    }
};