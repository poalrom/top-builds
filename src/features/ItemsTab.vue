<template>
    <div class="items-tab">
        <div class="items-tab__stats section">
            <h5 class="section__title">Usage frequency summary</h5>
            <Summarizer :items="rings">Rings</Summarizer>
            <Summarizer :items="trinkets">Trinkets</Summarizer>
            <Summarizer :items="mainHand" v-if="mainHand.length">Main hand</Summarizer>
            <Summarizer :items="offHand" v-if="offHand.length">Off hand</Summarizer>
            <Summarizer :items="legendaries" v-if="legendaries.length">Legendaries</Summarizer>
        </div>
        <div
            class="section results results_width_items"
        >
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <div class="results__item-content">
                    <CharName :char="char" :index="index"></CharName>
                    <ItemsRow :items="char.items"></ItemsRow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ItemsRow from "../components/ItemsRow";
    import CharName from "../components/CharName";
    import Summarizer from "../components/Summarizer";
    import chars from "../store/chars";

    export default {
        components: {
            ItemsRow,
            CharName,
            Summarizer,
        },
        methods: {
            getItems(slots) {
                return this.chars.map((char) => char.items.filter(item => slots.includes(item.slot)))
            }
        },
        computed: {
            chars: chars.get,
            rings() {
                return this.getItems(['FINGER_1', 'FINGER_2']);
            },
            trinkets() {
                return this.getItems(['TRINKET_1', 'TRINKET_2']);
            },
            mainHand() {
                return this.getItems(['MAIN_HAND']);
            },
            offHand() {
                return this.getItems(['OFF_HAND']);
            },
            legendaries() {
                return this.getItems(['LEGENDARY']);
            },
        },
    };
</script>