<template>
    <div class="container"     
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent>
        <span class="go-back" @click="this.$router.push('/film')"></span>

        <div class="film">
            <img :src="require(`@/assets/films/${getLink(film)}/p1.png`)" alt="">

            <div class="film_desc">
                <h2>{{film.name}}</h2>
                <h3>{{film.tags}} Action, Sci-Fi, Thriller</h3>
            </div>

            <div class="images">
                
            </div>

            <div class="rating">IMDB {{film.rating}}</div>
        </div>

        <div class="time">
            <p>Time</p>
            <h3>{{ film.duration }} Min</h3>
        </div>

        <div class="desctiption">
            <h2>Desctiption</h2>
            <p>{{ film.description }}</p>
        </div>

        <button @click.prevent="goBack" class="buy">Confirm</button>
    </div>
</template>

<script>
import {getLink} from '@/API/midleware'
    export default {
        props: {
            film: {}
        },
        methods: {
            goBack() {
                this.$emit('OpenBuy', true)
            },
            getLink
        },
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    
.container {
    justify-content: flex-start;

    .film {
        position: relative;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        height: 35vh;
        width: 100%;
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: .7;
        }

        .film_desc {
            position: absolute;
            left: 2vw;
            bottom: 0;

            h2 {
                max-width: 45vw;
            }
            h3 {
                font-size: 1rem;
                color: $white;
                font-weight: 400;
            }

        }

        .rating {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            bottom: 10%;
            left: calc(58% - 26vw /2);
            width: 26vw;
            height: 4vh;
            font-weight: 600;
            font-size: 1.1rem;
            text-align: center;
            background-color: rgba(255, 187, 0, .9);
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
            border-radius: 14px;
            color: black;
        }

        .images {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20vh;
            width: 14vw;
            background-color: $gray;
            right: calc(15% - 14vw /2);;
            bottom: 10%;
            border-radius: 14px;

        }
    }

    .buy {
        position: fixed;
        width: 80vw;
        height: 6vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $black;
        bottom: 4%;
        left: calc(50% - 80vw /2);
        background-color: $green;
        border-radius: 14px;
        font-size: 1.3rem;
    }

    .time {
        margin-top: 1vh;
        p {
            text-align: center;
            font-size: 1.1rem;
            color: $gray;
            margin-bottom: .5vh;
        }
    }

    .desctiption {
        margin-top: 2vh;
        h2 {
            text-align: center;
            color: rgba($color: $white, $alpha: .9);
        }
        p {
            margin: 1vh 5vw;
            color: rgba($color: $white, $alpha: .9);
        }
    }
}

</style>