<template>
    <div class="container">
        <span class="go-back" @click="this.$emit('CloseEmail', true)"></span>

        <span id="email"></span>

        <h3>Email Address</h3>
        <h4>What is your email address?</h4>

        <input v-model="email"
                @focus="() => {isSelected = true}"
                @focusout="() => {if(email=== '')isSelected = false}" 
                type="email" placeholder="Email Address">

        <p v-show="!isSelected">For more information, see our  <a href="">Privacy Policy.</a></p>

        <button v-show="isSelected" @click="ConfirmEmail">Next</button>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                isSelected: false,
                email: '',
            }
        },
        methods: {
            ConfirmEmail() {
                // eslint-disable-next-line no-useless-escape
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
                {
                    this.$emit('OpenPassword', this.email)
                    return
                }
                console.log("Неверный емаил")
            }
        },
        watch: {
            isSelected() {
                if(this.isSelected) {
                    document.documentElement.style.overflow = 'hidden'
                    document.body.style.overflow = 'hidden'
                    return
                }
                document.documentElement.style.overflow = 'auto'
                document.body.style.overflow = 'hidden'
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.container {
    justify-content: center;
    #email {
        background: url(../assets/Email.svg);
        background-repeat: no-repeat;
        background-size: contain;
        width: 30vw;
        height: 10vh;
        margin-bottom: 4vh;
        background-position-x: center;
    }

    p {
        font-weight: 400;
        font-size: .8rem;
        line-height: 1rem;
        text-align: center;
        color: $white;
        margin-bottom: 11vh;

        a {
            color: $green;
            text-decoration: none;
        }
    }

    button {
        margin-bottom: 4vh;
    }
}

</style>