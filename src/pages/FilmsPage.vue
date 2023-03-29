<template>
    <div class="loading_page" v-show="!isLoading">
        <h2>Loading...<br>Please wait</h2>
    </div>
    <div class="container container__film" v-show="isLoading" v-if="!isOpenAbout & !isOpenTicket" 
    >

        <span @click="OpenMenu" class="menu_button"><ion-icon name="menu"></ion-icon></span>

        <div class="promo" v-for="film in films.slice(0,1)" :key="film.filmId">
            <img src="../assets/films/Scream6/p1.png" alt="">
            <div>
                <h3>{{film.description}}</h3>
                <h2>{{film.name}}</h2>
                <p>{{Math.round(film.duration / 60) + 'h ' + film.duration % 60 + 'min' }}</p>
            </div>
        </div>

        <film-list-component 
        class="this_week" 
        :films="films" 
        :title="'Opening this week'"
        @OpenAboutFilm="OpenAboutFilm">
        </film-list-component>

        <film-list-component 
        class="cooming_soon" 
        :films="films" 
        :title="'Cooming Soon'"
        @OpenAboutFilm="OpenAboutFilm">
        </film-list-component>

    </div>

    <div class="menu" v-show="isLoading"
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent
    @click.self="CloseMenu"
    >
        <div class="menu__element" @click.self="CloseMenu">
            <div class="profile">
<!--                 <img :src="require(`../assets/${user.icon}.png`)" alt="Icon"> -->
                     <img v-if="user.icon == 'DefaultIcon'" src="../assets/DefaultIcon.png" alt="Icon">

                <p>{{user.userName}}</p>
            </div>
            <ul @click.self="CloseMenu">
                <li @click.self="CloseMenu"><span><ion-icon name="home"></ion-icon></span>Home</li>
                <li><span><ion-icon name="ticket"></ion-icon></span>Tickets</li>
                <li><span><ion-icon name="bookmarks"></ion-icon></span>Saved</li>
                <li><span><ion-icon name="settings"></ion-icon></span>Settings</li>
                <li @click.stop="this.$router.push('/')"><span><ion-icon name="exit"></ion-icon></span>Logout</li>
            </ul>
        </div>
    </div>

    <about-film-component 
    :film="selectedFilm" 
    v-show="isOpenAbout" 
    @CloseAbout="isOpenAbout = false"
    @OpenBuy="BuyTicket"
    >
    </about-film-component>

    <ticket-component 
    v-show="isOpenTicket" 
    @CloseTicket="BuyTicket" 
    :film="selectedFilm">

    </ticket-component>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'

