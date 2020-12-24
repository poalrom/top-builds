<template>
    <div class="app" @click="click">
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

        <div class="section loader" v-show="$store.isLoading('chars')">
            <span class="spinner spinning big">
                <span></span>
            </span>
            Fetching characters statistics
        </div>

        <HoverableContainer v-if="$store.loaded('chars')">
            <StatsTab v-show="currentMode === modes.stats"></StatsTab>
            <TalentsTab v-show="currentMode === modes.talents"></TalentsTab>
            <ItemsTab v-show="currentMode === modes.items"></ItemsTab>
        </HoverableContainer>

        
        <ProgressBar
            v-if="chars.length > 0"
            :value="hoveredSpellFrequency"
            :maxValue="chars.length"
        >
            <span v-if="currentMode === modes.talents">Hover a talent to&nbsp;see&nbsp;it's&nbsp;frequency</span>
            <span v-if="currentMode === modes.items">Hover an item to&nbsp;see&nbsp;it's&nbsp;frequency</span>
            <span v-if="currentMode === modes.stats">Frequent&nbsp;stats&nbsp;priority diplayed on&nbsp;top of&nbsp;the&nbsp;characters&nbsp;list</span>
        </ProgressBar>
    </div>
</template>

<script>
    import compose from "lodash/fp/compose";
    import get from "lodash/fp/get";
    import startCase from "lodash/fp/startCase";
    import ItemsTab from "./features/ItemsTab";
    import StatsTab from "./features/StatsTab";
    import TalentsTab from "./features/TalentsTab";
    import CovenantsTab from "./features/CovenantsTab";
    import Select from "./components/Select";
    import HoverableContainer from "./components/HoverableContainer";
    import ModeButton from "./components/ModeButton";
    import ProgressBar from "./components/ProgressBar";
    import CharName from "./components/CharName";
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
            StatsTab,
            Select,
            ProgressBar,
            ModeButton,
            CharName,
            ItemsTab,
            TalentsTab,
            HoverableContainer,
        },
        methods: {
            startCase,
            setClassName: className.set,
            setSpecName: specName.set,
            setHoveredItem: hoveredItem.set,
            click(e) {
                if (!e.setHoveredItem) {
                    this.setHoveredItem({});
                }
            },
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
                        console.warn(e);
                        setTimeout(this.initWowHead.bind(this), 2000);
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

                if (this.currentMode === modes.talents) {
                    charsUseSpells = this.chars.map(char =>
                        char[this.currentMode].includes(this.hoveredItem.id),
                    );
                }

                if (this.currentMode === modes.items) {
                    charsUseSpells = this.chars.map(char =>
                        char.items.map(get("id")).includes(this.hoveredItem.id),
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