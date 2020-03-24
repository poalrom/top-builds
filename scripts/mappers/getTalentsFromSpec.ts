import { ICharacterSpec } from "../interfaces/ICharacterSpec";
import { humanify } from "./humanify";

export function getTalentsFromSpec(spec: ICharacterSpec, specName: string) {
    const currentSpec = spec.specializations
        .find((specInfo) => specInfo.specialization.name === specName);

    return currentSpec ? currentSpec.talents.map((talent) => talent.spell_tooltip.spell.id) : [];
}