import { ISoulbinds, ITrait } from "../../common/types/ISoulbinds";
import { ICovenantTrait } from "../../common/types/ICovenantTrait";
import { ICovenant } from "../../common/types/ICovenant";

export function getCovenantInfoFromSoulbinds(soulbinds: ISoulbinds): ICovenant {
    const soulbind = (soulbinds.soulbinds || []).find(s => s.is_active);

    if (!soulbind) {
        throw new Error('No active soulbind');
    }

    return {
        covenant: soulbinds.chosen_covenant.name,
        renownLevel: soulbinds.renown_level,
        soulbind: soulbind.soulbind.name,
        traits: soulbind.traits.map(charTraitToCovenant),
    }
}

function charTraitToCovenant(trait: ITrait): ICovenantTrait {

    return {
        tier: trait.tier,
        id: trait.conduit_socket ?
            trait.conduit_socket.socket.conduit.id :
            trait.trait.id,
        type: trait.conduit_socket ? 'item' : 'spell',
        socketType: trait.conduit_socket && trait.conduit_socket.type.type,
    };


    // try {
    //     return (await Promise.all(traits.map(async trait => {
    //         if (!trait.trait && !trait.conduit_socket.socket?.conduit) {
    //             return;
    //         }
    
    //         return {
    //             tier: trait.tier,
    //             socketType: trait.trait ? undefined : trait.conduit_socket.type.type,
    //             ...(await getTooltipInfoFromTrait(trait, bnetAPI)),
    //         };
    //     }))).filter(Boolean);
    // } catch (e) {
    //     debugger;
    //     throw e;
    // }
}