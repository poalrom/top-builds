<template>
    <div class="summarizer">
        <div class="item-stats" v-if="!unwrapped">
            <p class="item-stats__title"><slot></slot></p>
            <ItemsRow v-if="mode === 'items'" :items="itemsStats"></ItemsRow>
            <SpellRow v-if="mode === 'spells'" :spells="itemsStats"></SpellRow>
        </div>
        <ItemsRow v-else-if="mode === 'items'" :items="itemsStats"></ItemsRow>
        <SpellRow v-else :spells="itemsStats"></SpellRow>
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

const SUMMARIZER_TYPE = {
    items: "items",
    spells: "spells",
};

export default {
    components: { SpellRow, ItemsRow },
    props: {
        items: {
            type: Array,
            required: true,
        },
        mode: {
            type: String,
            default: SUMMARIZER_TYPE.items,
            validator: (val) => Object.values(SUMMARIZER_TYPE).includes(val),
        },
        unwrapped: {
            type: Boolean,
        },
        limit: {
            type: Number,
        },
    },
    computed: {
        itemsStats() {
            const limit = this.limit || this.items.length;

            return Object.values(
                this.items.reduce((acc, charItems) => {
                    if (!Array.isArray(charItems)) {
                        charItems = [charItems];
                    }
                    for (const item of charItems) {
                        const itemIsID = typeof item !== 'object';
                        const id = itemIsID ? item : item.id;
                        if (!acc[id]) {
                            acc[id] = itemIsID ? { id } : { ...item };
                        }
                        if (item.ilvl && acc[id].ilvl < item.ilvl) {
                            acc[id].ilvl = item.ilvl;
                        }
                        acc[id].freq = (acc[id].freq || 0) + 1;
                    }

                    return acc;
                }, {}),
            )
                .sort((a, b) => b.freq - a.freq)
                .slice(0, limit);
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