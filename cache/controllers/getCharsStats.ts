import { getMainStatsFromStatistic } from "../mappers/getMainStatsFromStatistic";
import { getOffStatsFromStatistic } from "../mappers/getOffStatsFromStatistic";
import { getDefStatsFromStatistic } from "../mappers/getDefStatsFromStatistic";
import { getTalentsFromSpec } from "../mappers/getTalentsFromSpec";
import { getItemsFromEquipment } from "../mappers/getItemsFromEquipment";
import { humanify } from "../mappers/humanify";
import { getLegendariesFromEquipment } from "../mappers/getLegendariesFromEquipment";
import { wowClient } from "../services/wow";
import { IClassSpecPair } from "../../common/types/ClassSpecPairs";
import { ICharacterStat } from "../services/wow/types/ICharacterStat";
import { ICharacterEquip } from "../services/wow/types/ICharacterEquip";
import { ICharacterSpecs } from "../services/wow/types/ICharacterSpecs";
import { getCovenantInfoFromSoulbinds } from "../mappers/getCovenantInfoFromSoulbinds";
import { ISoulbinds } from "../../common/types/ISoulbinds";
import { ICharacterInfo } from "../services/wow/types/ICharacterInfo";
import { ICharacter } from "../../common/types/ICharacter";
import { IPlayerInfo } from "../../common/types/IPlayerInfo";
import { getTraitInitialID } from "../services/wow/helpers/getTraitInitialID";

const ANONYMOUS_REALM = "anonymous";

export async function getCharsStats({ specName }: IClassSpecPair, characters: ICharacter[]): Promise<IPlayerInfo[]> {
    const chars = characters.filter((player) => player.realm.slug !== ANONYMOUS_REALM);
    const charactersInfo = await Promise.allSettled(chars.map(async (char): Promise<IPlayerInfo> => {
        const requestParams = {
            realm: char.realm.slug,
            name: char.name.toLocaleLowerCase(),
        }

        console.log(`Start loading ${requestParams.name} from ${requestParams.realm}`);

        const charInfo = await wowClient.characterProfile<ICharacterInfo>(requestParams)
            .then(res => res.data);

        if (!charInfo) {
            return;
        }

        const { data: charSpecs } = await wowClient.characterSpecializations<ICharacterSpecs>(requestParams);
        const characterSpec = charSpecs.specializations
            .find((specInfo) => specInfo.specialization.name === humanify(specName));

        if (!characterSpec) {
            const actualCharSpecs = charSpecs.specializations.map(({ specialization }) => specialization.name);
            throw new Error(`Specs ${actualCharSpecs} not includes ${specName}`);
        }

        const [{ data: stats }, { data: equipment }, { data: soulbinds }] = await Promise.all([
            wowClient.characterStatistics<ICharacterStat>(requestParams),
            wowClient.characterEquipment<ICharacterEquip>(requestParams),
            wowClient.characterSoulbinds<ISoulbinds>(requestParams),
        ]);

        const covenant = getCovenantInfoFromSoulbinds(soulbinds);

        await Promise.all(covenant.traits.map(async trait => {
            trait.id = await getTraitInitialID(trait);
        }));

        console.log(`Successfully loaded ${requestParams.name} from ${requestParams.realm}`);

        const result = {
            name: charInfo.name,
            realm: charInfo.realm,
            mainStats: getMainStatsFromStatistic(stats),
            offStats: getOffStatsFromStatistic(stats),
            defStats: getDefStatsFromStatistic(stats),
            talents: getTalentsFromSpec(characterSpec),
            items: getItemsFromEquipment(equipment),
            legendaries: getLegendariesFromEquipment(equipment),
            covenant,
        };

        console.log(`Successfully mapped ${requestParams.name} from ${requestParams.realm}`);

        return result;
    }));

    return charactersInfo.reduce((acc, charInfo, i) => {
        if (charInfo.status === 'fulfilled') {
            acc.push(charInfo.value);
        } else {
            console.error(`Error with ${chars[i].name} from ${chars[i].realm}`, charInfo.reason);
        }

        return acc;
    }, []);
}