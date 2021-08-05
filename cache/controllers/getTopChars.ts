
import { IClassSpecPair } from "../../common/types/ClassSpecPairs";
import { ICharacter } from "../../common/types/ICharacter";
import { raiderIO } from "../services/raiderIO";

export async function getTopChars(
    season: string,
    {className, specName}: IClassSpecPair,
    page?: number
): Promise<ICharacter[]> {
    return await raiderIO.getTopCharacters(
        season,
        className,
        specName,
        page,
    );
}