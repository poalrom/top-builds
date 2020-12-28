<template>
    <div class="covenants-row">
        <Soulbind
            v-for="soulbind in soulbinds"
            :key="soulbind.id"
            :covenant="soulbind.covenant"
            :soulbind="soulbind.soulbind"
            :freq="soulbind.freq"
        ></Soulbind>
    </div>
</template>

<script>
    import compose from 'lodash/fp/compose';
    import reverse from 'lodash/fp/reverse';
    import sortBy from 'lodash/fp/sortBy';
    import Soulbind from "./Soulbind";

    export default {
        components: { Soulbind },
        props: {
            soulbinds: {
                type: Array,
                required: true,
            },
        },
    };
</script>

<style>
    .covenants-row {
        display: flex;
        flex-wrap: wrap;
        grid-gap: 10px 10px;
    }
</style>