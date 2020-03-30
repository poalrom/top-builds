import { getRaiderioApi } from "../RaiderioAPI/RaiderioApi";
import { Region } from "../interfaces/Region";
import { config } from "../config";
import { IRioFilter } from "../interfaces/IRioFilter";

export async function getTopChars(filter: IRioFilter, page?: number) {
    const {
        region = Region.eu,
        season = config.season,
        className,
        spec,
    } = filter;
    const raiderioAPI = getRaiderioApi();

    return {
        className,
        spec,
        players: (await raiderioAPI.getTopCharacters(region, season, className, spec, page))
            .map(raiderioAPI.rioFullCharacterToCharData),
    };
}