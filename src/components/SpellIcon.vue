<template>
    <HoverableItem :ids="[spellName, spellId]">
        <a
            href="#"
            :data-wowhead="'spell=' + spellId"
            @click="click"
            class="spell-icon"
            :class="{ 'spell-icon_statified': hasFrequency }"
        >
            <h6
                :class="{
                    'frequent': frequencyRate > 0.7,
                    'normal': 0.4 < frequencyRate && frequencyRate < 0.7
                }"
                v-if="hasFrequency"
            >x{{ frequency }}</h6>
        </a>
    </HoverableItem>
</template>

<script>
    import HoverableItem from './HoverableItem';

    export default {
        components: {
            HoverableItem,
        },
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
            click(e) {
                e.preventDefault();
            },
        },
        computed: {
            frequencyRate() {
                return this.maxFrequency ? this.frequency / this.maxFrequency : 0;
            },
            hasFrequency() {
                return this.frequency;
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