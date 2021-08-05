require("dotenv").config();
import fs from "fs";
import path from "path";
import { promisify } from "util";


import { config } from "./config";
import { getCharactersInfo } from "./controllers/getCharactersInfo";
import { initWowClient } from "./services/wow";
import { initRaiderIO, raiderIO } from "./services/raiderIO";
import { ClassSpecPairs } from "../common/types/ClassSpecPairs";
import { Region } from "../common/types/Region";


const promisifiedWriteFile = promisify(fs.writeFile);

async function run() {
    const metaFilePath = path.resolve(__dirname, "../../public/data/meta.json");
    const classesFilePath = path.resolve(__dirname, "../../public/data/classes.json");

    const groupedClassSpecPairs = ClassSpecPairs.reduce((acc, { className, specName }) => {
        const classGroup = acc.get(className);

        if (classGroup) {
            classGroup.specs.push(specName);
        } else {
            acc.set(className, { className, specs: [specName] })
        }

        return acc;
    }, new Map());

    await promisifiedWriteFile(
        classesFilePath,
        JSON.stringify(Array.from(groupedClassSpecPairs.values()))
    );

    const classSpecPairsForLoad = ClassSpecPairs.slice(
        config.classSpecRange.from,
        config.classSpecRange.to
    );
    const season = await raiderIO.getCurrentSeasonSlug();

    for (const classSpec of classSpecPairsForLoad) {
        const fileName = `${classSpec.className}-${classSpec.specName}.json`;
        const classSpecCache = await getCharactersInfo(season, classSpec);

        console.log(`Save cache to file ${fileName}`);

        await promisifiedWriteFile(
            path.resolve(__dirname, `../../public/data/${fileName}`),
            JSON.stringify(classSpecCache)
        );

        console.log(`Save cache to file ${fileName} success`);
    }

    await promisifiedWriteFile(metaFilePath, JSON.stringify({ lastCache: Date.now() }));
}

initWowClient(Region.eu, config.BNET_ID, config.BNET_SECRET)
    .then(() => initRaiderIO(Region.eu))
    .then(run)
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });