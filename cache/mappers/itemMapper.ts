
import { IItem } from "../../common/types/IItem";
import { IEquippedItem } from "../services/wow/types/ICharacterEquip";


export function itemMapper(overwrite: Partial<IItem> = {}) {
    return (item: IEquippedItem): IItem => ({
        id: item.item.id,
        slot: item.slot.type,
        ilvl: item.level.value,
        enchantments: item.enchantments ? item.enchantments.map((i) => i.enchantment_id) : [],
        sockets: item.sockets ? item.sockets.map((i) => i.item ? i.item.id : undefined).filter(Boolean) : [],
        bonuses: item.bonus_list || [],
        spells: (item.spells || []).map(spell => spell.spell.id),
        ...overwrite,
    });
}