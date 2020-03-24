import { ICharacterEquip } from "../interfaces/ICharacterEquip";
import { statifySpells } from "./statify";

const CENTRAL_AZERITE_POWER_ID = 263978;

export function getAzeritePowersFromEquipment(equipment: ICharacterEquip) {
    const azeriteItems = equipment.equipped_items
        .filter(item => item.hasOwnProperty("azerite_details") && item.azerite_details.hasOwnProperty("selected_powers"));

    const azeritePowers = azeriteItems
        .reduce((acc, item) => {
            item.azerite_details.selected_powers
                .forEach((spell) => {
                    if (spell.spell_tooltip.spell.id !== CENTRAL_AZERITE_POWER_ID) {
                        acc.push(spell.spell_tooltip);
                    }
                });

            return acc;
        }, []);

    return statifySpells(azeritePowers);
}