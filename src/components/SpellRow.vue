<template>
    <div class="spell-row">
        <SpellIcon
            v-for="spell in sortedSpells"
            :key="'spell' + getSpellId(spell)"
            :spellName="getSpellName(spell)"
            :spellId="getSpellId(spell)"
            :frequency="spell.freq"
            :maxFrequency="maxFrequency"
        ></SpellIcon>
    </div>
</template>

<script>
    import compose from 'lodash/fp/compose';
    import reverse from 'lodash/fp/reverse';
    import sortBy from 'lodash/fp/sortBy';
    import SpellIcon from "./SpellIcon";

    export default {
        components: { SpellIcon },
        props: {
            spells: {
                type: Array,
                required: true,
            },
            maxFrequency: {
                type: Number,
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
                return spell.name || spell.id;
            },
        },
        computed: {
            sortedSpells() {
                if (!this.spells[0] || !this.spells[0].freq) {
                    return this.spells;
                }

                return compose(
                    reverse,
                    sortBy(['freq', 'name', 'id']),
                )(this.spells);
            }
        }
    };
</script>

<style>
    .spell-row {
        display: flex;
        flex-wrap: wrap;
    }
</style>