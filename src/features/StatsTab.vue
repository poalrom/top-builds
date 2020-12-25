<template>
    <div class="stats-tab">
        <div class="section">
            <h5 class="section__title">Stats frequency</h5>
            <div class="results">
                <div
                    v-for="(statsPriority, index) in statsPriorities"
                    :key="index"
                    class="results__item"
                >
                    <p class="section__title">
                        {{ statsPriority.nth }} stats priority ({{
                            statsPriority.freq
                        }}/{{ chars.length }})
                    </p>
                    <StatsRow :stats="statsPriority.stats"></StatsRow>
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
import median from "../mappers/median";

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
            return Object.values(
                this.chars.reduce((acc, { offStats: charStats }) => {
                    const statsOrder = charStats.map((stat) => stat.title);
                    const key = statsOrder.join();

                    if (!acc[key]) {
                        acc[key] = {
                            order: statsOrder,
                            values: [[], [], [], []],
                            freq: 0,
                        };
                    }

                    acc[key].freq++;

                    charStats.forEach((stat, i) =>
                        acc[key].values[i].push(stat.value),
                    );

                    return acc;
                }, {}),
            )
                .filter((a) => a.freq > 1)
                .sort((a, b) => b.freq - a.freq)
                .map((stats, i) => {
                    return {
                        stats: stats.order.map((title, i) => ({
                            title,
                            value: median(stats.values[i]),
                        })),
                        nth: this.nth(i + 1),
                        freq: stats.freq,
                    };
                });
        },
    },
};
</script>