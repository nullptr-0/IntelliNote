<template>
    <div id="app">
        <Sidebar />
        <div class="main-content">
            <RouterView  />
        </div>
    </div>
</template>

<script>
    import { RouterView } from 'vue-router'
    import Sidebar from './components/SideBar.vue';

    export default {
        components: {
            Sidebar
        }
    };
</script>

<style>
    #app {
        display: flex;
    }

    .main-content {
        flex: 1;
        padding-left: 25%; /* Adjust the padding to accommodate the sidebar width */
    }
</style>
