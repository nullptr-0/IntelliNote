<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <span>IntelliNote</span>
        </div>
        <div class="sidebar-menu">
            <ul>
                <RouterLink v-for="item in menuItems" :key="item.id" :to="item.route">
                    <li :class="{ 'active-item': item.active }">
                        <span class="menu-item-text">{{ item.label }}</span>
                    </li>
                </RouterLink>
            </ul>
        </div>
        <div class="sidebar-footer">
            <span>&copy; 2024 IntelliNote<br />Licensed under <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0</a></span>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router'
    export default {
        data() {
            return {
                menuItems: [
                    { id: 1, label: "Home", route: "/", active: false },
                    { id: 2, label: "Notes", route: "/notes", active: false },
                    { id: 3, label: "Search", route: "/search", active: false },
                    { id: 4, label: "Calendar", route: "/calendar", active: false },
                ],
            };
        },
        watch: {
            '$route': 'updateActiveMenuItem'
        },
        mounted() {
            this.updateActiveMenuItem();
        },
        methods: {
            updateActiveMenuItem() {
                const currentPath = this.$route.path;
                this.menuItems.forEach(item => {
                    item.active = item.route === currentPath;
                });
            },
        },
    };
</script>

<style scoped>
    .sidebar {
        width: 25%;
        height: 100%;
        background-color: #040306;
        color: #fff;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .sidebar-header {
        padding: 10%;
        padding-top: 20%;
    }

        .sidebar-header span {
            width: 100%;
            text-align: center;
            font-size: 50px; /* Adjust font size */
            font-weight: 900; /* Adjust font size */
        }

    .sidebar-menu {
        padding: 5%;
    }

        .sidebar-menu ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }

            .sidebar-menu ul li {
                padding: 10% 10%;
                cursor: pointer;
                border-radius: 20px;
                transition-property: background-color;
                transition-duration: 1s;
                transition-timing-function: ease-in-out;
            }

                .sidebar-menu ul li:hover {
                    background-color: #5a5a5a;
                }

                .sidebar-menu ul li span {
                    font-size: 30px;
                    color: white;
                }

    .sidebar-footer {
        padding: 20px;
        text-align: center;
    }

    .active-item {
        background-color: #1db954;
    }
</style>