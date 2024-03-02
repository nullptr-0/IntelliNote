<template>
    <div class="login-container">
        <div class="login-form">
            <h2>{{ currentModeText }}</h2>
            <form @submit.prevent="login">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" id="username" class="form-control" placeholder="Enter your username">
                    <p v-if="usernameError" class="error">{{ usernameError }}</p>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" v-model="password" id="password" class="form-control" placeholder="Enter your password">
                    <p v-if="passwordError" class="error">{{ passwordError }}</p>
                </div>
                <div v-if="isSignUp" class="form-group">
                    <label for="passwordConfirm">Confirm Password</label>
                    <input type="password" v-model="passwordConfirm" id="passwordConfirm" class="form-control" placeholder="Confirm your password">
                    <p v-if="passwordConfirmError" class="error">{{ passwordConfirmError }}</p>
                </div>
                <button type="submit" class="btn btn-primary">{{ currentModeText }}</button>
                <a @click="switchLoginSignup" class="signup-text">{{ modeToSwitchText }}</a>
            </form>
            <p v-if="error" class="error">{{ error }}</p>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                passwordConfirm: '',
                usernameError: '',
                passwordError: '',
                passwordConfirmError: '',
                error: '',
                isSignUp: false,
                currentModeText: 'Login',
                modeToSwitchText: 'Sign Up'
            };
        },
        methods: {
            async login() {
                this.usernameError = '';
                this.passwordError = '';

                if (!this.username.trim()) {
                    this.usernameError = 'Username is required';
                } else if (!/\w{3,63}$/.test(this.username)) {
                    this.usernameError = 'Username can only contain letters, numbers, and underscores, and must be more than 2 characters amd less than 64 characters';
                }

                if (!this.password.trim()) {
                    this.passwordError = 'Password is required';
                } else if (this.password.length < 9) {
                    this.passwordError = 'Password must be more than 8 characters';
                } else if (!/[a-zA-Z]/.test(this.password)) {
                    this.passwordError = 'Password must contain letters';
                } else if (!/\d/.test(this.password)) {
                    this.passwordError = 'Password must contain numbers';
                }


                if (this.isSignUp && this.passwordConfirm !== this.password) {
                    this.passwordConfirmError = 'Passwords mismatch';
                }

                if (this.usernameError || this.passwordError || this.isSignUp && this.passwordConfirmError) {
                    return;
                }

                try {
                    //const response = await fetch('./login', {
                    //    method: 'POST',
                    //    headers: {
                    //        'Content-Type': 'application/json'
                    //    },
                    //    body: JSON.stringify({
                    //        mode: this.isSignUp ? 'signup' : 'login',
                    //        username: this.username,
                    //        password: this.password
                    //    }),
                    //    credentials: 'include'
                    //});
                    //if (!response.ok) {
                    //    this.passwordError = 'Invalid credentials combination';
                    //}
                    this.$emit('login');
                } catch (error) {
                    this.error = error.message;
                }
            },
            switchLoginSignup() {
                this.isSignUp = !this.isSignUp;
                [this.currentModeText, this.modeToSwitchText] = [this.modeToSwitchText, this.currentModeText];
                this.usernameError = '';
                this.passwordError = '';
                this.passwordConfirmError = '';
            }
        }
    };
</script>

<style scoped>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .login-form {
        max-width: 400px;
        padding: 20px;
        background-color: rgba(255, 255, 255, 0.6);
        border-radius: 5px;
    }

        .login-form h2 {
            cursor: default;
        }

    .form-group {
        margin-bottom: 20px;
    }

    label {
        font-weight: bold;
    }

    .form-control {
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .btn {
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

        .btn:hover {
            background-color: #0056b3;
        }

    .error {
        color: red;
    }

    .signup-text {
        float: right;
        margin-top: 8px;
        cursor: pointer;
    }
</style>
