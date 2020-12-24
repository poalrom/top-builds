<template>
    <div class="legendaries-tab">
        <div class="legendaries-tab__stats section">
            <h5 class="section__title">Usage frequency summary</h5>
            <Summarizer :items="legendaries" v-if="legendaries.length">
                Legendaries
            </Summarizer>
            <Summarizer
                :items="legendaryEffects"
                v-if="legendaryEffects.length"
                mode="spells"
            >
                Legendary effects
            </Summarizer>
        </div>
        <div class="section results">
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item results__item_type_legendary"
            >
                <CharName :char="char" :index="index"></CharName>
                <div class="legendaries-tab__row">
                    <ItemIcon :item="char.legendaries[0]" hideTitle></ItemIcon>
                    <p class="legendaries-tab__plus">+</p>
                    <SpellIcon :id="char.legendaries[0].spells[0]"></SpellIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ItemIcon from "../components/ItemIcon";
import SpellIcon from "../components/SpellIcon";
import CharName from "../components/CharName";
import Summarizer from "../components/Summarizer";
import chars from "../store/chars";

export default {
    components: {
        ItemIcon,
        SpellIcon,
        CharName,
        Summarizer,
    },
    computed: {
        chars: chars.get,
        legendaries() {
            return this.chars.map((char) => char.legendaries).flat();
        },
        legendaryEffects() {
            return this.chars.map((char) => char.legendaries[0].spells).flat();
        },
    },
};
</script>

<style>
.legendaries-tab__row {
    display: flex;
}
.legendaries-tab__plus {
    font-size: 32px;
    line-height: 48px;
    font-weight: bold;
    margin: 0;
}
</style>