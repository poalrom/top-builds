import { IRankingCharacter } from "./IRankingCharacter";

export interface IRankingCharactersResponse {
    rankings: {
        rankedCharacters: IRankingCharacter[];
    };
}