<template>
    <div class="container">
        <div class="background__image"></div>
        <span class="white__circle"></span>

        <div class="menu">
            <span class="go-back" @click="goBack"></span>

            <h3>Tenet</h3>
        </div>

        <div class="swiper__date">
            <ul>
<!--                 <li v-for="d in date.slice(2,9)" :key="d.day">
                    <p>{{d.dayOfWeek}}</p>
                    <p>{{d.day}}</p>
                </li> -->

                <li v-for="session in uniqueDate.slice(0,7)" :key="session.sessionId"
                v-touch:swipe.left="swipeLeft"
                v-touch:swipe.right="swipeRight"
               >
                    <p>{{ getDay(session) }}</p>
                    <p>{{ getDate(session) }}</p>
                </li>
            </ul>
        </div>

        <div class="swiper__time" v-if="isLoading === false">
            <ul>
                <li v-for="session in sessions.filter(p => p.date === uniqueDate[selectedDate])" :key="session.id">
                    <p>{{session.time.split(':')[0] + ":" + session.time.split(':')[1]}}</p>
                </li>
            </ul>
        </div>

        <div class="places">
            <ul>
                <li>

                    <span></span>

                </li>
            </ul>
        </div>


    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
    export default {
        props: {
            film: Object,
        },
        data(){
            return {
               /*  date: [{
                    day: 19,
                    dayOfWeek: 'Mon',
                    time: [{
                        id: 1,
                        time: '9:00'
                    },
                    {
                        id: 2,
                        time: '11:00'
                    },
                    {
                        id: 3,
                        time: '13:00'
                    },
                    {
                        id: 4,
                        time: '15:00'
                    },
                    {
                        id: 5,
                        time: '17:00'
                    },
                    {
                        id: 6,
                        time: '19:00'
                    },
                    {
                        id: 7,
                        time: '21:00'
                    },]
                },
                {
                    day: 20,
                    dayOfWeek: 'Tue',
                    time: [{
                        id: 1,
                        time: '11:00'
                    },
                    {
                        id: 2,
                        time: '13:00'
                    },
                    {
                        id: 3,
                        time: '15:00'
                    },
                    {
                        id: 4,
                        time: '17:00'
                    },
                    {
                        id: 5,
                        time: '19:00'
                    },]
                },{
                    day: 21,
                    dayOfWeek: 'Wed',
                    time: [{
                        id: 1,
                        time: '11:00'
                    },
                    {
                        id: 2,
                        time: '13:00'
                    },
                    {
                        id: 3,
                        time: '15:00'
                    },
                    {
                        id: 4,
                        time: '17:00'
                    },
                    {
                        id: 5,
                        time: '19:00'
                    },]
                },
                {
                    day: 22,
                    dayOfWeek: 'Thu',
                    time: [{
                        id: 1,
                        time: '11:00'
                    },
                    {
                        id: 2,
                        time: '13:00'
                    },
                    {
                        id: 3,
                        time: '15:00'
                    },
                    {
                        id: 4,
                        time: '17:00'
                    },
                    {
                        id: 5,
                        time: '19:00'
                    },]
                },
                {
                    day: 23,
                    dayOfWeek: 'Fri',
                    time: [{
                        id: 1,
                        time: '9:00'
                    },
                    {
                        id: 2,
                        time: '11:00'
                    },
                    {
                        id: 3,
                        time: '13:00'
                    },
                    {
                        id: 4,
                        time: '15:00'
                    },
                    {
                        id: 5,
                        time: '17:00'
                    },
                    {
                        id: 6,
                        time: '19:00'
                    },
                    {
                        id: 7,
                        time: '21:00'
                    },]
                },
                {
                    day: 24,
                    dayOfWeek: 'Sat',
                    time: [{
                        id: 1,
                        time: '9:00'
                    },
                    {
                        id: 2,
                        time: '11:00'
                    },
                    {
                        id: 3,
                        time: '13:00'
                    },
                    {
                        id: 4,
                        time: '15:00'
                    },
                    {
                        id: 5,
                        time: '17:00'
                    },
                    {
                        id: 6,
                        time: '19:00'
                    },
                    {
                        id: 7,
                        time: '21:00'
                    },]
                },
                {
                    day: 25,
                    dayOfWeek: 'Sun',
                },
                {
                    day: 26,
                    dayOfWeek: 'Mon',
                },
                {
                    day: 27,
                    dayOfWeek: 'Tue',
                },
                {
                    day: 28,
                    dayOfWeek: 'Wed',
                },
                {
                    day: 29,
                    dayOfWeek: 'Thu',
                },
            ], */
            selectedDate: 3,
            sessions: '',
            isLoading: undefined,
            uniqueDate: [],
            selectedTime: '',
            isUniq: false,

            swiperDateStart: 0,
            swiperDateEnd: 7,

            }
        
        },

        methods: {
            async FetchSession() {
                await axios.get(this.BASE_URL + "/api/Session/films/" + await this.film.filmId, { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.sessions = res.data;
                    console.log(res);
                    this.isLoading = false;
                    
                })
                .catch(error => console.log(error)) 
            },
            async FetchPlaces() {
                await axios.get(this.BASE_URL + "/api/CinemaHalls/places/1" + await this.film.filmId, { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.sessions = res.data;
                    console.log(res);
                    
                })
                .catch(error => console.log(error)) 
            },
            GetDate(date) {
                var _date = new Date(Object.assign(date).split("T")[0]);
/*                 console.log(_date)

                console.log(_date.toDateString().split(' ')) */

                return (_date.toDateString().split(' '))

                /* console.log(Date.parse(arr)); */
            },
            getDay(date) {
                var _date = this.GetDate(date)
                return _date[0]
            },
            getDate(date) {
                return this.GetDate(date)[2]
            },
            getYear(date) {
                return this.GetDate(date)[4]
            },
            uniqueFast(sessions) {
                var seen = {};
                var out = [];
                var len = sessions.length;
                var j = 0;
                for(var i = 0; i < len; i++) {
                    var item = sessions[i].date;
                    if(seen[item] !== 1) {
                        seen[item] = 1;
                        out[j++] = item;
                        }
                    }
                this.uniqueDate = Object.assign(out)
                this.isUniq = true
            },
            goBack() {
                this.isLoading === undefined
                this.$emit('CloseTicket', true)
            },


            swipeLeft() {
                this.uniqueDate.push(this.uniqueDate.shift())
            },

            swipeRight() {
                this.uniqueDate.unshift(this.uniqueDate.pop())
            }
            
        },
        beforeUpdate() {
            if(this.isLoading === undefined) 
                this.FetchSession()
            
            if(!this.isUniq && this.sessions !== '')
            {
                this.uniqueFast(this.sessions)
                console.log(this.uniqueDate)
            }


        },
        computed: {
                ...mapState({
                    token: state => state.post.token,
                    BASE_URL: state => state.post.BASE_URL,
            }),
        }
        
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    .container {
        justify-content: flex-start;
        .background__image {
            position: absolute;
            bottom: 0;
            justify-self: flex-end;
            height: 60vh;
            width: 100%;
            background-repeat: no-repeat;
            background-position-x: center;
            background-size: 100vh;
            background-image: url(../assets/planet.png);
            opacity: .5;
            
        }

        .menu {
            display: flex;
            height: 6vh;
            width: 100%;
            position: relative;
            justify-self: flex-start;
            left: 0;
            top: 4vh;
            background-repeat: no-repeat;
            background-size: contain;
            align-items: center;
            justify-content: center;

            .go-back {
                top: 34%;
            }

            h3 {
                margin-bottom: 0;
                justify-self: center;
            }
        }
        .swiper__date {
            margin-top: 8vh;
            width: 100%;
            ul {    
                display: flex;
                justify-content: space-evenly;


                li {
                    list-style: none;
                    font-size: .95rem;
                    line-height: 1.2rem;
                    text-align: center;
                    margin-bottom: 1vh;
                    color: $white;
                    font-weight: 500;

                    p{
                        margin-bottom: 1vh;
                        width: 10vw;
                    }
                }

               li:nth-child(4) {
                    font-weight: bolder;
                    transform: scale(1.3);
                    p:nth-child(2) {
                        transform: scale(1.4);
                    }
                }
                
                li:nth-child(3), li:nth-child(5) {
                    opacity: .7;
                }
                li:nth-child(2), li:nth-child(6) {
                    opacity: .4;
                }
                li:nth-child(1), li:nth-child(7) {
                    opacity: .1;
                }
            }
        }

        .swiper__time {
            margin-top: 4vh;
            width: 100%;

            ul {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                li {
                    list-style: none;
                    font-size: 1.1rem;
                    line-height: 1.4rem;
                    text-align: center;
                    margin-bottom: 1vh;
                    color: $white;
                    font-weight: 300;
                }

                li.active {
                    transform: scale(1.4);
                    margin: 0 10px;
                    font-weight: 600;
                    padding-bottom: 15px;
                }

                li.prev-next {
                    transform: scale(1.4);
                    margin: 0 10px;
                    font-weight: 600;
                    padding-bottom: 15px;
                }

                li.prev-next {
                    opacity: .5;
                }

                /*li:nth-child(3) {
                    transform: scale(1.4);
                    margin: 0 10px;
                    font-weight: 600;
                    padding-bottom: 15px;
                }
                li:nth-child(2), li:nth-child(4)  {
                    opacity: .6;
                }
                li:nth-child(1), li:nth-child(5)  {
                    opacity: .2;
                }*/
            }
        }
    }
</style>