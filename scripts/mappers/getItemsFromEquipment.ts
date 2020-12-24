import { ICharacterEquip, IItemSlot } from "../interfaces/ICharacterEquip";
import { itemMapper } from "./itemMapper";

const MAJOR_ITEM_TYPES = [
    IItemSlot.FINGER_1,
    IItemSlot.FINGER_2,
    IItemSlot.TRINKET_1,
    IItemSlot.TRINKET_2,
    IItemSlot.MAIN_HAND,
    IItemSlot.OFF_HAND,
];

export function getItemsFromEquipment(equipment: ICharacterEquip) {
    const majorItems = equipment.equipped_items
        .filter(item => MAJOR_ITEM_TYPES.includes(item.slot.type));

    return majorItems.map(itemMapper());
}