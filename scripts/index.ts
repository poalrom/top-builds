require("dotenv").config();
import fs from "fs";
import path from "path";
import { promisify } from "util";

import { getClassSpecPairs, ClassesWithSpecs } from "./interfaces/ClassesWithSpecs";
import { config } from "./config";
import { getCharactersInfo } from "./controllers/getCharactersInfo";

const promisifiedWriteFile = promisify(fs.writeFile);

async function run() {
    const metaFilePath = path.resolve(__dirname, "../public/data/meta.json");
    const classesFilePath = path.resolve(__dirname, "../public/data/classes.json");

    await promisifiedWriteFile(classesFilePath, JSON.stringify(ClassesWithSpecs));

    const classSpecPairs = getClassSpecPairs();
    const classSpecPairsForLoad = classSpecPairs.slice(config.classSpecRange.from, config.classSpecRange.to || classSpecPairs.length);

    for (const classSpec of classSpecPairsForLoad) {
        const fileName = `${classSpec.className}-${classSpec.spec}.json`;
        const classSpecCache = await getCharactersInfo(classSpec);
        console.log(`Save cache to file ${fileName}`);
        await promisifiedWriteFile(
            path.resolve(__dirname, `../public/data/${fileName}`),
            JSON.stringify(classSpecCache)
        );
        console.log(`Save cache to file ${fileName} success`);
    }

    await promisifiedWriteFile(metaFilePath, JSON.stringify({ lastCache: Date.now() }));
}

run()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });