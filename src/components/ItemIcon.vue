<template>
    <a
        href="#"
        :data-wowhead="wowheadData"
        @click="click"
        class="item-icon"
        :class="{ disabled }"
        @mouseenter="setHoveredItem(item.id)"
        @mouseleave="setHoveredItem()"
    >
        <strong class="item-icon__title">{{humanifiedSlot}}</strong>
    </a>
</template>

<script>
    import hoveredItem from "../store/hoveredItem";
    import startCase from "lodash/fp/startCase";

    export default {
        props: {
            item: {
                type: Object,
                required: true,
            },
        },
        methods: {
            setHoveredItem: hoveredItem.set,
            click(e) {
                e.preventDefault();
            },
        },
        computed: {
            humanifiedSlot() {
                return startCase(this.item.slot.replace(/(\d)/g, "").toLowerCase());
            },
            hoveredItem: hoveredItem.get,
            wowheadData() {
                return [
                    "item=" + this.item.id,
                    "ilvl=" + this.item.ilvl,
                    this.item.enchantments &&
                        "ench=" + this.item.enchantments.join(":"),
                    this.item.sockets && "gems=" + this.item.sockets.join(":"),
                ].join("&");
            },
            disabled() {
                return this.hoveredItem && this.hoveredItem !== this.item.id;
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

    .item-icon__title {
        /* Overwrite wowhead styles */
        color: white !important;
    }
</style>