import { Class } from "./Class";
import { Spec } from "./Spec";
import { IRioFilter } from "./IRioFilter";

export const ClassesWithSpecs = [
    {
        className: Class.monk,
        specs: [
            Spec.mistweaver,
            Spec.brewmaster,
            Spec.windwalker,
        ],
    },
    {
        className: Class.demon_hunter,
        specs: [
            Spec.havoc,
            Spec.vengeance,
        ],
    },
    {
        className: Class.death_knight,
        specs: [
            Spec.blood,
            Spec.frost,
            Spec.unholy,
        ],
    },
    {
        className: Class.druid,
        specs: [
            Spec.balance,
            Spec.feral,
            Spec.guardian,
            Spec.restoration,
        ],
    },
    {
        className: Class.hunter,
        specs: [
            Spec.beast_mastery,
            Spec.marksmanship,
            Spec.survival,
        ],
    },
    {
        className: Class.mage,
        specs: [
            Spec.arcane,
            Spec.fire,
            Spec.frost,
        ],
    },
    {
        className: Class.paladin,
        specs: [
            Spec.holy,
            Spec.protection,
            Spec.retribution,
        ],
    },
    {
        className: Class.priest,
        specs: [
            Spec.discipline,
            Spec.holy,
            Spec.shadow,
        ],
    },
    {
        className: Class.rogue,
        specs: [
            Spec.assassination,
            Spec.outlaw,
            Spec.subtlety,
        ],
    },
    {
        className: Class.shaman,
        specs: [
            Spec.elemental,
            Spec.enhancement,
            Spec.restoration,
        ],
    },
    {
        className: Class.warlock,
        specs: [
            Spec.affliction,
            Spec.demonology,
            Spec.destruction,
        ],
    },
    {
        className: Class.warrior,
        specs: [
            Spec.arms,
            Spec.fury,
            Spec.protection,
        ],
    },
];

export function getClassSpecPairs(): IRioFilter[] {
    return ClassesWithSpecs
        .reduce((acc, classInfo) => {
            for (const spec of classInfo.specs) {
                acc.push({
                    className: classInfo.className,
                    spec,
                });
            }

            return acc;
        }, [] as IRioFilter[]);
}