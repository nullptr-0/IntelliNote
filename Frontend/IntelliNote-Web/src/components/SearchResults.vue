<template>
    <div class="result-container" id="result-container">
        <div class="filterMenuContainer" :style="{ width: filterMenuWidth + 'px', maxWidth: '100%' }">
            <div class="resizeHandle" @mousedown="startResize"></div>
            <div v-if="results.length" class="filterMenu">
                <div style="font-size: 25px;margin-bottom: 10px;">Filter By</div>
                <div v-for="resultGroup in results" :key="resultGroup.filterName">
                    <div v-if="currentFilter === resultGroup.filterName" style="width: 5px; background-color: #04AA6D; height:15px; display:inline-block;"></div>
                    <div v-else style="width: 5px; background-color: transparent; height:15px; display:inline-block;"></div>
                    <div class="filterItem" @click="selectFilter(resultGroup)">
                        <div class="filterName">{{ resultGroup.filterName }}</div>
                        <div class="resultCount">{{ resultGroup.result.length }}</div>
                    </div>
                </div>
            </div>
        </div>
        <SearchResultList :results="displayedResults" @result-selected="handleResultSelection" />
    </div>
</template>

<script>
    import SearchResultList from './SearchResultList.vue';

    export default {
        props: {
            results: Array
        },
        components: {
            SearchResultList
        },
        data() {
            return {
                currentFilter: '',
                displayedResults: [],
                isResizing: false,
                startX: 0,
                startWidth: 0,
                filterMenuWidth: 300
            };
        },
        methods: {
            handleResultSelection(result) {
                console.log(result)
            },
            selectFilter(resultGroup) {
                this.currentFilter = resultGroup.filterName;
                this.displayedResults = resultGroup.result;
            },
            startResize(event) {
                this.isResizing = true;
                this.startX = event.clientX;
                this.startWidth = this.filterMenuWidth;
                document.addEventListener('mousemove', this.resize);
                document.addEventListener('mouseup', this.stopResize);
            },
            resize(event) {
                if (this.isResizing) {
                    const delta = event.clientX - this.startX;
                    this.filterMenuWidth = Math.min(Math.max(100, this.startWidth - delta), document.getElementById('result-container').clientWidth);
                }
            },
            stopResize() {
                this.isResizing = false;
                document.removeEventListener('mousemove', this.resize);
                document.removeEventListener('mouseup', this.stopResize);
            }
        }
    };
</script>

<style>
    .filterMenuContainer {
        position: fixed;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: #f5f7fb;
        border-left: 1px solid #ddd;
        overflow: hidden;
    }

    .filterMenu {
        padding: 20px;
    }

    .filterItem {
        margin-left: 7px;
        display: inline-block;
        width: 95%;
        padding: 10px;
        border-radius: 10px;
    }

        .filterItem:hover {
            background-color: #e3e3e3;
        }

    .filterName {
        font-weight: bold;
        display:inline;
    }

    .resultCount {
        float: right;
        display: inline;
        width: fit-content;
        background-color: #ccc;
        color: black;
        padding-left: 6px;
        padding-right: 6px;
        border-radius: 10px;
    }

    .resizeHandle {
        position: absolute;
        top: 0;
        left: -5px;
        bottom: 0;
        width: 7px;
        cursor: ew-resize;
        background-color: #fff;
        border-left: 1px solid #ddd;
    }

        .resizeHandle:hover {
            background-color: #f0f2f7;
        }
</style>
