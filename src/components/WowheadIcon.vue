<template>
    <HoverableItem :id="id">
        <a
            href="#"
            :data-wowhead="wowheadDataWithClassSpec"
            @click="click"
            class="icon"
            :class="'icon_size_' + size"
        >
            <strong v-if="title" class="icon__title">{{ title }}</strong>
        </a>
    </HoverableItem>
</template>

<script>
import HoverableItem from "./HoverableItem";
import classSpecToWowhead from "../mappers/classSpecToWowhead";
import className from "../store/className";
import specName from "../store/specName";

export default {
    components: {
        HoverableItem,
    },
    props: {
        title: {
            type: String,
        },
        id: {
            type: Number,
            required: true,
        },
        wowheadData: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "m",
        },
    },
    methods: {
        click(e) {
            e.preventDefault();
        },
    },
    computed: {
        wowheadDataWithClassSpec() {
            const classSpecIDs = classSpecToWowhead(
                className.get(),
                specName.get(),
            );

            return (
                this.wowheadData +
                `&class=${classSpecIDs.class}&spec=${classSpecIDs.spec}`
            );
        },
    },
};
</script>

<style>
.icon {
    width: 44px;
    height: 64px;
    text-align: center;
    display: block;
    overflow: hidden;
}

.icon_size_s {
    height: 44px;
}

.icon_size_l {
    height: 85px;
    width: 60px;
}

.icon__title {
    word-wrap: break-word;
    text-transform: capitalize;
    position: relative;
    display: block;
    margin-top: 44px;
}

.icon__title:before {
    content: " ";
    background-image: url("https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg");
    background-size: contain;
    height: 36px;
    width: 36px;
    position: absolute;
    left: calc(50% - 18px);
    top: -40px;
}

.icon__title:after {
    content: " ";
    position: absolute;
    height: 44px;
    width: 44px;
    background-image: url("https://wow.zamimg.com/images/Icon/medium/border/default.png");
    left: calc(50% - 22px);;
    top: -44px;
}

.iconmedium + .icon__title {
    margin-top: 0;
}

.iconmedium + .icon__title:before,
.iconmedium + .icon__title:after {
    display: none;
}
</style>