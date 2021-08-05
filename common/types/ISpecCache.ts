import { IPlayerInfo } from "./IPlayerInfo";
import { Class } from "./Class";
import { Spec } from "./Spec";

export interface ISpecCache {
    className: Class;
    spec: Spec;
    players: IPlayerInfo[];
}