<template>
    <div
        class="stat-list"
    >
        <p class="stat-list__item" :key="'stat' + stat.title" v-for="stat in stats">
            <b class="stat-list__item-title">{{ humanify(stat.title) }}</b>
            <span class="stat-list__item-value">{{ stat.value }}</span>
            <i class="petalicon petalicon-chevron-right stat-list__item-icon"></i>
        </p>
    </div>
</template>

<script>
    import startCase from "lodash/fp/startCase";
    import statsToId from "../mappers/statsToId";

    export default {
        props: {
            stats: {
                type: Array,
                required: true,
            },
        },
        methods: {
            humanify(str) {
                return startCase(str);
            },
        },
        computed: {
            statsId() {
                return statsToId(this.stats);
            },
        },
    };
</script>

<style>
    .stats-lists {
        display: flex;
        flex-direction: column;
    }

    .stat-list {
        display: flex;
    }

    .stat-list:last-child .stat-list__item{
        margin-bottom: 0;
    }

    .stat-list__item {
        display: flex;
        flex-direction: column;
        padding-right: 30px;
        text-align: center;
        position: relative;
    }

    .stat-list__item:last-child {
        padding-right: 0;
    }

    .stat-list__item:last-child .stat-list__item-icon {
        display: none;
    }

    .stat-list__item-icon {
        position: absolute;
        right: 7px;
        top: 0;
    }
</style>