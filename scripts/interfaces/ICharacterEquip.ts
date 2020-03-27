import { ISpellTooltip } from "./ISpellTooltip";

interface IAzeritePower {
    spell_tooltip: ISpellTooltip;
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

interface IItem {
    azerite_details?: IAzeriteDetails;
    is_corrupted?: true;
    spells?: ISpellTooltip[];
    stats?: IStat[];
}

export interface ICharacterEquip {
    equipped_items: IItem[];
}