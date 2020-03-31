import { ICharacterEquip } from "../interfaces/ICharacterEquip";
import { statifySpells } from "./statify";
import { PartialEmpty } from "../errors/PartialEmpty";

const CENTRAL_AZERITE_POWER_ID = 263978;

export function getAzeritePowersFromEquipment(equipment: ICharacterEquip) {
    const azeriteItems = equipment.equipped_items
        .filter(item => item.hasOwnProperty("azerite_details") && item.azerite_details.hasOwnProperty("selected_powers"));
    let isPartialEmpty = false;

    const azeritePowers = azeriteItems
        .reduce((acc, item) => {
            item.azerite_details.selected_powers
                .forEach((spell) => {
                    if (!spell || !spell.spell_tooltip || !spell.spell_tooltip.spell) {
                        isPartialEmpty = true;
                        return;
                    }
                    if (spell.spell_tooltip.spell.id !== CENTRAL_AZERITE_POWER_ID) {
                        acc.push(spell.spell_tooltip);
                    }
                });

            return acc;
        }, []);

    if (isPartialEmpty) {
        throw new PartialEmpty("azerite powers");
    }

    return statifySpells(azeritePowers);
}