<template>
    <div>
        <div v-if="loggedIn" id="app">
            <Sidebar class="side-bar" />
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

    .side-bar, .main-content {
        height: 100%;
        position: fixed;
        top: 0;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .side-bar {
        width: 25%;
        left: 0;
    }

    .main-content {
        width: 75%;
        left: 25%;
    }
</style>
