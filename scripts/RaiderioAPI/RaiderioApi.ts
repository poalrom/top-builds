import got from "got";
import Bottleneck from "bottleneck";
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
    private limiter = new Bottleneck({
        maxConcurrent: 1,
        // 5 RPS
        minTime: 200,
    });

    getTopCharacters(
        region: string,
        season: string,
        charClass: string,
        charSpec: string,
        page = 0
    ): Promise<IRioFullCharacter[]> {
        console.log(`Fetch top chars for region ${region} season ${season} class ${charClass} spec ${charSpec}`);
        return this.limiter.schedule(() => got.get(
                `${this.host}/mythic-plus/rankings/specs?` +
                `region=${region}&season=${season}&class=${charClass}&spec=${charSpec}&page=${page}`
            ).json())
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