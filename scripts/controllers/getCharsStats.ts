import { getBnetApi } from "../BnetAPI/BnetAPI";
import { Region } from "../interfaces/Region";
import { getMainStatsFromStatistic } from "../mappers/getMainStatsFromStatistic";
import { getOffStatsFromStatistic } from "../mappers/getOffStatsFromStatistic";
import { getDefStatsFromStatistic } from "../mappers/getDefStatsFromStatistic";
import { getTalentsFromSpec } from "../mappers/getTalentsFromSpec";
import { getItemsFromEquipment } from "../mappers/getItemsFromEquipment";
import { ISpecChars } from "../interfaces/ISpecChars";
import { ICharInfo } from "../interfaces/ICharInfo";
import { humanify } from "../mappers/humanify";
import { PartialEmpty } from "../errors/PartialEmpty";
import { getLegendariesFromEquipment } from "../mappers/getLegendariesFromEquipment";
import { getCovenantInfoFromSoulbinds } from "../mappers/getCovenantInfoFromSoulbinds";
import { ICharData } from "../interfaces/ICharData";

const ANONYMOUS_REALM = "anonymous";

export async function getCharsStats(specChars: ISpecChars) {
    const bnetAPI = await getBnetApi(Region.eu);
    await bnetAPI.auth();
    const chars = specChars.players.filter((player) => player.realmSlug !== ANONYMOUS_REALM);
    const charactersInfo = await Promise.all(chars.map(async (char) => {
        const charName = char.name.toLocaleLowerCase();

        const charInfo = await bnetAPI.getCharacterInfo(char.realmSlug, charName)
            .catch((e) => {
                if (e.code === "500") {
                    throw e;
                }

                console.error(e);

                return {} as ICharInfo;
            });

        if (!charInfo.active_spec || charInfo.active_spec.name !== humanify(specChars.spec)) {
            return;
        }

        const stats = await bnetAPI.getCharacterStatistic(char.realmSlug, charName);
        const equipment = await bnetAPI.getCharacterEquipment(char.realmSlug, charName);
        const spec = await bnetAPI.getCharacterSpec(char.realmSlug, charName);
        let soulbinds;
        try {
            soulbinds = await bnetAPI.getCharacterSoulbinds(char.realmSlug, charName);
        } catch (e) {
            logError(e, char);
        }
        const covenant = soulbinds && await getCovenantInfoFromSoulbinds(soulbinds, bnetAPI);

        try {
            return {
                name: charInfo.name,
                realm: charInfo.realm,
                mainStats: getMainStatsFromStatistic(stats),
                offStats: getOffStatsFromStatistic(stats),
                defStats: getDefStatsFromStatistic(stats),
                talents: getTalentsFromSpec(spec, specChars.spec),
                items: getItemsFromEquipment(equipment),
                legendaries: getLegendariesFromEquipment(equipment),
                covenant,
            };
        } catch (e) {
            if (!e || e.code !== PartialEmpty.code) {
                throw e;
            }

            logError(e, char);

            return;
        }
    }));

    return charactersInfo.filter(Boolean);
}

function logError(e: unknown, char: ICharData) {
    console.error(String(e) + ` in ${char.name} from ${char.realmSlug}`);
}