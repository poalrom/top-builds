import { Region } from "./Region";
import { Class } from "./Class";
import { Spec } from "./Spec";

export interface IRioFilter {
    region?: Region;
    season?: string;
    className: Class;
    spec: Spec;
}