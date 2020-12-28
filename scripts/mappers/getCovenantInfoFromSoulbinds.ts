import { IBnetAPI } from "../BnetAPI/BnetAPI";
import { ISoulbinds, ITrait } from "../interfaces/ISoulbinds";
import { getTooltipInfoFromTrait } from "./getTooltipInfoFromTrait";

export async function getCovenantInfoFromSoulbinds(soulbinds: ISoulbinds, bnetAPI: IBnetAPI) {
    const soulbind = (soulbinds.soulbinds || []).find(s => s.is_active);

    return {
        covenant: soulbinds.chosen_covenant.name,
        renownLevel: soulbinds.renown_level,
        soulbind: soulbind ? soulbind.soulbind.name : '',
        traits: soulbind ? await getActiveTraits(soulbind.traits, bnetAPI) : [],
    }
}

async function getActiveTraits(traits: ITrait[], bnetAPI: IBnetAPI) {
    return (await Promise.all(traits.map(async trait => {
        if (!trait.trait && !trait.conduit_socket.socket?.conduit) {
            return;
        }

        return {
            tier: trait.tier,
            socketType: trait.trait ? undefined : trait.conduit_socket.type.type,
            ...(await getTooltipInfoFromTrait(trait, bnetAPI)),
        };
    }))).filter(Boolean);
}