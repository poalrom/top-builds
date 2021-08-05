export interface ISoulbinds {
    chosen_covenant: {
        name: string;
        id: number;
    };
    renown_level: number;
    soulbinds?: ISoulbind[];
}

export interface ISoulbind {
    soulbind: {
        name: string;
        id: number;
    };
    traits: ITrait[];
    is_active?: true;
}

interface IConduitSocketInfo {
    type: {
        type: string;
        name: string;
    };
    socket: {
        conduit: {
            id: number;
            key: {
                href: string;
            };
        };
        rank: number;
    };
};

interface ITraitInfo {
    id: number;
    name: string;
    key: {
        href: string;
    }
}

export type ITrait = {
    tier: number;
    display_order: number;
} & ({
    trait: ITraitInfo;
    conduit_socket: undefined;
} | {
    trait: undefined;
    conduit_socket: IConduitSocketInfo;
})