export const config = {
    BNET_ID: process.env.BNET_ID || "",
    BNET_SECRET: process.env.BNET_SECRET || "",
    forceCache: !!process.env.FORCE_CACHE,
    season: process.env.SEASON || "",
    classSpecRange: {
        from: Number(process.env.CACHE_FROM) || 0,
        to: Number(process.env.CACHE_TO) || 0,
    }
};