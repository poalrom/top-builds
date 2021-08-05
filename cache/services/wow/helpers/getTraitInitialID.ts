import { wowClient } from "..";
import { ICovenantTrait } from "../../../../common/types/ICovenantTrait";
import { IConduit } from "../types/IConduit";
import { ITechTalent } from "../types/ITechTalent";

const TRAIT_CACHE: Record<string, number> = {};

export async function getTraitInitialID(trait: ICovenantTrait) {
    const cacheKey = trait.type + trait.id;

    if (TRAIT_CACHE[cacheKey]) {
        return TRAIT_CACHE[cacheKey];
    }

    if (trait.type === 'spell') {
        const { data } = await wowClient.techTalent<ITechTalent>({ id: trait.id });

        TRAIT_CACHE[cacheKey] = data.spell_tooltip.spell.id;
    } else {
        const { data } = await wowClient.conduit<IConduit>({ id: trait.id });

        TRAIT_CACHE[cacheKey] = data.item.id;
    }

    return TRAIT_CACHE[cacheKey];
}