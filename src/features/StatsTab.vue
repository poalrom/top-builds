<template>
    <div class="stats-tab">
        <div
            class="section results results_width_stats"
        >
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <div class="results__item-content">
                    <CharName :char="char" :index="index"></CharName>
                    <StatsRow :stats="char.offStats"></StatsRow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import StatsRow from "../components/StatsRow";
    import CharName from "../components/CharName";
    import chars from "../store/chars";

    export default {
        components: {
            StatsRow,
            CharName,
        },
        computed: {
            chars: chars.get,
        },
    };
</script>