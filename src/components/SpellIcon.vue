<template>
    <WowheadIcon
        :title="title"
        :id="id"
        :wowheadData="wowheadData"
        :size="freq ? 'm' : 's'"
    ></WowheadIcon>
</template>

<script>
import WowheadIcon from "./WowheadIcon";

export default {
    components: {
        WowheadIcon,
    },
    props: {
        freq: {
            type: Number,
        },
        id: {
            type: Number,
            required: true,
        },
    },
    computed: {
        title() {
            return this.freq
                ? "x" + this.freq
                : undefined;
        },
        wowheadData() {
            return "spell=" + this.id;
        },
    },
};
</script>