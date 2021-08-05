import { ISpec } from "../services/wow/types/ICharacterSpecs";


export function getTalentsFromSpec(spec: ISpec): number[] {
    return spec.talents.map((talent) => talent.spell_tooltip.spell.id);
}