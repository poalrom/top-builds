import { memoize } from "lodash";

const classSpecMap = {
    "demon-hunter": {
        classID: 12,
        havoc: 577,
        vengeance: 581,
    },
    "death-knight": {
        classID: 6,
        blood: 250,
        frost: 251,
        unholy: 252,
    },
    "druid": {
        classID: 11,
        balance: 102,
        feral: 103,
        guardian: 104,
        restoration: 105,
    },
    "hunter": {
        classID: 3,
        "beast-mastery": 253,
        marksmanship: 254,
        survival: 255,
    },
    "mage": {
        classID: 8,
        arcane: 62,
        fire: 63,
        frost: 64,
    },
    "monk": {
        classID: 10,
        mistweaver: 270,
        brewmaster: 268,
        windwalker: 269,
    },
    "paladin": {
        classID: 2,
        holy: 65,
        protection: 66,
        retribution: 70,
    },
    "priest": {
        classID: 5,
        discipline: 256,
        holy: 257,
        shadow: 258,
    },
    "rogue": {
        classID: 4,
        assassination: 259,
        outlaw: 260,
        subtlety: 261,
    },
    "shaman": {
        classID: 7,
        elemental: 262,
        enhancement: 263,
        restoration: 264,
    },
    "warlock": {
        classID: 9,
        affliction: 265,
        demonology: 266,
        destruction: 267,
    },
    "warrior": {
        classID: 1,
        arms: 71,
        fury: 72,
        protection: 73,
    },
};

export default memoize((className, specName) => {
    const classInfo = classSpecMap[className] || {};

    return {
        class: classInfo.classID,
        spec: classInfo[specName],
    }
});