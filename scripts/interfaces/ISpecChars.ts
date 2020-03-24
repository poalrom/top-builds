import { ICharData } from "./ICharData";
import { Class } from "./Class";
import { Spec } from "./Spec";

export interface ISpecChars {
    className: Class;
    spec: Spec;
    players: ICharData[];
}