<template>
    <a
        href="#"
        :data-wowhead="'spell=' + spellId"
        class="spell-icon"
        :class="{ disabled, 'spell-icon_statified': hasFrequency }"
        @mouseenter="setHoveredItem(spellName || spellId)"
        @mouseleave="setHoveredItem()"
    >
        <h6
            :class="{
                'frequent': frequencyRate > 0.7,
                'normal': 0.4 < frequencyRate && frequencyRate < 0.7
            }"
            v-if="hasFrequency"
        >x{{ frequency }}</h6>
    </a>
</template>

<script>
    import hoveredItem from "../store/hoveredItem";

    export default {
        props: {
            maxFrequency: {
                type: Number,
            },
            frequency: {
                type: Number,
            },
            spellName: {
                type: String,
            },
            spellId: {
                type: Number,
                required: true,
            },
        },
        methods: {
            setHoveredItem: hoveredItem.set,
        },
        computed: {
            hoveredItem: hoveredItem.get,
            frequencyRate() {
                return this.frequency / (this.maxFrequency || 1);
            },
            hasFrequency() {
                return this.frequency && this.maxFrequency;
            },
            disabled() {
                return (
                    this.hoveredItem &&
                    this.hoveredItem !== this.spellId &&
                    this.hoveredItem !== this.spellName
                );
            },
        },
    };
</script>

<style>
    .spell-icon {
        width: 44px;
        height: 44px;
        display: block;
        overflow: hidden;
    }

    .spell-icon:hover {
        text-decoration: none;
    }

    .spell-icon_statified {
        height: 64px;
        text-align: center;
        color: white;
    }

    .spell-icon .frequent {
        color: #f05a67;
    }

    .spell-icon .normal {
        color: #30a4dc;
    }
</style>