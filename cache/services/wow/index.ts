import { createClient } from 'blizzard.js/dist/create-client';
import { wow } from 'blizzard.js';
import { Region } from '../../../common/types/Region';
import { getTransport } from '../../transport';

export let wowClient: wow.WoWClient;

export async function initWowClient(
    region: Region,
    key: string,
    secret: string,
) {
    const client = await createClient(wow.WoW)({
        key,
        secret,
        origin: region,
    });

    client.axios = getTransport({ rateLimit: { maxRPS: 10 } });

    wowClient = client;
}