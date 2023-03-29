<template>
    <div class="container">
        <h3>Sing in</h3>

        <form action="#">
            <label class="login" for="email">Email
                <input v-model="email" type="email" name="email" placeholder="Enter your email">
            </label>

            <label class="login" for="password">Password
                <input v-model="password" type="password" name="password" placeholder="Enter your password">
            </label>

            <router-link class="router-link forgot" to="/">Forgot Password?</router-link>

            <label for="Remember">
                <input class="custom-checkbox" type="checkbox" v-model="isRemember" name="Remember">
                Remember me
            </label>
        </form>

        <button @click="Authorization">Login</button>
        <p>— OR —</p>
        <router-link class="router-link" to="/">Sing in like guest</router-link>

        <p class="route_to_singup">Don't have an Account? <span @click="this.$emit('OpenReg', true)">Sing up</span></p>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                email: '',
                password: '',
                isRemember: false,
                accessToken: '',
                token: '',
            }
        },
        methods: {
            ...mapMutations({
                setToken: 'post/setToken',
                setFilms: 'post/setFilms',
                setUser: 'post/setUser',
            }),

            async GetToken() {
                if(this.email != '' && this.password != '')
                try {
                    const response = await axios.post(this.BASE_URL + '/api/Auth/login',
                        {
                            userName: this.email,
                            password: this.password
                        }
                    )
                    return response.data

                } catch (e) {
                    console.log(e)

                } finally {
                    this.loading = false;
                }
            },
            async Authorization() {
                this.token = await this.GetToken()

                await axios.get(this.BASE_URL + '/api/Film', { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.setFilms(res.data)
                    this.setToken(this.token)
                })
                .catch(error => console.log(error)) 

                await axios.get(this.BASE_URL + '/api/User/GetUserOnLogin?UserName=' + this.email, {headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
/*                     console.log(res.data) */
                    this.setUser(res.data)
                })
                .catch(error => console.log(error)) 

                this.$router.push('/film')
            },
        },
        computed: {
                ...mapState({
                    BASE_URL: state => state.post.BASE_URL,
                    token: state => state.post.token,
                    films: state => state.post.films,
                    user: state => state.post.user,
            }),
    }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    .container {
        justify-content: flex-start;
    }

    h3 {
        margin-top: 20vh;
    }

    form {
        margin: 0 auto;
        width: 70vw;
        height: 36vh;
        display: flex;
        flex-direction: column;

        .login:nth-child(1)
        {
            margin-top: 8vh;
        }
        .login {
            margin-top: 6vh;
            display: block;
            font-weight: 400;
            font-size: .95rem;
            line-height: 1.1rem;
            margin-bottom: 0;
            color: $white;

            input {
                margin: 0;
                display: block;
                height: 5vh;
                width: 80%;
                text-align: left;
            }

        }

        input[type="checkbox"] {
            cursor: pointer;
            margin: 0;
            width: fit-content;
            display: inline-block;
            width: 3vw;
            margin-right: 1.2vw;
            margin-bottom: .1vh;
        }
        label[for="Remember"] {
            width: fit-content;
            display: flex;
            align-items:end;
            color: $white;
            font-size: .6rem;   
        }
    }

    button {
        cursor: pointer;
        width: fit-content;
        height: fit-content;
        background-color: $green;
        color: $black;
        border-radius: 18px;
        font-size: 1.4rem;
        padding: 1.4vh 22vw;


    }

    .router-link {
        cursor: pointer;
        color: $white;
        text-decoration: none;
        font-weight: 600;
    }

    .forgot {
        font-size: .7rem;
        align-self: flex-end;
        width: fit-content;
    }
    
    p {
        position: relative;
        margin: 4vh 0;
        color: $white;
        font-size: .9rem;
        font-weight: 300;

        span {
            font-weight: bold;
            cursor: pointer;
        }
    }

    .route_to_singup {
        margin-top: 15vh;
    }

</style>