import got from "got";
import { IRioFullCharacter } from "../interfaces/IRioFullCharacter";
import { ICharData } from "../interfaces/ICharData";

interface ITopCharacterResponse {
    rankings: {
        rankedCharacters: Array<{
            character: IRioFullCharacter
        }>
    };
}

class RaiderioApi {
    private host = "https://raider.io/api";

    getTopCharacters(
        region: string,
        season: string,
        charClass: string,
        charSpec: string,
        page = 0
    ): Promise<IRioFullCharacter[]> {
        console.log(`Fetch top chars for region ${region} season ${season} class ${charClass} spec ${charSpec}`);
        return got.get(
            `${this.host}/mythic-plus/rankings/specs?` +
            `region=${region}&season=${season}&class=${charClass}&spec=${charSpec}&page=${page}`
        )
            .json()
            .then((res: ITopCharacterResponse) => {
                console.log(`Fetch top chars for region ${region} season ${season} class ${charClass} spec ${charSpec} success`);
                return res.rankings.rankedCharacters.map((char) => char.character);
            });
    }

    rioFullCharacterToCharData(char: IRioFullCharacter): ICharData {
        return {
            name: char.name,
            realmSlug: char.realm.slug
        };
    }
}

export function getRaiderioApi() {
    return new RaiderioApi();
}