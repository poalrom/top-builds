require("dotenv").config();
import pMap from "p-map";
import fs from "fs";
import path from "path";
import { getClassSpecPairs, ClassesWithSpecs } from "./interfaces/ClassesWithSpecs";
import { getTopChars } from "./controllers/getTopChars";

import { getCharsStats } from "./controllers/getCharsStats";
import { config } from "./config";

async function run() {
    fs.writeFileSync(
        path.resolve(__dirname, "../public/data/classes.json"),
        JSON.stringify(ClassesWithSpecs)
    );
    const classSpecPairs = getClassSpecPairs();
    const rioChars = await pMap(
        classSpecPairs.slice(config.classSpecRange.from, config.classSpecRange.to || classSpecPairs.length),
        getTopChars,
        { concurrency: 1 }
    );

    const charsWithStats = await pMap(rioChars, async (specChars) => {
        return {
            ...specChars,
            players: await getCharsStats(specChars)
        };
    }, { concurrency: 1 });

    for (const spec of charsWithStats) {
        const fileName = `${spec.className}-${spec.spec}.json`;
        console.log(`Save cache to file ${fileName}`);
        fs.writeFileSync(
            path.resolve(__dirname, `../public/data/${fileName}`),
            JSON.stringify(spec)
        );
        console.log(`Save cache to file ${fileName} success`);
    }
}

run()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });