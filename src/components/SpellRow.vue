<template>
    <div class="spell-row">
        <SpellIcon
            v-for="spell in spells"
            :key="getSpellId(spell)"
            :id="getSpellId(spell)"
            :freq="spell.freq"
        ></SpellIcon>
    </div>
</template>

<script>
import SpellIcon from "./SpellIcon";

export default {
    components: { SpellIcon },
    props: {
        spells: {
            type: Array,
            required: true,
        },
    },
    methods: {
        getSpellId(spell) {
            return typeof spell === "number" ? spell : spell.id;
        },
        getSpellName(spell) {
            if (typeof spell === "number") {
                return;
            }
            if (spell.slot) {
                return (spell.name || spell.id) + spell.slot;
            }
            return String(spell.name || spell.id);
        },
    },
};
</script>

<style>
.spell-row {
    display: flex;
    flex-wrap: wrap;
}
</style>