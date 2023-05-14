<template>
    <div class="container">
        <about-film-component 
        :film="selectedFilm"
        v-if="!isOpenTicket" 
        @CloseAbout="isOpenAbout = false"
        @OpenBuy="BuyTicket"
        >
        </about-film-component>
    
        <ticket-component 
        v-else
        @CloseTicket="BuyTicket" 
        :film="selectedFilm">
        </ticket-component>
    </div>
</template>

<script>
import AboutFilmComponent from '@/components/AboutFilmComponent.vue'
import TicketComponent from '@/components/TicketComponent.vue'

import {mapState, mapMutations} from 'vuex'
import {refreshToken, getCookie} from '@/API/midleware'
import {FetchUsersForId, FetchFilmsForFilmName} from '@/API/methods'

    export default {
        components: { TicketComponent, AboutFilmComponent },
        data() {
            return {
                isOpenTicket: false,
                isLoading: false,

            }
        },
        methods: {
            ...mapMutations({
                setSelectedFilm: 'post/setSelectedFilm',
                setToken: 'post/setToken',
                setUser: 'post/setUser',
            }),
            OpenAboutFilm() {
                this.isOpenAbout = true;

            },
            BuyTicket() {
                this.isOpenAbout = !this.isOpenAbout;
                this.isOpenTicket = !this.isOpenTicket;
            }
        },
        computed: {
                ...mapState({
                    token: state => state.post.token,
                    selectedFilm: state => state.post.selectedFilm,
                    user: state => state.post.user,
            })
        },
        async mounted() {
            if(this.token === '')
            {
                await refreshToken().then(async res => {
                    this.setToken(res)

                    FetchUsersForId(this.token, await getCookie('UserID').then(res => res))
                    .then(res => {
                        console.log(res)
                        this.setUser(res)
                    })

                    FetchFilmsForFilmName(this.token, this.$route.params.filmName)
                    .then(res => {
                        console.log(res)
                        this.setSelectedFilm(res)
                    })

                })
                .catch(e => {
                    console.log(e)
                })                  
            }
            
            else if(this.token === undefined) 
                this.$router.push('/')
        },
    }
</script>

<style lang="scss" scoped>

</style>