<template>
    <li class="film__element">
        <p class="grid-col-1">{{ film.filmId }}</p>
        <p class="grid-col-2">{{ film.name }}</p>
        <p class="grid-col-3">{{ film.description }}</p>
        <p class="grid-col-4">{{ film.duration }}</p>
        <p class="grid-col-5">{{ film.rentalStartDate.split('T')[0] }}</p>
        <p class="grid-col-6">{{ film.rentalEndtDate.split('T')[0] }}</p>
        <p class="grid-col-7">{{ film.rating }}</p>
    </li>
</template>

<script>
    export default {
        props: {
            film: Array
        },
        mounted() {
            console.log(this.film)
        }
    }
</script>

<style lang="scss">

</style>