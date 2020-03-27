<template>
    <div class="progress">
        <div class="progress__row">
            <div class="progress__bar" :style="{ 'flex-basis': (frequency || 1) * 100 + '%' }"></div>
        </div>
        <h6 class="progress__title progress__title_empty" v-if="frequency === 0">
            <slot></slot>
        </h6>
        <h6 class="progress__title" v-if="frequency > 0">Usages: {{ value }}/{{ maxValue }}</h6>
    </div>
</template>

<script>
    export default {
        props: {
            value: Number,
            maxValue: {
                type: Number,
                required: true,
            },
        },
        computed: {
            frequency() {
                return (this.value || 0) / this.maxValue;
            },
        },
    };
</script>

<style lang='less'>
    @import '../styles/section.less';
    
    .progress {
        .section;

        padding: 0;
        text-align: center;
        color: white;
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 10000000;
        margin: 0;
        right: 0;
    }

    .progress__title {
        padding: 16px 17px 20px;
        margin: 0;
    }

    .progress__row {
        height: 4px;
        display: flex;
    }

    .progress__bar {
        background-color: #b2cf65;
    }

    .progress__title_empty {
        color: #30a4dc;
    }
</style>