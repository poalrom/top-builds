import { ISpellTooltip } from "./ISpellTooltip";

interface ISpec {
    specialization: {
        name: string;
    };
    talents: Array<{
        spell_tooltip: ISpellTooltip;
    }>;
}

export interface ICharacterSpec {
    specializations: ISpec[];
}