import { ICountedSpell } from "../interfaces/ICountedSpell";

export function sortByFreqOrId([freq1, { id: id1 }]: [string, ICountedSpell], [freq2, { id: id2 }]: [string, ICountedSpell]) {
    return Number(freq2) - Number(freq1) || Number(id2) - Number(id1);
}

export function sortByValue({ value: value1 }: { value: number }, { value: value2 }: { value: number }) {
    return value2 - value1;
}