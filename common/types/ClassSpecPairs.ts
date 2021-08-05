import { Class } from "../../common/types/Class";
import { Spec } from "./Spec";

export interface IClassSpecPair {
    className: Class;
    specName: Spec;
}

export const ClassSpecPairs: IClassSpecPair[] = [
    // monk
    { className: Class.monk, specName: Spec.mistweaver },
    { className: Class.monk, specName: Spec.brewmaster },
    { className: Class.monk, specName: Spec.windwalker },
    
    // demon_hunter
    { className: Class.demon_hunter, specName: Spec.havoc },
    { className: Class.demon_hunter, specName: Spec.vengeance },
    
    // death_knight
    { className: Class.death_knight, specName: Spec.blood, },
    { className: Class.death_knight, specName: Spec.frost, },
    { className: Class.death_knight, specName: Spec.unholy, },
    
    // druid
    { className: Class.druid, specName: Spec.balance, },
    { className: Class.druid, specName: Spec.feral, },
    { className: Class.druid, specName: Spec.guardian, },
    { className: Class.druid, specName: Spec.restoration, },
    
    // hunter
    { className: Class.hunter, specName: Spec.beast_mastery, },
    { className: Class.hunter, specName: Spec.marksmanship, },
    { className: Class.hunter, specName: Spec.survival, },
    
    // mage
    { className: Class.mage, specName: Spec.arcane, },
    { className: Class.mage, specName: Spec.fire, },
    { className: Class.mage, specName: Spec.frost, },
    
    // paladin
    { className: Class.paladin, specName: Spec.holy, },
    { className: Class.paladin, specName: Spec.protection, },
    { className: Class.paladin, specName: Spec.retribution, },
    
    // priest
    { className: Class.priest, specName: Spec.discipline, },
    { className: Class.priest, specName: Spec.holy, },
    { className: Class.priest, specName: Spec.shadow, },
    
    // rogue
    { className: Class.rogue, specName: Spec.assassination, },
    { className: Class.rogue, specName: Spec.outlaw, },
    { className: Class.rogue, specName: Spec.subtlety, },
    
    // shaman
    { className: Class.shaman, specName: Spec.elemental, },
    { className: Class.shaman, specName: Spec.enhancement, },
    { className: Class.shaman, specName: Spec.restoration, },
    
    // warlock
    { className: Class.warlock, specName: Spec.affliction, },
    { className: Class.warlock, specName: Spec.demonology, },
    { className: Class.warlock, specName: Spec.destruction, },
    
    // warrior
    { className: Class.warrior, specName: Spec.arms, },
    { className: Class.warrior, specName: Spec.fury, },
    { className: Class.warrior, specName: Spec.protection, },
];