<template>
    <div class="section">
        <h6>Usage frequency summary</h6>
        <SpellRow
            v-if="statsMode === 'spells'"
            :spells="sortedEntities"
            :maxFrequency="maxFrequency"
        ></SpellRow>
        <div v-if="statsMode === 'items'">
            <p class="unique-stats__title">Rings</p>
            <ItemsRow :items="sortedRings"></ItemsRow>
            <p class="unique-stats__title">Trinkets</p>
            <ItemsRow :items="sortedTrinkets"></ItemsRow>
            <p class="unique-stats__title">Main hand</p>
            <ItemsRow :items="sortedMainHand"></ItemsRow>
            <p class="unique-stats__title" v-if="sortedOffHand.length">Off hand</p>
            <ItemsRow :items="sortedOffHand" v-if="sortedOffHand.length"></ItemsRow>
        </div>
    </div>
</template>

<script>
    import modes from "../Modes";
    import SpellRow from "./SpellRow";
    import ItemsRow from "./ItemsRow";
    import get from "lodash/fp/get";
    import sortBy from "lodash/fp/sortBy";
    import currentMode from "../store/currentMode";
    import chars from "../store/chars";
    import flatten from "lodash/fp/flatten";
    import groupBy from "lodash/fp/groupBy";
    import humanifySlotName from "../mappers/humanifySlotName";

    export default {
        components: { SpellRow, ItemsRow },
        computed: {
            currentMode: currentMode.get,
            chars: chars.get,
            statsMode() {
                return this.currentMode === modes.items ? "items" : "spells";
            },
            entities() {
                const entities = flatten(this.chars.map(get(this.currentMode)));
                const groupedEntities = entities.reduce((acc, entity) => {
                    const entityKey = entity.name || entity.id || entity;

                    if (!acc[entityKey]) {
                        acc[entityKey] = {
                            id: entity.id || entity,
                            slot: humanifySlotName(entity.slot),
                            ilvl: entity.ilvl,
                            name: entity.name,
                            freq: 0,
                        };
                    }

                    acc[entityKey].freq += entity.freq || 1;

                    if (entity.ilvl && entity.ilvl > acc[entityKey].ilvl) {
                        acc[entityKey].ilvl = entity.ilvl;
                    }

                    return acc;
                }, {});

                return Object.values(groupedEntities);
            },
            sortedEntities() {
                return sortBy(["freq"], this.entities);
            },
            groupedEntities() {
                return groupBy("slot", this.entities);
            },
            sortedRings() {
                return sortBy(["freq"], this.groupedEntities['Finger'] || []);
            },
            sortedTrinkets() {
                return sortBy(["freq"], this.groupedEntities['Trinket'] || []);
            },
            sortedMainHand() {
                return sortBy(["freq"], this.groupedEntities['Main Hand'] || []);
            },
            sortedOffHand() {
                return sortBy(["freq"], this.groupedEntities['Off Hand'] || []);
            },
            maxFrequency() {
                return this.sortedEntities.reduce((acc, { freq }) => acc + freq, 0);
            },
        },
    };
</script>

<style lang='less'>
    .unique-stats__title {
        margin: 10px 0 5px;
    }
</style>