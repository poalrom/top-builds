interface IMainStat {
    effective: number;
}

interface IOffStat {
    rating: number;
}

export interface ICharacterStat {
    strength: IMainStat;
    intellect: IMainStat;
    stamina: IMainStat;
    agility: IMainStat;
    melee_crit: IOffStat;
    melee_haste: IOffStat;
    mastery: IOffStat;
    versatility: number;
    dodge: IOffStat;
    parry: IOffStat;
    block: IOffStat;
    avoidance: IOffStat;
}