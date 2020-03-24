import got from "got";
import { config } from "../config";
import { Region } from "../interfaces/Region";
import { Locale } from "../interfaces/Locale";
import { BnetNamespace } from "./BnetNamespace";
import { ICharInfo } from "../interfaces/ICharInfo";
import { ICharacterStat } from "../interfaces/ICharacterStat";
import { ICharacterSpec } from "../interfaces/ICharacterSpec";
import { ICharacterEquip } from "../interfaces/ICharacterEquip";

class BnetAPI {
    private accessToken = "";

    constructor(
        private clientId: string,
        private token: string,
        private region: Region,
        private locale: Locale = Locale.en,
    ) {}

    get host() {
        return `https://${this.region}.api.blizzard.com`;
    }

    get isAuthenticated() {
        return this.accessToken.length > 0;
    }

    async auth() {
        console.log(`Try to auth`);
        const { access_token, expires_in } = await got.post(`https://${this.region}.battle.net/oauth/token`, {
            headers: {
                Authorization: `Basic ${Buffer.from(this.clientId + ":" + this.token).toString("base64")}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials",
        }).json();

        console.log(`Auth success`);

        this.accessToken = access_token;

        setTimeout(() => this.accessToken = "", expires_in - 10000);
    }

    async getCharacterInfo(realmSlug: string, characterName: string) {
        return this.fetch<ICharInfo>(
            BnetNamespace.profile,
            `/profile/wow/character/${realmSlug}/${encodeURIComponent(characterName)}`
        );
    }

    async getCharacterStatistic(realmSlug: string, characterName: string) {
        return this.fetch<ICharacterStat>(
            BnetNamespace.profile,
            `/profile/wow/character/${realmSlug}/${encodeURIComponent(characterName)}/statistics`
        );
    }

    async getCharacterSpec(realmSlug: string, characterName: string) {
        return this.fetch<ICharacterSpec>(
            BnetNamespace.profile,
            `/profile/wow/character/${realmSlug}/${encodeURIComponent(characterName)}/specializations`
        );
    }

    async getCharacterEquipment(realmSlug: string, characterName: string) {
        return this.fetch<ICharacterEquip>(
            BnetNamespace.profile,
            `/profile/wow/character/${realmSlug}/${encodeURIComponent(characterName)}/equipment`
        );
    }

    private async fetch<T>(namespace: BnetNamespace, uri: string) {
        console.log(`Fetch ${uri}`);

        if (!this.isAuthenticated) {
            await this.auth();
        }

        return await got.get(this.host + uri + `?locale=${this.locale}`, {
            headers: {
                Authorization: `Bearer ${this.accessToken}`,
                "Content-Type": "application/json",
                "Battlenet-Namespace": `${namespace}-${this.region}`
            },
        }).json().then((res: T) => {
            console.log(`Fetch ${uri} success`);
            return res;
        });
    }
}

const apiCache = {} as Record<Region, BnetAPI>;

export async function getBnetApi(region: Region) {
    if (!apiCache[region]) {
        apiCache[region] = new BnetAPI(config.BNET_ID, config.BNET_SECRET, region);
        await apiCache[region].auth();
    }

    return apiCache[region];
}