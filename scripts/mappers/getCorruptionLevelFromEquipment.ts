import { ICharacterEquip } from "../interfaces/ICharacterEquip";

const CORRUPTION_TYPE = "CORRUPTION";

export function getCorruptionLevelFromEquipment(equipment: ICharacterEquip) {
    const corruptedItems = equipment.equipped_items
        .filter(item => item.stats && item.stats.some((stat) => stat.type.type === CORRUPTION_TYPE));

    const corruptionLevel = corruptedItems
        .reduce((acc, item) => {
            item.stats
                .forEach(({ type: { type }, value }) => {
                    if (type === CORRUPTION_TYPE) {
                        acc += value;
                    }
                });

            return acc;
        }, 0);

    return corruptionLevel;
}