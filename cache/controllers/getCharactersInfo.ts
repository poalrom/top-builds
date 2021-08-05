import { getTopChars } from "./getTopChars";
import { getCharsStats } from "./getCharsStats";
import { IClassSpecPair } from "../../common/types/ClassSpecPairs";
import { ISpecCache } from "../../common/types/ISpecCache";

export async function getCharactersInfo(
    season: string,
    classSpec: IClassSpecPair,
): Promise<ISpecCache> {
    const charInfoList = [];

    // Get only 10 first pages
    for (let i = 0; i < 10; i++) {
        if (charInfoList.length >= 30) {
            break;
        }

        const chars = await getTopChars(season, classSpec, i);
        const charsStats = await getCharsStats(classSpec, chars);

        charInfoList.push(...charsStats);
    }

    return {
        className: classSpec.className,
        spec: classSpec.specName,
        players: charInfoList.slice(0, 30),
    };
}