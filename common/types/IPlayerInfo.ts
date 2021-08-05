import { ICovenant } from "./ICovenant";
import { IItem } from "./IItem";
import { IRealm } from "./IRealm";
import { IStat } from "./IStat";

export interface IPlayerInfo {
    name: string;
    realm: IRealm;
    defStats: IStat[];
    offStats: IStat[];
    mainStats: IStat[];
    talents: number[];
    legendaries: IItem[];
    items: IItem[];
    covenant: ICovenant;
}