<template>
    <div class="stats-tab">
        <div class="section">
            <h5 class="section__title">Stats frequency</h5>
            <div class="results">
                <div
                    v-for="(statsPriority, index) in statsPriorities"
                    :key="index"
                    class="results__item results__item_type_vertical-stats"
                >
                    <div class="results__item-content">
                        <p class="section__title">
                            {{ statsPriority.nth }} stat
                        </p>
                        <StatsRow
                            :stats="statsPriority.stats"
                            vertical
                        ></StatsRow>
                    </div>
                </div>
            </div>
        </div>
        <div class="section results">
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <CharName :char="char" :index="index"></CharName>
                <StatsRow :stats="char.offStats"></StatsRow>
            </div>
        </div>
    </div>
</template>

<script>
import startCase from "lodash/fp/startCase";
import StatsRow from "../components/StatsRow";
import CharName from "../components/CharName";
import chars from "../store/chars";

export default {
    components: {
        StatsRow,
        CharName,
    },
    methods: {
        nth(num) {
            return (
                num +
                (["st", "nd", "rd"][((((num + 90) % 100) - 10) % 10) - 1] ||
                    "th")
            );
        },
    },
    computed: {
        chars: chars.get,
        statsPriorities() {
            return this.chars
                .reduce((acc, { offStats: charStats }) => {
                    charStats.forEach((stat, i) => {
                        if (!acc[i]) {
                            acc[i] = {};
                        }
                        if (!acc[i][stat.title]) {
                            acc[i][stat.title] = 0;
                        }
                        acc[i][stat.title]++;
                    });
                    return acc;
                }, [])
                .map((stats, i) => {
                    return {
                        stats: Object.entries(stats)
                            .sort(
                                ([, freq1], [, freq2]) =>
                                    Math.max(freq2) - Math.max(freq1),
                            )
                            .map(([title, freq]) => ({
                                title:
                                    startCase(title) +
                                    ` (${freq}/${this.chars.length})`,
                            })),
                        nth: this.nth(i + 1),
                    };
                });
        },
    },
};
</script>