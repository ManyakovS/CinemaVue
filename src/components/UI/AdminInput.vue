<template>
    <div>
        <input v-model="id" type="text">
        <button @click.prevent="this.$emit('ButtonClick', id)">Ввод</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                id: '',
            }
        }
    }
</script>

<style lang="scss" scoped>
    div {
        width: 100%;

        * { 
            color: #000;
        }

        input {
            width: 70%;
            height: 4vh;
        }

        button {
            cursor: pointer;
            width: 30%;
            height: 4vh;
        }
    }
</style>