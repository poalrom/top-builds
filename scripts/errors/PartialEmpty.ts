export class PartialEmpty {
    public static code = "PARTIAL_EMPTY";

    constructor(private field: string) { }

    get code() {
        return PartialEmpty.code;
    }

    toString() {
        return `Partial empty ${this.field}`;
    }
}