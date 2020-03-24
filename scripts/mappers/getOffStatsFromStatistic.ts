import { ICharacterStat } from "../interfaces/ICharacterStat";
import { sortByValue } from "./sorters";

export function getOffStatsFromStatistic(statistic: ICharacterStat) {
    return [
        { title: "crit", value: statistic.melee_crit.rating },
        { title: "haste", value: statistic.melee_haste.rating },
        { title: "mastery", value: statistic.mastery.rating },
        { title: "versatility", value: statistic.versatility },
    ].sort(sortByValue);
}