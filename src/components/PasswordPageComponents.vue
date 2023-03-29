<template>
    <div class="container" @keyup.enter="message">
        <span class="go-back" @click="this.$emit('ClosePassword', true)"></span>
        
        <span id="password"></span>

        <h3>Password</h3>
        <h4>Please select your desired password</h4>

        <input v-model="password"
                @focus="isSelected = true"
                @focusout="() => {if(password=== '')
                                isSelected = false}" 
                type="email" placeholder="Password">

        <button v-show="isSelected" @click="ConfirmReg">Done</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSelected: false,
                password: '',
            }
        },
        methods: {
            ConfirmReg() {
                if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(this.password))
                {
                    this.$emit('ConfirmReg', this.password)
                    return
                }
                console.log("Неверный пароль")
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "@/styles/variables";
.container {
    justify-content: center;
    #password {
        background: url(../assets/Password.svg);
        background-repeat: no-repeat;
        background-size: contain;
        width: 30vw;
        height: 10vh;
        margin-bottom: 4vh;
        background-position-x: center;
    }
    input {
        margin-bottom: 20 vh;
    }
    button {
        margin-bottom: 4vh;
    }
}

</style>