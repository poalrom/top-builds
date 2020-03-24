import pMap from "p-map";
import fs from "fs";
import path from "path";
import { getClassSpecPairs, ClassesWithSpecs } from "./interfaces/ClassesWithSpecs";
import { getTopChars } from "./controllers/getTopChars";

import { getCharsStats } from "./controllers/getCharsStats";

async function run() {
    fs.writeFileSync(
        path.resolve(__dirname, "../public/data/classes.json"),
        JSON.stringify(ClassesWithSpecs)
    );
    const classSpecPairs = getClassSpecPairs();
    const rioChars = await pMap(classSpecPairs, getTopChars, { concurrency: 1 });

    const charsWithStats = await pMap(rioChars, async (specChars) => {
        return {
            ...specChars,
            players: await getCharsStats(specChars)
        };
    });

    for (const spec of charsWithStats) {
        const fileName = `${spec.className}-${spec.spec}.json`;
        fs.writeFileSync(
            path.resolve(__dirname, `../public/data/${fileName}`),
            JSON.stringify(spec)
        );
    }
}

run()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });