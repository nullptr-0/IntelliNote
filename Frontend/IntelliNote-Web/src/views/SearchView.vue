<template>
    <div class="searchView" ref="searchView">
        <SearchBar class="search-bar" @search="performSearch" />
        <SearchResults :results="results" />
    </div>
</template>

<script>
    import SearchBar from '../components/SearchBar.vue';
    import SearchResults from '../components/SearchResults.vue';

    export default {
        components: {
            SearchBar,
            SearchResults
        },
        data() {
            return {
                results: [],
            };
        },
        methods: {
            performSearch(query) {
                // Perform search based on the keyword
                // Update this.results with the search results
                this.results = [
                    {
                        filterName: 'Filter 1',
                        result: [
                            {
                                title: '1 the title here',
                                brief: '1 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-01'
                            },
                            {
                                title: '2 the title here',
                                brief: '2 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-02'
                            },
                            {
                                title: '3 the title here',
                                brief: '3 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-03'
                            },
                        ]
                    },
                    {
                        filterName: 'Filter 2',
                        result: [
                            {
                                title: '4 the title here',
                                brief: '4 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-04'
                            },
                            {
                                title: '5 the title here',
                                brief: '5 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-05'
                            },
                            {
                                title: '6 the title here',
                                brief: '6 the brief here',
                                tags: ['tag1', 'tag2', 'tag3'],
                                modifyTime: '2024-01-06'
                            },
                        ]
                    },
                    {
                        filterName: 'Filter 3',
                        result: []
                    },
                ];
            },
        }
    };
</script>

<style scoped>
    .search-bar {
        margin: 60px;
    }
</style>