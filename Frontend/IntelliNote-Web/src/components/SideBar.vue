<template>
    <div class="sidebar">
        <div class="sidebar-header">
            <span>IntelliNote</span>
        </div>
        <div class="sidebar-menu">
            <ul>
                <RouterLink v-for="item in menuItems" :key="item.id" :to="item.route">
                    <li @click="handleMenuItemClick(item)">
                        <span class="menu-item-text">{{ item.label }}</span>
                    </li>
                </RouterLink>
            </ul>
        </div>
    </div>
</template>

<script>
    import { RouterLink } from 'vue-router'
    export default {
        data() {
            return {
                menuItems: [
                    { id: 1, label: "Home", route: "/" },
                    { id: 2, label: "Notes", route: "/notes" },
                    { id: 3, label: "Search", route: "/search" },
                    { id: 4, label: "Calendar", route: "/calendar" },
                ],
            };
        },
        methods: {
            handleMenuItemClick(item) {
                // Handle click event for menu item
                console.log("Clicked on", item.label);
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
            }

                .sidebar-menu ul li:hover {
                    background-color: #282828;
                }

                .sidebar-menu ul li span {
                    font-size: 30px;
                    color: white;
                }
</style>