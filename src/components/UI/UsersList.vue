<template>
    <ul>
        <li >
            <p class="id">userID</p>
            <p class="username">userName</p>
            <p>Имя</p>
            <p>Фамилия</p>
            <p class="username">E-mail</p>
            <p class="date">Дата регистрации</p>
        </li>
        <li v-for="user in users" :key="user.userId">
            <p class="id">{{ user.userId }}</p>
            <p class="username">{{ user.userName }}</p>
            <p>{{ user.name }}</p>
            <p>{{ user.lastName }}</p>
            <p class="username">{{ user.email }}</p>
            <p class="date">{{ user.registratedDate.split('T')[0] }}</p>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            users: Object
        }
    }
</script>

<style lang="scss" scoped>
ul {

    margin-top: 4vh;

    li {
        width: 100%;
        height: 3vh;
        list-style: none;
        display: flex;

        p {
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1px solid black;
            color: black;
            width: 12.5vw;
        }

        .id {
            width: 8vw;
        }

        .username {
           width: 13.4vw;
        }

        .date {
            width: 15vw;
        }

    }
}
</style>