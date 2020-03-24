import { sortByFreqOrId } from "./sorters";
import { ISpellTooltip } from "../interfaces/ISpellTooltip";
import { ICountedSpell } from "../interfaces/ICountedSpell";

export function statifySpells(spells: ISpellTooltip[]) {
    return Object.entries(count(spells))
        .sort(sortByFreqOrId)
        .map(([, spell]) => (spell));
}

function count(spells: ISpellTooltip[]) {
    return spells.reduce((acc, spell) => {
        if (!acc[spell.spell.id]) {
            acc[spell.spell.id] = {
                id: spell.spell.id,
                freq: 0,
                name: spell.spell.name,
            };
        }
        acc[spell.spell.id].freq++;

        return acc;
    }, {} as Record<number, ICountedSpell>);
}