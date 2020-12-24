<template>
    <div class="form-group" :class="className">
        <div class="input-group">
            <label class="input-addon" for="class">
                <slot></slot>
            </label>
            <select name="class" class="select" :value="value" @change="onChange">
                <option
                    v-for="option in options"
                    :key="option"
                    :value="option"
                    :selected="option === value"
                >{{ startCase(option) }}</option>
            </select>
        </div>
    </div>
</template>

<script>
    import startCase from "lodash/fp/startCase";

    export default {
        props: {
            value: String,
            options: {
                type: Array,
                required: true,
            },
            className: String
        },
        methods: {
            startCase,
            onChange(e) {
                this.$emit("change", e.target.value);
            },
        },
        watch: {
            options(newOptions, oldOptions) {
                if (newOptions.join("") !== oldOptions.join("")) {
                    this.$emit(
                        "change",
                        this.options.includes(this.value)
                            ? this.value
                            : this.options[0],
                    );
                }
            },
        },
    };
</script>
