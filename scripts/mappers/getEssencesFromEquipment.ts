import { ICharacterEquip } from "../interfaces/ICharacterEquip";
import { PartialEmpty } from "../errors/PartialEmpty";

export function getEssencesFromEquipment(equipment: ICharacterEquip) {
    const heartOfAzeroth = equipment.equipped_items
        .find(item => item.hasOwnProperty("azerite_details") && item.azerite_details.hasOwnProperty("selected_essences"));

    if (!heartOfAzeroth) {
        throw new PartialEmpty("essences");
    }

    return heartOfAzeroth.azerite_details.selected_essences
        .map((essence) => {
            const spellTooltip = essence.slot === 0 ?
                essence.main_spell_tooltip :
                essence.passive_spell_tooltip;

            if (!spellTooltip || !spellTooltip.spell || !spellTooltip.spell.id) {
                throw new PartialEmpty("essences");
            }

            return {
                id: spellTooltip.spell.id,
                slot: essence.slot > 0 ? "SMALL" : "BIG",
            };
        });
}