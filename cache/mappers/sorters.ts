export function sortByValue({ value: value1 }: { value: number }, { value: value2 }: { value: number }) {
    return value2 - value1;
}