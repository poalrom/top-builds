import { ICharacterEquip } from "../services/wow/types/ICharacterEquip";
import { itemMapper } from "./itemMapper";

const LEGENDARY_QUALITY = 'LEGENDARY';

export function getLegendariesFromEquipment(equipment: ICharacterEquip) {
    const legendaries = equipment.equipped_items
        .filter(item => item.quality.type === LEGENDARY_QUALITY);

    return legendaries
        .map(itemMapper({ slot: LEGENDARY_QUALITY }));
}