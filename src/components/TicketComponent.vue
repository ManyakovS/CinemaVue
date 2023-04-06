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

                <li v-for="session in uniqueDate.slice(0,7)" :key="session.sessionId"
                v-touch:swipe.left="swipeLeftUniqDate"
                v-touch:swipe.right="swipeRightUniqDate"
               >
                    <p>{{ getDay(session) }}</p>
                    <p>{{ getDate(session) }}</p>
                </li>
            </ul>
        </div>

        <div class="swiper__time" v-if="isLoading === false">
            <ul>
                <li v-for="t in time" :key="t.id"
                v-touch:swipe.left="swipeLeftTime"
                v-touch:swipe.right="swipeRightTime"
                >
                    {{t.time.split(':')[0] + ":" + t.time.split(':')[1]}}
                </li>
            </ul>
        </div>

        <div class="places">
            <ul class="chair">
                <li v-for="ticket in tickets" :key="ticket.ticketId"
                @click.prevent="buyTicket(ticket)">

                    <span class="chair created" v-if="ticket.state === 'Created'"></span>
                    <span class="chair booked" v-if="ticket.state === 'Booked'"></span>
                    <span class="chair bought" v-if="ticket.state === 'Bought'"></span>
                    <span class="chair selected" v-if="ticket.state === 'Selected'"></span>

                </li>
            </ul>
            <ul class="row" >
                <li v-for="i in 7" :key="i">
                    {{i}}
                </li>
            </ul>
        </div>

        <ul class="chair_variats">
            <li><span class="chair created"></span> Avaible</li>
            <li><span class="chair booked"></span> Booked</li>
            <li><span class="chair bought"></span> Bought</li>
        </ul>


        <button @click.prevent="BuyConfirm">Confirm {{Price}}$</button>


    </div>

    <div class="modal buy_ticket" v-if="isSelectTicket" v-bind="selectedTicket" @click.self="isSelectTicket = !isSelectTicket">
        <div>
            <p>Row: {{selectedTicket.place[0].mumberOfRow}}</p>
            <p>Place: {{selectedTicket.place[0].numberOfPlace}} </p>
            <p>Cost: {{selectedTicket.cost}}</p>
            <button v-if="selectedTicket.state === 'Created'" @click.prevent="addTicketToList">add</button>
            <button v-if="selectedTicket.state === 'Selected'" @click.prevent="cancelTicket">cancel</button>
            <button v-else @click.prevent="isSelectTicket = !isSelectTicket">next</button>
        </div>
    </div>


    <div class="modal succes" v-if="isSuccesBuy" @click.self="isSuccesBuy = !isSuccesBuy">
        <div>
            <h2>Succes</h2>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {mapState} from 'vuex'
    export default {
        props: {
            film: Object,
            isReset: Boolean
        },
        data(){
            return {

            sessions: '',
            isLoading: undefined,
            isUniq: false,
            selectedSession: '',

            selectedDate: 3,
            swiperDateStart: 0,
            swiperDateEnd: 7,

            uniqueDate: [],
            time: [],
            timeCouter: '',
            selectedTime: '',
            tickets: [],
            Price: 0,
            isSelectTicket: false,
            selectedTicket: {
                ticketId:0,
                state:"",
                cost:300,
                sessionId:0,
                placeId:0,
                place: [{
                    cinemaHallId:0,
                    mumberOfRow:0,
                    numberOfPlace:0,
                    placeId:0,
                }],
                employeeId:1,
            },
            addTicket: [],
            isSuccesBuy: false,

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
            async FetchTicket() {
                await axios.get(this.BASE_URL + "/api/Ticket/" + this.selectedSession, { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.tickets = res.data;
                    console.log(res);
                    
                })
                .catch(error => console.log(error)) 
            },
            async FetchSelectedPlace() {
                console.log(this.selectedTicket.placeId)
                await axios.get(this.BASE_URL + "/api/CinemaHalls/place/" + this.selectedTicket.placeId, { headers: {"Authorization" : `Bearer ${this.token}`} })
                .then(res => {
                    this.selectedTicket.place = Object.assign(res.data);
                    console.log(res);
                    
                })
                .catch(error => console.log(error)) 
            },
            async PostTicket() {

/*                 await axios.put(this.BASE_URL + '/api/Ticket?TicketID='+this.selectedTicket.ticketId
                +'&state=Bought&SessionID='
                +this.selectedSession.sessionId
                +'&PlaceID='
                +this.selectedTicket.placeId 
                +'&UserID=1', { headers: {"Authorization" : `Bearer ${this.token}`} })
                .catch(error => console.log(error))  */

                await axios({
                method: 'put',
                url: this.BASE_URL + '/api/Ticket?TicketID='+this.selectedTicket.ticketId
                +'&state=Bought&SessionID='
                +this.selectedSession
                +'&PlaceID='
                +this.selectedTicket.placeId 
                +'&UserID=1',
                headers: {"Authorization" : `Bearer ${this.token}`},
/*                 data: {
                    TicketID: this.selectedTicket.ticketId,
                    state: 'Bought',
                    SessionID: this.selectedSession,
                    PlaceID: this.selectedTicket.placeId ,
                    EmployeeID: null,
                    UserID: 1
                } */
            })
            .then(res => {
                    console.log(res);
                    this.FetchTicket()
                    
                });

            },
            GetDate(date) {
                var _date = new Date(Object.assign(date).split("T")[0]);
/*                 console.log(_date)

                console.log(_date.toDateString().split(' ')) */

                return (_date.toDateString().split(' '))

                /* console.log(Date.parse(arr)); */
            },
            getDay(date) {/*  */
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
                this.Reset()
                this.$emit('CloseTicket', true)



            },
            swipeLeftUniqDate() {
                this.uniqueDate.push(this.uniqueDate.shift())
                this.time = this.sessions.filter(p => p.date === this.uniqueDate[this.selectedDate])
                this.selectTime()
            },
            swipeRightUniqDate() {
                this.uniqueDate.unshift(this.uniqueDate.pop())
                this.time = this.sessions.filter(p => p.date === this.uniqueDate[this.selectedDate])
                this.selectTime()
            },
            swipeLeftTime() {
                this.time.push(this.time.shift())
                this.SearchSession()
            },

            swipeRightTime() {
                this.time.unshift(this.time.pop())
                this.SearchSession()
            },
            selectTime() {
                if(this.time.length >= 5) this.timeCouter = 2 
                else if (this.time.length >= 3 && this.time.length <= 4) this.timeCouter = 1
                else this.timeCouter = 0
                this.SearchSession()
            },
            SearchSession() {
                this.selectedSession = this.time[this.timeCouter].sessionId
            },
            buyTicket(chair) {
                console.log(chair)
                this.selectedTicket = chair
                this.isSelectTicket = !this.isSelectTicket
                this.FetchSelectedPlace()
            },
            addTicketToList() {
                this.isSelectTicket = false;
                this.addTicket.push(this.selectedTicket)
                this.sumPrice()

                this.tickets[this.tickets.indexOf(this.selectedTicket)].state = "Selected"
            },
            cancelTicket() {
                this.tickets[this.tickets.indexOf(this.selectedTicket)].state = "Created"
                delete this.addTicket[this.addTicket.indexOf(this.selectedTicket)]
                this.isSelectTicket = false;
                this.sumPrice()
            },
            sumPrice() {
                this.Price = 0
                this.addTicket.forEach(p => this.Price += p.cost)
            },
            BuyConfirm() {
                while(this.addTicket.length > 0)
                {
                    this.selectedTicket = this.addTicket.pop()
                    this.PostTicket()
                    this.sumPrice()
                    this.isSuccesBuy = true
                    setTimeout(() => {this.isSuccesBuy = false}, 1000);
                }
            },
            Reset() {
                console.log("РЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕСЕЕЕТ")
                this.isLoading = undefined
                this.isUniq = false
                this.sessions = ''

                this.tickets = []
                this.time = []
                this.uniqueDate = []
                this.sessions = ''
            }

            
        },
        beforeUpdate() {
            if(this.isReset === false) {
                this.FetchSession()
                this.uniqueFast(this.sessions)
                this.time = this.sessions.filter(p => p.date === this.uniqueDate[this.selectedDate])
                this.selectTime()
            }
        },
        updated() {
            if(this.isLoading === undefined) 
                this.FetchSession()
            
            if(!this.isUniq && this.sessions !== '')
            {
                this.uniqueFast(this.sessions)
                this.time = this.sessions.filter(p => p.date === this.uniqueDate[this.selectedDate])
                this.selectTime()
            }


        },
        computed: {
                ...mapState({
                    token: state => state.post.token,
                    BASE_URL: state => state.post.BASE_URL,
            }),
        },
        watch: {
            selectedSession() {
                this.FetchTicket()
            }
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
                scroll-snap-type: x mandatory;


                li {
                    list-style: none;
                    font-size: .95rem;
                    line-height: 1.2rem;
                    text-align: center;
                    margin-bottom: 1vh;
                    color: $white;
                    font-weight: 500;
                    scroll-snap-align: start;

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



        .places {
            z-index: 2;
            align-self: flex-start;
            margin-left: 3vw;
            margin-top: 7vh;
            display: flex;
            opacity: .9;
            .chair {
                display: flex;
                flex-direction: row-reverse;
                flex-wrap: wrap;
                width: 90vw;


                li {
                    display: flex;
                    flex-direction: column;
                    list-style: none;
                    width: 9vw;
                    margin-top: 1vh;

                    span { 
                        width: 90%;
                    }

                }
            }
            .row {
                width: 6vw;
                display: flex;
                flex-direction: column-reverse;
                li{
                    list-style: none;
                    font-size: 1.3rem;
                    margin-top: 1vh;
                    padding: 2.5px 0 9.5px 1px;
                }
            }
        }

        .chair_variats {
            z-index: 2;
            margin-top: 5vh;
            display: flex;
            justify-content: space-between;

            li {
                align-items: center;
                display: flex;
                list-style: none;
                margin-right: 15px;

                span {
                    padding-bottom: 3px;
                }
            }
        }

        button {
            z-index: 2;
            margin-top: 3.5vh;
            padding: 3vh 12vw;
            background-color: $green;
            font-size: 1.3rem;
            border-radius: 20px;  
            font-weight: 600;  
        }



        .chair {
            min-width: 40px;
            height: 40px;
            object-fit: contain;
            background-repeat: no-repeat;
            background-size: 28px;
            background-position: center;
        }
        .created {
            background-image: url(../assets/WhiteSofa.svg);
        }
        .booked {
            background-image: url(../assets/YellowSofa.svg);
        }
        .bought {
            background-image: url(../assets/RedSofa.svg);
        }
        .selected {
            background-image: url(../assets/GreenSofa.svg);
        }



    }

    .modal {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 3;

        background-color: rgba($color: #000000, $alpha: .15);
        display: flex;
        justify-content: center;
        align-items: center;

        div {
            display: flex;
            flex-direction: column;
            height: 40vh;
            width: 80vw;
            background-color: rgba($color: $white, $alpha: .95);
            box-sizing: border-box;
            padding: 20% 10%;
            border-radius: 20px;
            font-weight: 600;
        }
    }
    .buy_ticket {
        p {
            margin-bottom: 1vh;
            color: $black;
            font-size: 1.2rem;
        }

        button {
            background-color: transparent;
            margin-top: 13vh;
            color: $black;
            font-size: 1.6rem;
        }
    }

    .succes {
        h2 {
            align-self: center;
            justify-self: center;
            font-size: 1.7rem;
            color: $black;
        }
    }
    
    
</style>