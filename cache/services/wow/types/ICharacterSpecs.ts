import { ISpellTooltip } from "./ISpellTooltip";

export interface ISpec {
    specialization: {
        name: string;
    };
    talents: Array<{
        spell_tooltip: ISpellTooltip;
    }>;
}

export interface ICharacterSpecs {
    specializations: ISpec[];
}