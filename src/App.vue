<template>
    <div class="app">
        <form class="section form-inline controls" @submit="filter">
            <Select
                :value="className"
                :options="classes"
                @change="setClassName($event)"
                :className="'controls__item'"
            >Select class</Select>
            <Select
                :value="specName"
                :options="specs"
                @change="setSpecName($event)"
                :className="'controls__item'"
            >Select spec</Select>
            <button class="btn controls__item">Show</button>
        </form>
        <div class="section controls">
            <ModeButton
                v-for="modeName in modes"
                :key="modeName"
                :modeName="modeName"
                class="controls__item"
            ></ModeButton>
        </div>
        <ProgressBar
            v-if="chars.length > 0"
            :value="hoveredSpellFrequency"
            :maxValue="chars.length"
        >
            Hover a
            <span v-if="currentMode !== modes.stats">spell</span>
            <span v-if="currentMode === modes.stats">statistic's priority</span> to see it's frequency
        </ProgressBar>

        <UniqueStats
            v-if="[modes.items,
                modes.essences,
                modes.azeritePowers,
                modes.corrupts
            ].includes(currentMode)"
        ></UniqueStats>
        <div class="section loader" v-show="$store.isLoading('chars')">
            <span class="spinner spinning big">
                <span></span>
            </span>
            Fetching characters statistics
        </div>
        <div
            class="section results"
            v-if="$store.loaded('chars')"
            :class="'results_width_' + resultWidth"
        >
            <div
                v-for="(char, index) in chars"
                :key="char.name + char.realm.name"
                class="results__item"
            >
                <div class="results__item-content">
                    <CharName :char="char" :index="index"></CharName>
                    <p v-if="currentMode === modes.corrupts">{{ char.corruptionLevel }} corruption</p>
                    <div v-show="currentMode === modes.stats" class="stats-lists">
                        <StatsRow :stats="char.mainStats"></StatsRow>
                        <StatsRow :stats="char.offStats"></StatsRow>
                        <StatsRow :stats="char.defStats"></StatsRow>
                    </div>
                    <SpellRow v-show="currentMode === modes.talents" :spells="char.talents"></SpellRow>
                    <ItemsRow v-show="currentMode === modes.items" :items="char.items"></ItemsRow>
                    <SpellRow v-show="currentMode === modes.essences" :spells="char.essences"></SpellRow>
                    <SpellRow
                        v-show="currentMode === modes.azeritePowers"
                        :spells="char.azeritePowers"
                        :maxFrequency="3"
                    ></SpellRow>
                    <SpellRow
                        v-show="currentMode === modes.corrupts"
                        :spells="char.corrupts"
                        :maxFrequency="3"
                    ></SpellRow>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import compose from "lodash/fp/compose";
    import get from "lodash/fp/get";
    import startCase from "lodash/fp/startCase";
    import SpellRow from "./components/SpellRow";
    import ItemsRow from "./components/ItemsRow";
    import StatsRow from "./components/StatsRow";
    import Select from "./components/Select";
    import ModeButton from "./components/ModeButton";
    import ProgressBar from "./components/ProgressBar";
    import CharName from "./components/CharName";
    import UniqueStats from "./components/UniqueStats";
    import URL from "./URL";
    import modes from "./Modes";
    import className from "./store/className";
    import specName from "./store/specName";
    import hoveredItem from "./store/hoveredItem";
    import currentMode from "./store/currentMode";
    import chars from "./store/chars";
    import statsToId from "./mappers/statsToId";

    export default {
        components: {
            SpellRow,
            StatsRow,
            Select,
            ProgressBar,
            ModeButton,
            CharName,
            ItemsRow,
            UniqueStats,
        },
        methods: {
            startCase,
            setClassName: className.set,
            setSpecName: specName.set,
            filter(e) {
                if (e) {
                    e.preventDefault();
                    this.$store.storeToURL();
                }

                if (!this.className || !this.specName) {
                    return;
                }

                return this.$store.fetch(
                    "chars",
                    `./data/${this.className}-${this.specName}.json`,
                    {
                        response(res) {
                            console.log(res);
                            return res.body.players;
                        },
                    },
                );
            },
            onChangeState(paramsChanged) {
                this.$store.fillStoreFromURL();
                if (paramsChanged) {
                    this.filter();
                }
            },
            hideLoader() {
                const appLoader = document.querySelector(".app-loader");
                if (appLoader) {
                    appLoader.classList.add("hidden");
                }
            },
            initWowHead() {
                const wowheadLinks = Array.from(
                    this.$el.querySelectorAll("[data-wowhead]"),
                ).filter(link => !link.attributes["data-wh-icon-added"]);
                if (wowheadLinks.length) {
                    try {
                        $WowheadPower.init();
                    } catch (e) {
                        console.error(e);
                    }
                }
            },
        },
        computed: {
            className: className.get,
            specName: specName.get,
            currentMode: currentMode.get,
            chars: chars.get,
            hoveredItem: hoveredItem.get,
            resultWidth() {
                if ([modes.stats, modes.items].includes(this.currentMode)) {
                    return this.currentMode;
                }

                return Math.max(
                    ...this.chars.map(
                        compose(Number, get("length"), get(this.currentMode)),
                    ),
                );
            },
            classes() {
                if (!this.$store.isSuccess("classes")) {
                    return [];
                }

                return this.$store.get("classes").map(get("className"));
            },
            specs() {
                if (!this.className) {
                    return [];
                }

                const currentClass = this.$store
                    .get("classes")
                    .find(c => c.className === this.className);

                return currentClass ? currentClass.specs || [] : [];
            },
            modes() {
                return modes;
            },
            hoveredSpellFrequency() {
                if (!this.$store.isSuccess("chars")) {
                    return;
                }
                let charsUseSpells = [];
                if (
                    [modes.azeritePowers, modes.corrupts].includes(this.currentMode)
                ) {
                    charsUseSpells = this.chars.map(char =>
                        char[this.currentMode].some(
                            power => power.name === this.hoveredItem,
                        ),
                    );
                }

                if ([modes.talents, modes.essences].includes(this.currentMode)) {
                    charsUseSpells = this.chars.map(char =>
                        char[this.currentMode].includes(this.hoveredItem),
                    );
                }

                if (this.currentMode === modes.stats) {
                    charsUseSpells = this.chars.map(
                        char =>
                            statsToId(char.mainStats) === this.hoveredItem ||
                            statsToId(char.offStats) === this.hoveredItem ||
                            statsToId(char.defStats) === this.hoveredItem,
                    );
                }

                if (this.currentMode === modes.items) {
                    charsUseSpells = this.chars.map(char =>
                        char.items.map(get("id")).includes(this.hoveredItem),
                    );
                }

                return charsUseSpells.reduce((acc, i) => {
                    if (i) {
                        acc++;
                    }

                    return acc;
                }, 0);
            },
        },
        beforeMount() {
            URL.onPopState(this.onChangeState.bind(this));
            this.$store.fetch("classes", "./data/classes.json").then(() => {
                this.hideLoader();
                this.$store.fillStoreFromURL();
                this.filter();
            });
        },
        mounted() {
            this.initWowHead();
        },
        updated() {
            this.initWowHead();
        },
    };
</script>

<style type="less">
    @import "~../node_modules/petal.less/less/basic";
    @import "~../node_modules/petal.less/less/buttons";
    @import "~../node_modules/petal.less/less/typography";
    @import "~../node_modules/petal.less/less/forms";
    @import "~../node_modules/petal.less/less/progress";
    @import "~../node_modules/petal.less/less/petalicon";
    @import "./styles/index";
</style>