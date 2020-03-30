import { IRioFilter } from "../interfaces/IRioFilter";
import { getTopChars } from "./getTopChars";
import { getCharsStats } from "./getCharsStats";

export async function getCharactersInfo(classSpec: IRioFilter) {
    const charInfoList = [];

    for (let i = 0; i < 10; i++) {
        if (charInfoList.length >= 30) {
            break;
        }

        const rioChars = await getTopChars(classSpec, i);

        charInfoList.push(...(await getCharsStats(rioChars)));
    }

    return {
        className: classSpec.className,
        spec: classSpec.spec,
        players: charInfoList.slice(0, 30),
    };
}