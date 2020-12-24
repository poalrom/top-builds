<template>
    <div class="stats-tab">
        <div
            class="section results results_width_7"
        >
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <div class="results__item-content">
                    <CharName :char="char" :index="index"></CharName>
                    <SpellRow :spells="char.talents"></SpellRow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SpellRow from "../components/SpellRow";
    import CharName from "../components/CharName";
    import chars from "../store/chars";

    export default {
        components: {
            SpellRow,
            CharName,
        },
        computed: {
            chars: chars.get,
        },
    };
</script>