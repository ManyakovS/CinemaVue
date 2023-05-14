<template>
    <ul class="film__list">
        <li class="film__element">
            <p class="grid-col-1">Flm ID</p>
            <p class="grid-col-2">Film name</p>
            <p class="grid-col-3">Description</p>
            <p class="grid-col-4">Duration</p>
            <p class="grid-col-5">Start date</p>
            <p class="grid-col-6">End date</p>
            <p class="grid-col-7">Film rating</p>
        </li>
        <film-element class="film__element" v-for="film in films" :key="film.filmiD"
        :film="film">
        
        </film-element>
    </ul>
</template>

<script>
import FilmElement from './FilmElement.vue'
    export default {
  components: { FilmElement },
        props: {
            films: Array
        },
        methods: {
            getObject(object) {
                return Object.assign(object)
            }
        }
    }
</script>

<style lang="scss">
    .film__list {
        width: 100%;
        height: 100%;


        * {
            color: black
        }

        element {
            display: flex;
        }

        .film__element {
            list-style: none;
            height: fit-content;
    
            display: grid;
            grid-template-columns: 1fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr;
    
            * {
                color: black;
            }
    
            p {
                width: 100%;
                border: 2px solid black;
                box-sizing: border-box;
                padding: 5px;
    
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
        }
    }
</style>