import { IItem } from "../interfaces/ICharacterEquip";

interface IClientItem {
    id: number;
    ilvl: number;
    slot: string;
    sockets: number[];
    enchantments: number[];
    bonuses: number[];
    spells: number[];
}

export function itemMapper(overwrite: Partial<IClientItem> = {}) {
    return (item: IItem): IClientItem => ({
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