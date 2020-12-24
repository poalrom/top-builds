<template>
    <div class="item-stats">
        <p class="item-stats__title"><slot></slot></p>
        <ItemsRow :items="itemsStats"></ItemsRow>
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
    import humanifySlotName from '../mappers/humanifySlotName';

    export default {
        components: { SpellRow, ItemsRow },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
        computed: {
            itemsStats() {
                return Object.values(this.items.reduce((acc, charItems) => {
                    for (const item of charItems) {
                        if (!acc[item.id]) {
                            acc[item.id] = { ...item };
                        }
                        if (acc[item.id].ilvl < item.ilvl) {
                            acc[item.id].ilvl = item.ilvl;
                        }
                        acc[item.id].freq = (acc[item.id].freq || 0) + 1;
                    }

                    return acc;
                }, {})).sort((a, b) => b.freq - a.freq);
            },
        },
    };
</script>

<style lang='less'>
    .item-stats {
        background-color: #181818;
        padding: 10px 15px;
        margin: 0 5px 5px 0;
    }

    .item-stats__title {
        margin: 0 0 5px;
    }
</style>