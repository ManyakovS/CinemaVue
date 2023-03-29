<template>
    <div class="container">
        <span class="logo"></span>

        <div class="text">
            <h3>Welcome to Cinema Ticket</h3>
            <h4>Start investing commission-free</h4>
            <p>Other fees may apply.<br>
                View our <span>fee schedule</span> to learn more.<br>
                All investing have risks.</p>
        </div>

        <span class="swiper"></span>

        <button @click="this.$emit('OpenLang', true)">Continue</button>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
    .container {
        
        .logo {
            background: url(../assets/ProjectLogo.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 42vw;
            height: 15vh;
            margin-bottom: 12vh;
            background-position-x: center;
        }

        .text {
            font-size: .95rem;
            line-height: 1.1rem;
            text-align: center;
            font-weight: 400;
            color: $white;
            margin-bottom: 4vh;

            p {
                color: $gray;
                span {
                    color: $green
                }
            }
        }

        .swiper, .swiper::after, .swiper::before {
            position: relative;
            border-radius: 50%;
            width: 4px;
            height: 4px;
            background-color: $gray;
            margin-bottom: 9.5vh;
        }

        .swiper::after, .swiper::before {
            position: absolute;
            content: '';
        }

        .swiper::before {
            left: -6px
        }

        .swiper::after {
            left: 6px
        }
    }
</style>