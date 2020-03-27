import { ICharacterEquip } from "../interfaces/ICharacterEquip";

export function getEssencesFromEquipment(equipment: ICharacterEquip) {
    const heartOfAzeroth = equipment.equipped_items
        .find(item => item.hasOwnProperty("azerite_details") && item.azerite_details.hasOwnProperty("selected_essences"));

    return !heartOfAzeroth ? [] : heartOfAzeroth.azerite_details.selected_essences
        .map((essence) => {
            const spellTooltip = essence.slot === 0 ?
                essence.main_spell_tooltip :
                essence.passive_spell_tooltip;

            return spellTooltip && spellTooltip.spell && spellTooltip.spell.id ? spellTooltip.spell.id : undefined;
        }).filter(Boolean);
}