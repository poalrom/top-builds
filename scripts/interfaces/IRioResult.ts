import { Class } from "./Class";
import { Spec } from "./Spec";
import { ICharData } from "./ICharData";

export interface IRioResult {
    className: Class;
    spec: Spec;
    chars: ICharData[];
}