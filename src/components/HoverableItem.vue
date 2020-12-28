<template>
    <span
        @click="click"
        @mouseenter="mouseEnter"
        @mouseleave="mouseLeave"
        class="hoverable-item"
        :class="{ 'hoverable-item_enabled': enabled }"
    >
        <slot></slot>
    </span>
</template>

<script>
    import hoveredItem from "../store/hoveredItem";

    export default {
        props: {
            id: {
                type: Number,
            },
        },
        methods: {
            setHoveredItem: hoveredItem.set,
            mouseEnter() {
                if (!this.hoveredItem.permanent) {
                    this.setHoveredItem({ id: this.id });
                }
            },
            mouseLeave() {
                if (!this.hoveredItem.permanent) {
                    this.setHoveredItem({});
                }
            },
            click(e) {
                e.preventDefault();
                e.setHoveredItem = true;
                if (this.hoveredItem.id === this.id && this.hoveredItem.permanent) {
                    this.setHoveredItem({});
                } else {
                    this.setHoveredItem({ id: this.id, permanent: true });
                }
                
            },
        },
        computed: {
            hoveredItem: hoveredItem.get,
            enabled() {
                return this.id === this.hoveredItem.id;
            }
        },
    };
</script>

<style>
.hoverable-item {
    display: block;
}
</style>