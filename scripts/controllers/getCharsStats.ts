import pMap from "p-map";

import { getBnetApi } from "../BnetAPI/BnetAPI";
import { Region } from "../interfaces/Region";
import { getMainStatsFromStatistic } from "../mappers/getMainStatsFromStatistic";
import { getOffStatsFromStatistic } from "../mappers/getOffStatsFromStatistic";
import { getDefStatsFromStatistic } from "../mappers/getDefStatsFromStatistic";
import { getAzeritePowersFromEquipment } from "../mappers/getAzeritePowersFromEquipment";
import { getEssencesFromEquipment } from "../mappers/getEssencesFromEquipment";
import { getTalentsFromSpec } from "../mappers/getTalentsFromSpec";
import { getCorruptsFromEquipment } from "../mappers/getCorruptsFromEquipment";
import { getCorruptionLevelFromEquipment } from "../mappers/getCorruptionLevelFromEquipment";
import { getItemsFromEquipment } from "../mappers/getItemsFromEquipment";
import { ISpecChars } from "../interfaces/ISpecChars";
import { ICharInfo } from "../interfaces/ICharInfo";
import { humanify } from "../mappers/humanify";
import { PartialEmpty } from "../errors/PartialEmpty";

const ANONYMOUS_REALM = "anonymous";

export async function getCharsStats(specChars: ISpecChars) {
    const bnetAPI = await getBnetApi(Region.eu);
    await bnetAPI.auth();
    const chars = specChars.players.filter((player) => player.realmSlug !== ANONYMOUS_REALM);
    const charactersInfo = await pMap(chars, async (char) => {
        const charName = char.name.toLocaleLowerCase();

        const charInfo = await bnetAPI.getCharacterInfo(char.realmSlug, charName)
            .catch((e) => {
                console.error(e);

                return {} as ICharInfo;
            });

        if (!charInfo.active_spec || charInfo.active_spec.name !== humanify(specChars.spec)) {
            return;
        }
        const stats = await bnetAPI.getCharacterStatistic(char.realmSlug, charName);
        const equipment = await bnetAPI.getCharacterEquipment(char.realmSlug, charName);
        const spec = await bnetAPI.getCharacterSpec(char.realmSlug, charName);

        try {
            return {
                name: charInfo.name,
                realm: charInfo.realm,
                mainStats: getMainStatsFromStatistic(stats),
                offStats: getOffStatsFromStatistic(stats),
                defStats: getDefStatsFromStatistic(stats),
                azeritePowers: getAzeritePowersFromEquipment(equipment),
                essences: getEssencesFromEquipment(equipment),
                talents: getTalentsFromSpec(spec, specChars.spec),
                corrupts: getCorruptsFromEquipment(equipment),
                corruptionLevel: getCorruptionLevelFromEquipment(equipment),
                items: getItemsFromEquipment(equipment),
            };
        } catch (e) {
            if (!e || e.code !== PartialEmpty.code) {
                throw e;
            }

            console.error(String(e) + ` in ${char.name} from ${char.realmSlug}`);

            return;
        }
    }, { concurrency: 5 });

    return charactersInfo.filter(Boolean);
}