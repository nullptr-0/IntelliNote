<template>
    <div>
        <div v-if="loggedIn" id="app">
            <Sidebar />
            <div class="main-content">
                <RouterView />
            </div>
        </div>
        <div v-else>
            <LoginView @login="handleLogin" />
        </div>
    </div>
</template>

<script>
    import { RouterView } from 'vue-router'
    import LoginView from './views/LoginView.vue';
    import Sidebar from './components/SideBar.vue';

    export default {
        components: {
            Sidebar,
            LoginView
        },
        data() {
            return {
                loggedIn: false,
                username: ''
            };
        },
        async created() {
            const response = await fetch('./profile', {
                credentials: 'include'
            });

            //if (!response.ok) {
            if (response.ok) {
                //const userData = await response.json();
                //this.username = userData.username;
                this.loggedIn = true;
                document.body.style.background = 'white';
            }
            else {
                this.loggedIn = false;
            }
        },
        methods: {
            async getProfile() {
                const response = await fetch('./profile', {
                    credentials: 'include'
                });

                if (response.ok) {
                    //const userData = await response.json();
                    //this.username = userData.username;
                    this.loggedIn = true;
                    document.body.style.background = 'white';
                }
                else {
                    this.loggedIn = false;
                }
            },
            async handleLogin() {
                await this.getProfile();
            }
        }
    };
</script>

<style>
    body {
        background-image: url('assets/loginbg.jpg');
        background-size: cover;
    }

    #app {
        display: flex;
    }

    .main-content {
        flex: 1;
        padding-left: 25%; /* Adjust the padding to accommodate the sidebar width */
    }
</style>
