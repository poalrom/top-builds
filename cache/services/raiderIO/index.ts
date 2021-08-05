import axios from 'axios';
import rateLimit, { RateLimitedAxiosInstance } from 'axios-rate-limit';


import { IStatisticData } from './types/IStatisticData';
import { IRankingCharactersResponse } from './types/IRankingCharactersResponse';
import { Region } from '../../../common/types/Region';
import { ICharacter } from '../../../common/types/ICharacter';


class RaiderIO {
    private axios: RateLimitedAxiosInstance;
    private baseUrl = 'https://raider.io/api/';

    constructor(
        private region: Region,
    ) {
        this.axios = rateLimit(
            axios.create(),
            { maxRequests: 2, perMilliseconds: 1000, maxRPS: 2 }
        );
    }

    async getCurrentSeasonSlug(): Promise<string> {
        let statisticData: IStatisticData['seasons'] = [];
        for (let expansionID = 8; expansionID < 100; expansionID++) {
            const { data: nextStatisticData } = await axios.get<IStatisticData>(
                'v1/mythic-plus/static-data',
                {
                    baseURL: this.baseUrl,
                    params: {
                        expansion_id: expansionID,
                    }
                }
            );

            if (nextStatisticData.seasons.length) {
                statisticData = nextStatisticData.seasons;
            } else {
                break;
            }
        }

        return statisticData[0].slug;
    }

    async getTopCharacters(
        season: string,
        charClass: string,
        spec: string,
        page = 0
    ): Promise<ICharacter[]> {
        console.log(`Fetch top chars for region ${this.region} season ${season} class ${charClass} spec ${spec} [page#${page}]`);

        const { data } = await this.axios.get<IRankingCharactersResponse>(
            'mythic-plus/rankings/specs',
            {
                baseURL: this.baseUrl,
                params: {
                    region: this.region,
                    season,
                    class: charClass,
                    spec,
                    page
                }
            }
        );

        console.log(`Fetch top chars for region ${this.region} season ${season} class ${charClass} spec ${spec} success [page#${page}]`);

        return data.rankings.rankedCharacters.map((char) => char.character);
    }
}

export let raiderIO: RaiderIO;

export function initRaiderIO(region: Region) {
    raiderIO = new RaiderIO(region);
}