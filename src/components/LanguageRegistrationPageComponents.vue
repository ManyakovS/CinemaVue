<template>
    
    <div class="container" >
        <span class="close" @click="this.$emit('CloseLang', true)"></span>

        <h3>Начнем</h3>
        <h4>Выберите язык</h4>

        <div class="swiper_country" @wheel="scroll">
            <ul class="swiper_country__list"
            @touchstart="startMove"
            v-touch:swipe.top="swipeTop"
            v-touch:swipe.bottom="swipeBottom"
            @touchmove="moved"
            @touchend="endMove"
            >
            <transition name="list" v-for="lang in language.slice(0,7)" :key="lang.id"
            >
                <li class="swiper__item">{{lang.name}}</li>
            </transition>
            </ul>
        </div>

        <button @click="this.$emit('OpenEmail', Object.assign(language.filter(x => x.id === val ))[0])">Next</button>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                language: [
                    {
                        id:1, name: 'Белорусский', tag:'Bel'
                    },
                    {
                        id:2, name: 'Украинский', tag:'Ukr'
                    },
                    {
                        id:3, name: 'Русский', tag:'Ru'
                    },
                    {
                        id:4, name: 'Английский', tag:'Eng'
                    },
                    {
                        id:5, name: 'Немецкий', tag:'Dat'
                    },
                    {
                        id:6, name: 'Польский', tag:'Pol'
                    },
                    {
                        id:7, name: 'Словатский', tag:'Slo'
                    },
                    {
                        id:8, name: 'Китайский', tag:'Ch'
                    },

                ],
                selectedLanguage: '',
                val: 4,
                startY:0,
                y: 0,
                move:0,
                animate: false,

                translateY: 0,
            }
        },
        methods: {
            swipeTop() {
                this.move = 0
                this.language.push(this.language.shift())
                this.val += 1;
                if(this.val > 8) this.val = 1
            },
            swipeBottom() {
                this.move = 0
                this.language.unshift(this.language.pop())
                this.val -= 1;
                if(this.val < 1) this.val = 8
            },
            scroll(el) {
                if(el.deltaY > 0) this.swipeTop()
                else this.swipeBottom()
            },

            startMove(el) {
                this.startY = el.changedTouches[0].clientY
                this.y = el.changedTouches[0].clientY
            },
            moved(el) {
                this.move = el.changedTouches[0].clientY
                
                if(this.move > this.startY && this.y < this.move)
                {
                    if(this.y < this.move)
                        this.y = this.move

                    this.translateY -= 2.4
                    document.getElementsByClassName('swiper_country__list')[0].style.transition = "transform .1s linear;"
                    document.getElementsByClassName('swiper_country__list')[0].style.transform = "translateY(" + this.translateY +"px)"
                    if(this.translateY < -24)
                    {
                        this.swipeTop()
                        this.endAnimate()

                    }
                }
                if(this.move < this.startY && this.y > this.move)
                {
                    if(this.y > this.move)
                        this.y = this.move

                    this.translateY += 2.4
                    document.getElementsByClassName('swiper_country__list')[0].style.transition = "transform .1s linear;"
                    document.getElementsByClassName('swiper_country__list')[0].style.transform = "translateY(" + this.translateY +"px)"
                    if(this.translateY > 24)
                    {
                        this.swipeBottom()
                        this.endAnimate()
                    }
                }
                
            },
            endMove() {
                this.y = 0
                this.endAnimate()
            },
            endAnimate() {
                this.translateY = 0
                document.getElementsByClassName('swiper_country__list')[0].style.transition = "none"
                document.getElementsByClassName('swiper_country__list')[0].style.transform = "translateY(" + this.translateY +"px)"

            },
        },

        
    }

</script>

<style lang="scss" scoped>
@import "@/styles/variables";

    .container {
        #country {
            background: url(../assets/Country.svg);
            background-repeat: no-repeat;
            background-size: contain;
            width: 18vw;
            height: 9vh;
            margin-bottom: 4vh;
            background-position-x: center;
        }

        .swiper_country::before, .swiper_country::after {
            content: '';
            position: absolute;
            background: $black;
            left: 0;
            width: 100%;
            height: 40%;
            z-index: 100;
        }
        .swiper_country::after {
            bottom: -35px;
            height: 35%;
        }
        .swiper_country::before {
            top: -55px;
        }
        .swiper_country {
            position: relative;
            margin: 15vh 0 5vh 0;
            .swiper_country__list {
                transform: translateY(0px);

                transition: transform .1s linear;
                .swiper__item {
                    list-style: none;
                    font-size: 1.1rem;
                    line-height: 1.35rem;
                    text-align: center;
                    margin-bottom: 1vh;
                    color: $white;
                }
                .swiper__item:nth-child(1), .swiper__item:nth-child(7) {
                    opacity: .05;
                }
                .swiper__item:nth-child(2), .swiper__item:nth-child(6) {
                    opacity: .2;
                }
                .swiper__item:nth-child(3), .swiper__item:nth-child(5) {
                    opacity: .5;
                }
            }
        }
    }
</style>