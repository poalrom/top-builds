<template>
    <HoverableItem :ids="[item.id]">
        <a
            href="#"
            :data-wowhead="wowheadData"
            @click="click"
            class="item-icon"
            :class="{ 'item-icon_statified': item.freq }"
        >
            <strong class="item-icon__title">
                {{item.freq ? 'x' + item.freq : humanifiedSlot}}
            </strong>
        </a>
    </HoverableItem>
</template>

<script>
    import startCase from "lodash/fp/startCase";
    import humanifySlotName from '../mappers/humanifySlotName';
    import HoverableItem from './HoverableItem';

    export default {
        components: {
            HoverableItem,
        },
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        methods: {
            click(e) {
                e.preventDefault();
            },
        },
        computed: {
            humanifiedSlot() {
                return humanifySlotName(this.item.slot);
            },
            wowheadData() {
                return [
                    "item=" + this.item.id,
                    "ilvl=" + this.item.ilvl,
                    this.item.enchantments &&
                        "ench=" + this.item.enchantments.join(":"),
                    this.item.sockets && "gems=" + this.item.sockets.join(":"),
                ].join("&");
            },
        },
    };
</script>

<style>
    .item-icon {
        height: 85px;
        width: 60px;
        text-align: center;
        display: block;
        overflow: hidden;
    }

    .item-icon_statified {
        width: 44px;
        height: 64px;
    }

    .item-icon__title {
        /* Overwrite wowhead styles =( */
        color: white !important;
    }
</style>