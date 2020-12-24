<template>
    <WowheadIcon
        :title="title"
        :id="item.id"
        :wowheadData="wowheadData"
        :size="item.freq ? 'm' : hideTitle ? 's' : 'l'"
    ></WowheadIcon>
</template>

<script>
import startCase from "lodash/fp/startCase";
import humanifySlotName from "../mappers/humanifySlotName";
import WowheadIcon from "./WowheadIcon";

export default {
    components: {
        WowheadIcon,
    },
    props: {
        hideTitle: {
            type: Boolean,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        title() {
            if (this.hideTitle) {
                return;
            }

            return this.item.freq
                ? "x" + this.item.freq
                : humanifySlotName(this.item.slot);
        },
        wowheadData() {
            return [
                "item=" + this.item.id,
                "ilvl=" + this.item.ilvl,
                this.item.enchantments &&
                    "ench=" + this.item.enchantments.join(":"),
                this.item.sockets && "gems=" + this.item.sockets.join(":"),
                this.item.bonuses && "bonus=" + this.item.bonuses.join(":"),
            ]
                .filter(Boolean)
                .join("&");
        },
    },
};
</script>