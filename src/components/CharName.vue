<template>
    <div class="char-name">
        <h5 class="char-name__name">{{ index + 1 }}. {{ char.name }}</h5>
        <p class="char-name__realm">{{ char.realm.name }}</p>
    </div>
</template>

<script>
    export default {
        props: {
            index: Number,
            char: {
                name: String,
                realm: {
                    name: String,
                },
            },
        },
    };
</script>

<style>
.char-name__name {
    margin-bottom: 0;
}
.char-name__realm {
    margin-bottom: .5em;
    font-weight: 700;
}
</style>