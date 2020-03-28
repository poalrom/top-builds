<template>
    <div class="section">
        <h5 class="unique-stats__title">Usage frequency summary</h5>
        <div v-if="statsMode === 'spells'" class="unique-stats__section">
            <div class="unique-stats__section-item">
                <SpellRow :spells="sortedEntities"></SpellRow>
            </div>
        </div>
        <div v-if="statsMode === 'items'" class="unique-stats__section">
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title">Rings</p>
                <ItemsRow :items="sortedRings"></ItemsRow>
            </div>
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title">Trinkets</p>
                <ItemsRow :items="sortedTrinkets"></ItemsRow>
            </div>
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title">Main hand</p>
                <ItemsRow :items="sortedMainHand"></ItemsRow>
            </div>
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title" v-if="sortedOffHand.length">Off hand</p>
                <ItemsRow :items="sortedOffHand" v-if="sortedOffHand.length"></ItemsRow>
            </div>
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
    import reverse from "lodash/fp/reverse";
    import compose from "lodash/fp/compose";
    import humanifySlotName from "../mappers/humanifySlotName";

    export default {
        components: { SpellRow, ItemsRow },
        methods: {
            sortItems(items) {
                return compose(
                    reverse,
                    sortBy(['freq', 'name', 'id']),
                )(items);
            },
        },
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
                return this.sortItems(this.groupedEntities["Finger"] || []);
            },
            sortedTrinkets() {
                return this.sortItems(this.groupedEntities["Trinket"] || []);
            },
            sortedMainHand() {
                return this.sortItems(this.groupedEntities["Main Hand"] || []);
            },
            sortedOffHand() {
                return this.sortItems(this.groupedEntities["Off Hand"] || []);
            },
        },
    };
</script>

<style lang='less'>
    .unique-stats__title {
        text-align: center;
    }

    .unique-stats__section-title {
        margin: 0 0 5px;
    }

    .unique-stats__section {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .unique-stats__section-item {
        background-color: #181818;
        padding: 10px 15px;
        margin: 0 5px 5px 0;
    }
</style>