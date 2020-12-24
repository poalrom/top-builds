<template>
    <div class="talents-tab">
        <div class="section">
            <h5 class="section__title">Main build</h5>
            <div class="results">
                <div class="results__item">
                    <div class="results__item-content">
                        <SpellRow :spells="mainBuild" alreadySorted></SpellRow>
                    </div>
                </div>
            </div>
        </div>
        <div class="section results results_width_7">
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
        mainBuild() {
            return this.chars
                .reduce((acc, { talents }) => {
                    talents.forEach((talent, i) => {
                        if (!acc[i]) {
                            acc[i] = {};
                        }
                        if (!acc[i][talent]) {
                            acc[i][talent] = 0;
                        }
                        acc[i][talent]++;
                    });

                    return acc;
                }, [])
                .map((talentRow) => {
                    const [talentID, freq] = Object.entries(talentRow).sort(
                        ([, freq1], [, freq2]) => freq2 - freq1,
                    )[0];

                    return {
                        id: Number(talentID),
                        freq,
                    };
                });
        },
    },
};
</script>