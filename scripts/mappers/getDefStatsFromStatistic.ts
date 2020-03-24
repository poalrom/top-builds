import { ICharacterStat } from "../interfaces/ICharacterStat";
import { sortByValue } from "./sorters";

export function getDefStatsFromStatistic(statistic: ICharacterStat) {
    return [
        { title: "dodge", value: statistic.dodge.rating },
        { title: "parry", value: statistic.parry.rating },
        { title: "block", value: statistic.block.rating },
        { title: "avoidance", value: statistic.avoidance.rating },
    ].sort(sortByValue);
}