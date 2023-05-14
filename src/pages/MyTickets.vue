<template>
    <div class="container">
        <span class="go-back" @click="this.$router.push('/film')"></span>
        <div class="my_tickets">
            <h2>My tickets</h2>
            <ul class="ticket__list">
                <li class="ticket" v-for="ticket in tickets.slice(0,maxTickets)" :key="ticket.ticketId">
                    <div>
                        <h3>Film: <span>{{ticket.session.film.name}}</span></h3>
                        <h3>Cost: <span>{{ ticket.cost }}</span></h3>
                    </div>

                    <div>
                        <div class="group">
                            <p>Row: {{ ticket.place.mumberOfRow }}</p>
                            <p>Place: {{ ticket.place.numberOfPlace }}</p>
                        </div>
                        
                        <div class="group time">
                            <p>Date: {{ticket.session.date.split('T')[0] }}</p>
                            <p>Time: {{ticket.session.time }} to {{ticket.session.timeEnd }}</p>
                        </div>

                    </div>
                </li>
            </ul>

            <button @click.prevent="getMore" class="get_more">Get more</button>
        </div>

    </div>

</template>

<script>
/* import axios from 'axios'; */
import {refreshToken, getCookie} from '@/API/midleware'
import {FetchTicketsForUserId, FetchUsersForId} from '@/API/methods'
import {mapState, mapMutations} from 'vuex'
    export default {
        data() {
            return {
                isLoading: false,
                tickets:[],
                maxTickets: 5,
            }
        },
        methods: {
            ...mapMutations({
                setToken: 'post/setToken',
                setUser: 'post/setUser',
            }),
            getMore() {
                this.maxTickets = this.maxTickets < this.tickets.length ? this.maxTickets += 5 : this.maxTickets
            },

        },
        computed: {
                ...mapState({
                    token: state => state.post.token,
                    BASE_URL: state => state.post.BASE_URL,
                    user: state => state.post.user,
            }),
        },
        async mounted() {
                if(this.token !== ''){
                    this.isLoading = true
                    await FetchUsersForId(this.token, await getCookie('UserID').then(res => res))
                        .then(res => {
                            this.setUser(res)
                            FetchTicketsForUserId(this.token, this.user.userId).then(res => {
                            this.tickets = res
                            this.isLoading = true;
                        })
                    })
                }
                else {
                    await refreshToken().then(async res => {
                        this.setToken(res)
                        this.isLoading = true
                        await FetchUsersForId(this.token, await getCookie('UserID').then(res => res))
                        .then(res => {
                            this.setUser(res)
                            FetchTicketsForUserId(this.token, this.user.userId).then(res => {
                                this.tickets = res
                                this.isLoading = true;
                        })
                    })

                    }).catch(e => {
                        console.log(e)
                    })              
                }
                if(this.token === undefined) this.$router.push('/')
            }
        }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.container {
    justify-content: flex-start;
    max-height: none;
    height: auto;
    min-height: 100vh;

}
.my_tickets {
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin-top: 3.5vh;
    }

    .ticket__list {
        width: 100vw;
        margin-top: 6vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .ticket {
            list-style: none;
            background-color: rgba($color: $white, $alpha: .9);
            border-radius: 20px;
            box-sizing: border-box;
            padding: 3%;
            width: 90%;
            margin-top: 2vh;
            
            div {
                display: flex;
                justify-content: space-between;

                .group {
                    display: flex;
                    flex-direction: column;
                }
                .time {
                    align-items: flex-end;

                }
            }
    
            h3 {
                max-width: 55vw;
                color: $black;
                margin-right: 2vw;

                span {
                    color: $green
                }
            }

            p {
                width: fit-content;
                color: $black;
                margin-right: 2vw;
            }
        }
    }

}

.get_more {
    z-index: 2;
    margin: 3.5vh 0;
    padding: 2vh 12vw;
    background-color: $green;
    font-size: 1.3rem;
    border-radius: 20px;  
    font-weight: 600;  
}
</style>