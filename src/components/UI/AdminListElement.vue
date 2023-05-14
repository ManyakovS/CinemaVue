<template>
    <li @click.self="isMore = !isMore">
        {{ func.title }}
        <div v-if="isMore">
            <p 
            v-for="f in func.func" 
            :key="f.id"
            @click="selectFunction(f)"
            >
            {{f.name}}
            </p>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            func: Object,
            
        },
        data() {
            return {
                isMore: false,
            }
        },
        methods: {
            selectFunction(f) {
                this.$emit('SelectFunc', f)
                this.isMore = false
            }
        }
    }
</script>

<style lang="scss" scoped>
li {
    font-size: 1.5rem;
    margin-bottom: 2vh;
    list-style: none;
    cursor: pointer;

    p {
        color: #000;
        margin-left: 2vw;
    }

}

</style>