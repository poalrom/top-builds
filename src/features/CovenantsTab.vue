<template>
    <div class="covenants-tab">
        <div class="section">
            <h5 class="section__title">Work in progress. Stay in touch</h5>
        </div>
    </div>
</template>

<script>
import StatsRow from "../components/StatsRow";
import CharName from "../components/CharName";
import chars from "../store/chars";

export default {
    components: {
        StatsRow,
        CharName,
    },
    computed: {
        chars: chars.get,
    },
};
</script>