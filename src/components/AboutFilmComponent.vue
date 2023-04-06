<template>
    <div class="container"     
    @wheel.prevent
    @touchmove.prevent
    @scroll.prevent>
        <span class="go-back" @click="this.$emit('CloseAbout', true)"></span>

        <div class="film">
            <video src=""></video>

            <div class="film_desc">
                <h2>{{film.name}}</h2>
                <h3>{{film.tags}} Action, Sci-Fi, Thriller</h3>
            </div>

            <div class="images">

            </div>

            <div class="rating">IMDB {{film.rating}}</div>
        </div>


        <button @click.prevent="goBack" class="buy">Confirm</button>
    </div>
</template>

<script>
    export default {
        props: {
            film: {}
        },
        methods: {
            goBack() {
                this.$emit('OpenBuy', true)
            },
        },
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    
.container {
    justify-content: flex-start;

    .film {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        position: relative;
        height: 40vh;
        width: 100%;
        background-color: rgb(24, 83, 28);

        .film_desc {
            margin-left: 2vw;

            h3 {
                font-size: 1rem;
                color: $gray;
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
            background-color: rgba(255, 187, 0, 0.6);
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
}

</style>