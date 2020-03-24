import { ICharacterEquip } from "../interfaces/ICharacterEquip";

export function getEssencesFromEquipment(equipment: ICharacterEquip) {
    const heartOfAzeroth = equipment.equipped_items
        .find(item => item.hasOwnProperty("azerite_details") && item.azerite_details.hasOwnProperty("selected_essences"));

    return !heartOfAzeroth ? [] : heartOfAzeroth.azerite_details.selected_essences
        .map((essence) => essence.slot === 0 ?
            essence.main_spell_tooltip.spell.id :
            essence.passive_spell_tooltip.spell.id
        );
}