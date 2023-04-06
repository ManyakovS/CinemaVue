<template>
    <div class="container">
        <div class="background__image"></div>
        <span class="white__circle"></span>

        <div class="menu">
            <span class="go-back" @click="this.$emit('ClosePassword', true)"></span>

            <h3>Tenet</h3>
        </div>

        <div class="swiper__date">
            <ul>
                <li v-for="d in date.slice(2,9)" :key="d.day">
                    <p>{{d.dayOfWeek}}</p>
                    <p>{{d.day}}</p>
                </li>
            </ul>
        </div>

        <div class="swiper__time">
            <ul>
                <li v-for="d in date.slice(4, 5)" :key="d.day">
                    <p v-for="t in d.time.slice(2,7)" :key="t.id">
                        {{t.time }}
                    </p>
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
    export default {

        
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

                li {
                    list-style: none;
                    font-size: 1.1rem;
                    line-height: 1.4rem;
                    text-align: center;
                    margin-bottom: 1vh;
                    color: $white;
                    font-weight: 300;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-evenly;

                }

                p:nth-child(3) {
                    transform: scale(1.4);
                    margin: 0 10px;
                    font-weight: 600;
                    padding-bottom: 15px;
                }
                p:nth-child(2), p:nth-child(4)  {
                    opacity: .6;
                }
                p:nth-child(1), p:nth-child(5)  {
                    opacity: .2;
                }
            }
        }
    }
</style>