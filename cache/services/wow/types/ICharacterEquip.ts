import { IItemSlot } from "../../../../common/types/IItemSlot";
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

interface IEnchantment {
    enchantment_id: number;
}

interface ISocket {
    item: {
        id: number;
    };
}

export interface IEquippedItem {
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
    equipped_items: IEquippedItem[];
}