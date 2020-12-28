<template>
    <div class="covenants-tab">
        <div class="covenants-tab__stats section">
            <h5 class="section__title">Usage frequency summary</h5>
            <div class="covenants-tab__summarizers">
                <Summarizer :items="covenants" mode="covenants"
                    >Covenants</Summarizer
                >
                <Summarizer :items="potencyConduits">
                    Potenty conduits
                </Summarizer>
                <Summarizer :items="enduranceConduits">
                    Endurance conduits
                </Summarizer>
                <Summarizer :items="finesseConduits">
                    Finesse conduits
                </Summarizer>
            </div>
        </div>

        <div class="section results">
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <CharName :char="char" :index="index"></CharName>
                <div class="covenants-tab__char-info">
                    <Soulbind
                        :covenant="char.covenant.covenant"
                        :soulbind="char.covenant.soulbind"
                        hinted
                    ></Soulbind>
                    <template v-for="trait in char.covenant.traits">
                        <ItemIcon
                            hideTitle
                            :item="trait"
                            v-if="trait.type === 'item'"
                            :key="trait.id"
                        ></ItemIcon>
                        <SpellIcon
                            hideTitle
                            :id="trait.id"
                            v-if="trait.type === 'spell'"
                            :key="trait.id"
                        ></SpellIcon>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Summarizer from "../components/Summarizer";
import CharName from "../components/CharName";
import Soulbind from "../components/Soulbind";
import SpellIcon from "../components/SpellIcon";
import ItemIcon from "../components/ItemIcon";
import chars from "../store/chars";

export default {
    components: {
        Summarizer,
        CharName,
        Soulbind,
        SpellIcon,
        ItemIcon,
    },
    computed: {
        chars: chars.get,
        covenants() {
            return this.chars.map(({ covenant }) => ({
                ...covenant,
                id: covenant.covenant + covenant.soulbind,
            }));
        },
        conduits() {
            return this.chars.map(({ covenant }) => covenant.traits).flat();
        },
        potencyConduits() {
            return this.conduits.filter(
                ({ socketType }) => socketType === "POTENCY",
            );
        },
        enduranceConduits() {
            return this.conduits.filter(
                ({ socketType }) => socketType === "ENDURANCE",
            );
        },
        finesseConduits() {
            return this.conduits.filter(
                ({ socketType }) => socketType === "FINESSE",
            );
        },
    },
};
</script>

<style>
.covenants-tab__summarizers {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 10px 15px;
}

.covenants-tab__char-info {
    display: flex;
    flex-wrap: wrap;
}
</style>