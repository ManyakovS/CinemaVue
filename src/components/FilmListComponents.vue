<template>
    <div class="films">
        <div class="films__buttons">
            <h3>{{title}}</h3>

            <a href="#">See all</a>
        </div>

        <div class="film__list">
            <div v-for="film in films.slice(0,3)" :key="film.filmId" @click="this.$emit('OpenAboutFilm', film)">
                <img :src="require(`../assets/films/${getLink(film)}/p0.png`)" alt="">
                <p>{{film.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import {getLink} from '@/API/midleware'
    export default {
        props: {
            films: Array,
            title: String,
        },
        data() {
            return {
                name: 'ShazamFurythegods',
            }
        },
        methods: {
            getLink
        }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.films {
    position: relative;
    margin-top: 5vh;
    color: $white;
    .films__buttons {
        display: flex; 
        margin-bottom: 2vh;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;

        a {
            color: rgba($color: $white, $alpha: .8);
            text-decoration: none;
            font-size: 1.1rem;
        }
    }


    .film__list {
        display: flex;
        width: 90vw;
        justify-content: space-between;

        div {
            display: flex;
            flex-direction: column;
            width: 27.5vw;
            height: 26vh;

            img {
                width: 100%;
                object-fit: fill;
            }

            p {
               margin-top: 1vh;
               text-align: center;
               font-weight: 400;
            }

        }
    }
}

</style>