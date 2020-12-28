<template>
    <div class="soulbind">
        <WowheadIcon
            :id="id"
            :icon="icon"
            :size="hinted ? 's' : 'auto'"
            :title="title"
        >
            <div class="soulbind__hint" v-if="hinted">{{ soulbind }}</div>
        </WowheadIcon>
    </div>
</template>

<script>
import WowheadIcon from "./WowheadIcon";

const COVENANT_ICON = {
    Kyrian: "https://wow.zamimg.com/images/wow/icons/large/ui_sigil_kyrian.jpg",
    Necrolord:
        "https://wow.zamimg.com/images/wow/icons/large/ui_sigil_necrolord.jpg",
    "Night Fae":
        "https://wow.zamimg.com/images/wow/icons/large/ui_sigil_nightfae.jpg",
    Venthyr:
        "https://wow.zamimg.com/images/wow/icons/large/ui_sigil_venthyr.jpg",
};

export default {
    components: {
        WowheadIcon,
    },
    props: {
        covenant: {
            type: String,
            required: true,
        },
        soulbind: {
            type: String,
            required: true,
        },
        freq: {
            type: Number,
        },
        hinted: {
            type: Boolean,
        },
    },
    computed: {
        id() {
            // Generate unique ID for soulbind name
            return (
                -1 *
                (String(this.soulbind.charCodeAt(0)) +
                    this.soulbind
                        .split('')
                        .reduce((acc, str) => acc + str.charCodeAt(), 0))
            );
        },
        icon() {
            return COVENANT_ICON[this.covenant];
        },
        title() {
            return this.hinted
                ? ""
                : this.soulbind + (this.freq ? ` (x${this.freq})` : "");
        },
    },
};
</script>

<style>
.soulbind {
    position: relative;
}

.soulbind__hint {
    display: none;
    position: absolute;
    background-color: #181818;
    padding: 5px 7px;
    font-weight: bold;
    border: 1px solid #242424;
}

.soulbind:hover .soulbind__hint {
    display: block;
}
</style>