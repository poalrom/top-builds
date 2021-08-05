import { createClient } from 'blizzard.js/dist/create-client';
import { wow } from 'blizzard.js';
import axios from 'axios';
import rateLimit from 'axios-rate-limit';
import { Region } from '../../../common/types/Region';

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

    client.axios = rateLimit(
        axios.create(),
        { maxRPS: 10 }
    );

    wowClient = client;
}