import AboutFilmComponent from '@/components/AboutFilmComponent.vue'
import TicketComponent from '@/components/TicketComponent.vue'
import FilmListComponent from '@/components/FilmListComponents.vue'

    export default {
  components: { TicketComponent, AboutFilmComponent, FilmListComponent },
        data() {
            return {
                isLoading: false,
                isOpenTicket: false,
                isOpenAbout: false,

                selectedFilm: '',
            }
        },
        methods: {
            async Authorization() {
                axios.get(this.BASE_URL + '/WeatherForecast', { headers: {"Authorization" : `Bearer ${await this.GetToken()}`} })
                .then(res => {
                    console.log(res)
                    this.$router.push('/film')
                })
                .catch(error => console.log(error)) 
            },

            OpenAboutFilm(film) {
                this.selectedFilm = film;
                this.isOpenAbout = true;

            },
            OpenBuyTicket() {
                this.isOpenAbout = false;
                this.isOpenTicket = true;
            },
            CloseBuyTicket() {
                this.isOpenAbout = true;
                this.isOpenTicket = false;
            },
            BuyTicket() {
                this.isOpenAbout = !this.isOpenAbout;
                this.isOpenTicket = !this.isOpenTicket;
            },
            OpenMenu() {
                document.getElementsByClassName('menu')[0].classList.remove('menu_close')
                document.getElementsByClassName('menu')[0].classList.add('menu_open')
            },
            CloseMenu() {
                document.getElementsByClassName('menu')[0].classList.remove('menu_open')
                document.getElementsByClassName('menu')[0].classList.add('menu_close')

            },
            Console() {
                console.log('ххх')
            }
        },
        computed: {
                ...mapState({
                    token: state => state.post.token,
                    films: state => state.post.films,
                    user: state => state.post.user,
            }),

        },
        mounted() {
                if(this.token !== '')
                    this.isLoading = true
                else
                    this.$router.push('/')
            }
        }
    
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    .container__film {
        justify-content: flex-start;
        max-height: none;
        min-height: 100vh;
        height: fit-content;
        position: relative;

        h3 {
            margin: 0;
        }

        .menu_button {
            z-index: 1000;
            position: fixed;
            width: fit-content;
            height: 50px;
            top: 2%;
            right: 4%;
            color: $white;
            font-size: 3rem;
            
        }

        .promo {
            display: flex;
            position: relative;
            height: 30vh;
            width: 100%;

            img {
                object-fit: contain;
                object-position: top;
                width: 100%;
                height: 100%;
            }

            div {
                color: $white;
                position: absolute;
                display: flex;
                flex-direction: column;
                left: 0;
                width: 100%;
                top: 40%;

                * {
                    font-size: 1.2rem;
                    margin-left: 5%;
                    font-weight: 400;
                    width: fit-content;
                }

                h2 {
                    font-size: 2rem;
                    font-weight: 600;
                }

                p {
                    color: rgba($color: $white, $alpha: .6)
                }

            }

        }


        .this_week:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            box-shadow: inset 0 0 15px 15px rgba(255, 255, 255, 0.6);
            width: 90vw;
            height: 2px;
            -webkit-mask: linear-gradient(
            to right,
            rgba(255, 255, 255 , 0)0%,
            rgba(255, 255, 255, .7) 50%,
            rgba(255, 255, 255 , 0)100%);
    
    
        }
        .cooming_soon {
            margin-top: 6vh;
        }

    }

    @keyframes menu__open {
        0% {
            opacity: 0;
            transform: translateX(-150vw);
        }

        100% {
            opacity: 1;
            transform: translateX(0);
        }
        
    }
    @keyframes menu__close {
        0% {
            opacity: 1;
            transform: translateX(0);
        }

        100% {
            opacity: 0;
            transform: translateX(-150vw);
        }        
    }

    .menu_open {
        animation: menu__open .35s ease-out both;
    }
    .menu_close {
        animation: menu__close .35s ease-out both;
    }

    .menu {
        transform: translateX(-150vw);
        z-index: 2000;
        position: fixed;
        left:0;
        top: 0;
        bottom: 0;
        right: 0;
        background: rgba($color: $black, $alpha: .3);

        .menu__element {
            display: flex;
            flex-direction: column;
            height: 100%;
            width: 70%;
            background: rgba($color: $black, $alpha: .7);
            backdrop-filter: blur(2px);
            box-shadow: 0px 0px 0px 60px rgba($color: $black, $alpha: .45);;
            -webkit-mask: linear-gradient(
            to right,
            rgba(0, 0, 0, 1) 60%,
            rgba(0, 0, 0, .8) 70%,
            rgba(0, 0, 0, .6) 90%,
            rgba(0, 0, 0, 0)100%);
        }

        .profile {
            display: flex;
            margin-top: 15vh;
            margin-left: 7px;

            img {
                border-radius: 50%;
                height: 40px;
                width: 40px;
                background-color: $white;
                object-fit: contain;
                
            }

            p {
                margin-left: 20px;
                font-size: 1.5rem;
                font-weight: 600;
            }
        }

        ul {
            z-index: 2500;
            height: 50vh;
            display: flex;
            flex-direction: column;
            margin-top: 5vh;
            li {
                font-size: 1.5rem;
                display: flex;
                align-items: center;
                margin-bottom: 2vh;
                transition: all .3s ease-out;
                span {
                    font-size: 1.9rem;
                    margin: 7px 10px 0 20px;
                }
            }

            li:hover {
                font-size: 1.65rem;
                -webkit-filter: brightness(110%);
                filter: brightness(110%);
            }

            li:nth-child(5) {
                margin-top: 35vh;
            }
        }

    }
</style>