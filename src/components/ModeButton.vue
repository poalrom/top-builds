<template>
    <button
        @click="setMode(modeName)"
        class="btn whitetext red"
        :class="{ hollow: modeName !== currentMode }"
    >{{humanifiedMode}}</button>
</template>

<script>
    import startCase from "lodash/fp/startCase";
    import currentMode from "../store/currentMode";

    export default {
        props: {
            modeName: {
                type: String,
                required: true,
            },
        },
        methods: {
            setMode: currentMode.set,
        },
        computed: {
            currentMode: currentMode.get,
            humanifiedMode() {
                return startCase(this.modeName);
            }
        }
    };
</script>

<style>
</style>