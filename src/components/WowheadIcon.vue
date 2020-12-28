<template>
    <HoverableItem :id="id">
        <a
            href="#"
            :data-wowhead="wowheadDataWithClassSpec"
            @click="click"
            class="icon"
            :class="'icon_size_' + size"
            :style="{ 'background-image': backgroundImage }"
        >
            <strong v-if="title" class="icon__title">{{ title }}</strong>
        </a>
        <slot></slot>
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
        },
        icon: {
            type: String,
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
        backgroundImage() {
            if (!this.icon) {
                return;
            }

            return `url(${this.icon})`;
        },
        wowheadDataWithClassSpec() {
            if (this.icon) {
                return;
            }

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
    background-image: url("https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg");
    background-size: 36px 36px;
    background-repeat: no-repeat;
    background-position: center 4px;
    position: relative;
}

.icon_size_s {
    height: 44px;
}

.icon_size_l {
    height: 85px;
    width: 60px;
}

.icon_size_auto {
    width: auto;
    height: auto;
    max-width: 150px;
}

.icon__title {
    word-wrap: break-word;
    text-transform: capitalize;
    display: block;
    margin-top: 44px;
    color: white;
}

.icon:hover,
.icon__title:hover {
    text-decoration: none;
}

.icon:after {
    content: " ";
    position: absolute;
    height: 44px;
    width: 44px;
    background-image: url("https://wow.zamimg.com/images/Icon/medium/border/default.png");
    left: calc(50% - 22px);;
    top: 0;
}

.iconmedium + .icon__title {
    margin-top: 0;
}

.icon[data-wh-icon-added] {
    background: none;
}

.icon[data-wh-icon-added]:after {
    display: none;
}
</style>