import { ICharacterEquip } from "../interfaces/ICharacterEquip";
import { statifySpells } from "./statify";

export function getCorruptsFromEquipment(equipment: ICharacterEquip) {
    const corruptedItems = equipment.equipped_items
        .filter(item => item.is_corrupted && item.spells && item.spells.length);

    const corrupts = corruptedItems
        .reduce((acc, item) => {
            acc.push(...item.spells.filter(spell => spell.display_color));
            return acc;
        }, []);

    return statifySpells(corrupts);
}