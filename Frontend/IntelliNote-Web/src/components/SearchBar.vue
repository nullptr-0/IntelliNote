<template>
    <div>
        <HighlightableInput class="highlightable-input"
                            highlight-style="background-color:yellow"
                            data-placeholder="Search Here ..."
                            :highlight-enabled="highlightEnabled"
                            :highlight="highlight"
                            v-model="msg"
                            @submit="handleSubmit" />
    </div>
</template>

<script>
    import HighlightableInput from "./HighlightableInput.vue"
    export default {
        name: "SearchBar",
        components: {
            HighlightableInput
        },
        data() {
            let formData = {
                msg: '',
                highlight: [
                    //{ text: 'so', style: "background-color:#fff05e;padding:0 10px;display:inline-block;border-radius:10px;" },
                    // "whatever",//default
                    // {start: 2, end: 5, style:"background-color:#f330ff"}
                ],
                highlightEnabled: true
            };
            let filters = ['user', 'date'];
            filters.forEach(filter => {
                formData.highlight.push({
                    text: new RegExp(`${filter}:\\S+`, 'g'),
                    style: 'color:#04AA6D;background-color:#D9EEE1'
                });
            });
            return formData;
        },
        methods: {
            handleSubmit(content) {
                this.$emit('search', content)
            }
        }
    };
</script>

<style lang="scss" scoped>
    .highlightable-input {
        border: 5px solid #04AA6D;
        border-radius: 15px;
        width: 100%;
        overflow-y: auto;
        padding: 7px;
    }

    [data-placeholder]:empty:before {
        content: attr(data-placeholder);
        color: #888;
        font-style: italic;
    }
</style>