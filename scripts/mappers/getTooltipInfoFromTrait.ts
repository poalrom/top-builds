import { IBnetAPI } from "../BnetAPI/BnetAPI";
import { IConduit } from "../interfaces/IConduit";
import { ITrait } from "../interfaces/ISoulbinds";

export async function getTooltipInfoFromTrait(trait: ITrait, bnetAPI: IBnetAPI) {
    const href = trait.trait ? trait.trait.key.href : trait.conduit_socket.socket.conduit.key.href;
    const traitInfo = await bnetAPI.fetchByURL<IConduit>(href);

    return {
        id: traitInfo.spell_tooltip ? traitInfo.spell_tooltip.spell.id : traitInfo.item.id,
        type: traitInfo.spell_tooltip ? 'spell' : 'item',
    }
}