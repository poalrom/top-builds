<template>
    <div class="stat-list" :class="{ 'stat-list_vertical': vertical }">
        <p
            class="stat-list__item"
            :key="'stat' + stat.title"
            v-for="stat in stats"
        >
            <b class="stat-list__item-title">{{ stat.title }}</b>
            <span class="stat-list__item-value" v-show="stat.value">{{
                stat.value
            }}</span>
            <i
                class="petalicon stat-list__item-icon"
                :class="{
                    'petalicon-chevron-right': !vertical,
                    'petalicon-chevron-down': vertical,
                }"
            ></i>
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
        vertical: {
            type: Boolean,
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
.stat-list {
    display: flex;
}

.stat-list:last-child .stat-list__item {
    margin-bottom: 0;
}

.stat-list__item {
    display: flex;
    flex-direction: column;
    padding-right: 30px;
    text-align: center;
    position: relative;
}

.stat-list__item:last-child .stat-list__item-icon {
    display: none;
}

.stat-list__item-icon {
    position: absolute;
    right: 7px;
    top: 0;
}

.stat-list_vertical {
    flex-direction: column;
}

.stat-list_vertical .stat-list__item {
    padding-right: 0;
    padding-bottom: 30px;
}

.stat-list_vertical .stat-list__item-icon {
    right: calc(50% - 8px);
    bottom: 0;
    top: auto;
}

.stat-list__item:last-child {
    padding-right: 0;
    padding-bottom: 0;
}

.stat-list__item {
    text-transform: capitalize;
}
</style>