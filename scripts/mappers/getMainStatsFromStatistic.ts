import { ICharacterStat } from "../interfaces/ICharacterStat";
import { sortByValue } from "./sorters";

export function getMainStatsFromStatistic(statistic: ICharacterStat) {
    return [
        { title: "strength", value: statistic.strength.effective },
        { title: "intellect", value: statistic.intellect.effective },
        { title: "stamina", value: statistic.stamina.effective },
        { title: "agility", value: statistic.agility.effective },
    ].sort(sortByValue);
}