import { IBnetAPI } from "../BnetAPI/BnetAPI";
import { IConduit } from "../interfaces/IConduit";
import { ITrait } from "../interfaces/ISoulbinds";

interface ITooltip {
    id: number;
    type: 'spell' | 'item';
}

const TRAIT_CACHE: Record<string, ITooltip> = {};

export async function getTooltipInfoFromTrait(trait: ITrait, bnetAPI: IBnetAPI) {
    const href = trait.trait ? trait.trait.key.href : trait.conduit_socket.socket.conduit.key.href;

    if (TRAIT_CACHE[href]) {
        return TRAIT_CACHE[href];
    }

    const traitInfo = await bnetAPI.fetchByURL<IConduit>(href);
    TRAIT_CACHE[href] = {
        id: traitInfo.spell_tooltip ? traitInfo.spell_tooltip.spell.id : traitInfo.item.id,
        type: traitInfo.spell_tooltip ? 'spell' : 'item',
    };

    return TRAIT_CACHE[href];
}