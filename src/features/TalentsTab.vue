<template>
    <div class="talents-tab">
        <div class="section">
            <h5 class="section__title">Main build</h5>
            <div class="results">
                <div
                    class="results__item"
                    v-for="talents in talentsByTier"
                    :key="talents[0].id"
                >
                    <Summarizer
                        mode="spells"
                        unwrapped
                        :limit="1"
                        :items="talents"
                    ></Summarizer>
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
                <SpellRow :spells="char.talents"></SpellRow>
            </div>
        </div>
    </div>
</template>

<script>
import SpellRow from "../components/SpellRow";
import Summarizer from "../components/Summarizer";
import CharName from "../components/CharName";
import chars from "../store/chars";

export default {
    components: {
        SpellRow,
        CharName,
        Summarizer,
    },
    computed: {
        chars: chars.get,
        talentsByTier() {
            return this.chars.reduce((acc, { talents }) => {
                talents.forEach((talent, i) => {
                    if (!acc[i]) {
                        acc[i] = [];
                    }
                    acc[i].push({ id: talent });
                });

                return acc;
            }, []);
        },
    },
};
</script>