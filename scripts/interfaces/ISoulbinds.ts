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

export interface ITrait {
    trait?: {
        id: number;
        key: {
            href: string;
        };
    };
    conduit_socket: {
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
    tier: number;
    display_order: number;
}