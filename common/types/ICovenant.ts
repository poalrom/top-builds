import { ICovenantTrait } from "./ICovenantTrait";

export interface ICovenant {
    covenant: string;
    renownLevel: number;
    soulbind: string;
    traits: ICovenantTrait[];
}