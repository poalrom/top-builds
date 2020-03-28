<template>
    <div class="item-row">
        <ItemIcon
            v-for="item in items"
            :key="'item' + item.id + item.slot"
            :item="item"
        ></ItemIcon>
    </div>
</template>

<script>
    import compose from 'lodash/fp/compose';
    import reverse from 'lodash/fp/reverse';
    import sortBy from 'lodash/fp/sortBy';
    import ItemIcon from "./ItemIcon";

    export default {
        components: { ItemIcon },
        props: {
            items: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style>
    .item-row {
        display: flex;
        flex-wrap: wrap;
    }
</style>