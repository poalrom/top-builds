import { ISpellTooltip } from "./ISpellTooltip";

interface IAzeritePower {
    spell_tooltip?: ISpellTooltip;
}

interface IAzeriteEssence {
    slot: number;
    main_spell_tooltip?: ISpellTooltip;
    passive_spell_tooltip?: ISpellTooltip;
}

interface IAzeriteDetails {
    selected_powers?: IAzeritePower[];
    selected_essences?: IAzeriteEssence[];
}

interface IStat {
    type: {
        type: string;
    };
    value: number;
}

export enum IItemSlot {
    HEAD = "HEAD",
    NECK = "NECK",
    SHOULDER = "SHOULDER",
    CHEST = "CHEST",
    WAIST = "WAIST",
    LEGS = "LEGS",
    FEET = "FEET",
    WRIST = "WRIST",
    HANDS = "HANDS",
    FINGER_1 = "FINGER_1",
    FINGER_2 = "FINGER_2",
    TRINKET_1 = "TRINKET_1",
    TRINKET_2 = "TRINKET_2",
    BACK = "BACK",
    MAIN_HAND = "MAIN_HAND",
    OFF_HAND = "OFF_HAND",
}

interface IEnchantment {
    enchantment_id: number;
}

interface ISocket {
    item: {
        id: number;
    };
}

export interface IItem {
    azerite_details?: IAzeriteDetails;
    is_corrupted?: true;
    spells?: ISpellTooltip[];
    stats?: IStat[];
    slot: {
        type: IItemSlot;
    };
    item: {
        id: number;
    };
    level: {
        value: number;
    };
    enchantments: IEnchantment[];
    sockets: ISocket[];
    quality: {
        type: String;
    };
    bonus_list?: number[];
}

export interface ICharacterEquip {
    equipped_items: IItem[];
}