interface ITooltip {
    id: number;
}

export type IConduit = { spell_tooltip: { spell: ITooltip }; item: undefined } | { item: ITooltip; spell_tooltip: undefined }