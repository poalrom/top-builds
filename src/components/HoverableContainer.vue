<template>
    <div
        :class="{ ['hoverable-containter_id_' + id]: id, 'hoverable-containter_enabled': id }"
        :style="style"
    >
        <slot></slot>
    </div>
</template>

<script>
    import hoveredItem from "../store/hoveredItem";

    export default {
        props: {
            ids: {
                type: Array,
            },
        },
        computed: {
            hoveredItem: hoveredItem.get,
            id() {
                return this.hoveredItem.id || ''
            },
            style() {
                return {
                    '--': ''
                };
            },
        },
    };
</script>

<style lang="less">
    @import '../styles/disabled.less';

    .hoverable-containter_enabled .hoverable-item:not(.hoverable-item_enabled) {
        .disabled;
    }
</style>