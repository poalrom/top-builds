import { IStat } from "../../common/types/IStat";
import { ICharacterStat } from "../services/wow/types/ICharacterStat";
import { sortByValue } from "./sorters";

export function getDefStatsFromStatistic(statistic: ICharacterStat): IStat[] {
    return [
        { title: "dodge", value: statistic.dodge.rating },
        { title: "parry", value: statistic.parry.rating },
        { title: "block", value: statistic.block.rating },
        { title: "avoidance", value: statistic.avoidance.rating },
    ].sort(sortByValue);
}