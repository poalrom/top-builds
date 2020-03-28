import { ICharacterEquip, IItemSlot } from "../interfaces/ICharacterEquip";

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

    return majorItems
        .map((item) => ({
            id: item.item.id,
            slot: item.slot.type,
            ilvl: item.level.value,
            enchantments: item.enchantments ? item.enchantments.map((i) => i.enchantment_id) : [],
            sockets: item.sockets ? item.sockets.map((i) => i.item.id) : [],
        }));
}