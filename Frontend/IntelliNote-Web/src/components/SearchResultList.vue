<template>
    <template v-if="results.length === 0">
        <div class="noResultsText">No result to show.</div>
    </template>
    <template v-else>
        <div class="seperator" />
        <div v-for="result in results" :key="result">
            <div class="resultItem" @click="selectResult(result)">
                <h2 style="color: #04AA6D;">{{ result.title }}</h2>
                <span>{{ result.brief }}</span>
                <br><div v-for="tag in result.tags" :key="tag" class="resultTag">{{ tag }}</div><br>
                <span>Last modified on {{ result.modifyTime }}</span>
            </div>
            <div class="seperator" />
        </div>
    </template>
</template>

<script>
    export default {
        props: {
            results: Array,
        },
        methods: {
            selectResult(result) {
                this.$emit('result-selected', result);
            }
        }
    };
</script>

<style>
    .noResultsText {
        color: #777;
        font-style: italic;
        text-align: center;
        font-size: 20px;
    }

    .seperator {
        background-color: #9f9f9f;
        height: 1px;
    }

    .resultItem {
        padding: 15px;
        padding-left: 50px;
        background-color: #f9f9f9;
        font-size: 1.5rem;
        cursor: pointer;
    }

        .resultItem:hover {
            background-color: #eaeaea;
        }

    .resultTag {
        display: inline;
        padding-inline: 10px;
        font-size: 20px;
        color: #04AA6D;
        background-color: #D9EEE1;
        border-radius: 25px;
        padding-left: 15px;
        padding-right: 15px;
        padding-top: 5px;
        padding-bottom: 10px;
        margin: 3px;
    }
</style>
