<template>
    <div class="section">
        <h5 class="unique-stats__title">Usage frequency summary</h5>
        <div v-if="statsMode === 'spells'" class="unique-stats__section">
            <div class="unique-stats__section-item">
                <SpellRow :spells="sortedEntities"></SpellRow>
            </div>
        </div>
        <div v-if="statsMode === 'essences'" class="unique-stats__section">
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title">Big essences</p>
                <SpellRow :spells="sortedBigEssences"></SpellRow>
            </div>
            <div class="unique-stats__section-item">
                <p class="unique-stats__section-title">Small essences</p>
                <SpellRow :spells="sortedSmallEssences"></SpellRow>
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
                switch (this.currentMode) {
                    case modes.items:
                        return "items";
                        break;
                    case modes.essences:
                        return "essences";
                        break;
                    default:
                        return "spells"
                        break;
                }
            },
            entities() {
                const entities = flatten(this.chars.map(get(this.currentMode)));
                const uniquedEntities = entities.reduce((acc, entity) => {
                    const entityKey = entity.name || entity.id || entity;

                    if (!acc[entityKey]) {
                        acc[entityKey] = {
                            id: entity.id || entity,
                            slot: entity.slot,
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

                return Object.values(uniquedEntities);
            },
            sortedEntities() {
                return sortBy(["freq"], this.entities);
            },
            groupedEntities() {
                return groupBy("slot", this.entities);
            },
            sortedBigEssences() {
                return this.sortItems(this.groupedEntities["BIG_ESSENCE"] || []);
            },
            sortedSmallEssences() {
                return this.sortItems(this.groupedEntities["SMALL_ESSENCE"] || []);
            },
            sortedRings() {
                const finger1 = this.groupedEntities["FINGER_1"] || [];
                const finger2 = this.groupedEntities["FINGER_2"] || [];
                return this.sortItems([...finger1, ...finger2]);
            },
            sortedTrinkets() {
                const trinket1 = this.groupedEntities["TRINKET_1"] || [];
                const trinket2 = this.groupedEntities["TRINKET_2"] || [];
                return this.sortItems([...trinket1, ...trinket2]);
            },
            sortedMainHand() {
                return this.sortItems(this.groupedEntities["MAIN_HAND"] || []);
            },
            sortedOffHand() {
                return this.sortItems(this.groupedEntities["OFF_HAND"] || []);
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