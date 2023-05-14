<template>
    <div class="grid__container">
        <div class="menu">
            <ul>
                <admin-list-element 
                v-for="fun in functions" 
                :key="fun.id"               
                :func="fun.name"
                @SelectFunc="SelectFunc"
                @click="selectFunction(fun.id)">

                </admin-list-element>

            </ul>
        </div>

        <div class="work_place">
            <div class="modal" v-if="isVisibleModal">
                <h2>{{ selectedFunc.name }}</h2>

                    <admin-input 
                        v-if="selectedFunc.id === 2" 
                        @ButtonClick="Input">
                    </admin-input>

                    <users-list
                        v-if="selectedFuncName === 1"
                        :users="getArr(array)">
                    </users-list>
                
                    <film-list
                        v-if="selectedFuncName === 3"
                        :films="getArr(array)">
                    </film-list>

            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import AdminListElement from '@/components/UI/AdminListElement.vue';
import UsersList from '@/components/UI/UsersList'

import { isAdmin, refreshToken, getCookie } from '@/API/midleware';

import {
    FetchUsers, 
    FetchUsersForId, 
    DeleteUser, 
    FetchAllFilms, 
    FetchSessions,
    FetchTickets,

} from '@/API/methods'

import AdminInput from '@/components/UI/AdminInput.vue';
import FilmList from '@/components/UI/FilmList.vue';


import { toRaw } from 'vue';

    export default {
        components: {AdminListElement, UsersList, AdminInput, FilmList, },
        data() {
            return {
                functions: [
                    {
                        id: 1,
                        name: {
                        title: 'Пользователи',
                        func: [{
                                id: 1,
                                name: 'Выбрать всех'
                            },
                            {
                                id: 2,
                                name: 'Выбрать по id'
                            },
                            {
                                id: 3,
                                name: 'Добавить'
                            },
                            {
                                id: 4,
                                name: 'Удалить'
                            },
                        ]
                        },
                    },
                    {
                        id: 2,
                        name: {
                        title: 'Работники',
                        func: [{
                                id: 1,
                                name: 'Выбрать всех'
                            },
                            {
                                id: 2,
                                name: 'Выбрать по id'
                            },
                            {
                                id: 3,
                                name: 'Добавить'
                            },
                            {
                                id: 4,
                                name: 'Удалить'
                            },
                        ]
                        },
                    },
                    {
                        id: 3,
                        name: {
                        title: 'Фильмы',
                        func: [{
                                id: 1,
                                name: 'Выбрать всех'
                            },
                            {
                                id: 2,
                                name: 'Выбрать по id'
                            },
                            {
                                id: 3,
                                name: 'Добавить'
                            },
                            {
                                id: 4,
                                name: 'Удалить'
                            },
                        ]
                        },
                    },
                    {
                        id: 4,
                        name: {
                        title: 'Сессии',
                        func: [{
                                id: 1,
                                name: 'Выбрать всех'
                            },
                            {
                                id: 2,
                                name: 'Выбрать по id'
                            },
                            {
                                id: 3,
                                name: 'Добавить'
                            },
                            {
                                id: 4,
                                name: 'Удалить'
                            },
                        ]
                        },
                    },
                    {
                        id: 5,
                        name: {
                        title: 'Билеты',
                        func: [{
                                id: 1,
                                name: 'Выбрать всех'
                            },
                            {
                                id: 2,
                                name: 'Выбрать по id'
                            },
                            {
                                id: 3,
                                name: 'Добавить'
                            },
                            {
                                id: 4,
                                name: 'Удалить'
                            },
                        ]
                        },
                    }
                ],
                array: [],
                isVisibleModal: false,
                selectedFuncName: '',
                selectedFunc: '',
                selectId: '',
            }
        },
        methods: {
            ...mapMutations({
                setToken: 'post/setToken',
                setFilms: 'post/setFilms',
                setUser: 'post/setUser',
            }),
            async SelectFunc(selectedFunctype) {
                this.selectedFunc = selectedFunctype;

                if(selectedFunctype.id === 1){  //Выбрать всех
                    this.Fetch()
                }
                else if (selectedFunctype.id === 2 && this.selectId != '') { // Выбрать по id
                    this.FetchForId()
                }
                else if (selectedFunctype.id === 3 && this.selectId != '') { // Изменить
                    this.FetchForId()
                }
                else if (selectedFunctype.id === 4 && this.selectId != '') { //Удалить
                    this.Delete()
                }
            },

            async Fetch() {
                this.array = []
                if(this.selectedFuncName === 1) // 1 - Пользователи; 2 - Работники; 
                    FetchUsers(this.token).then(res => {
                        this.array = toRaw(res)
                        this.isVisibleModal = true
                        }
                    )

                if(this.selectedFuncName === 3) // 3 - Фильмы;
                    FetchAllFilms(this.token).then(res => {
                        this.array = toRaw(res)
                        this.isVisibleModal = true
                    })
                if(this.selectedFuncName === 4) //4 - Сессии;
                    FetchSessions(this.token).then(res => {
                        this.array = toRaw(res)
                        this.isVisibleModal = true
                    })
                if(this.selectedFuncName === 5) //5 - Билеты
                    FetchTickets(this.token).then(res => {
                        this.array = toRaw(res)
                        this.isVisibleModal = true
                    })


            },

            async FetchForId() {
                if(this.selectedFuncName === 1) {
                    FetchUsersForId(this.token, this.selectId).then(res => this.array = Array(res))
                    this.isVisibleModal = true
                }
            },

            async Delete(id) {
                if(this.selectedFuncName === 1)
                    DeleteUser(this.token, id).then(res => this.users = res)
            },


            Input(id) {
                this.selectId = id;
                this.SelectFunc(this.selectedFunc)
            },


            getArr(arr) {
                return toRaw(arr)
            },
            selectFunction(id) {
                this.selectedFuncName = id
                this.isVisibleModal = false
            }
        },

        computed: {
                ...mapState({
                    token: state => state.post.token,
                    BASE_URL: state => state.post.BASE_URL,
                    user: state => state.post.user,
            }),
        },
        async mounted() {
                await isAdmin(this.token).then(async res => {
                    if(res)
                        console.log('Succes')
                    else
                    {
                        await refreshToken().then(async res => {
                        this.setToken(res)
                        FetchUsersForId(this.token, await getCookie('UserID').then(res => res))
                        .then(async res => {
                            this.setUser(res)

                            await isAdmin(this.token).then(async res => {
                                if(res)
                                    console.log('Succes')
                                else
                                    this.$router.push('/film')
                            })
                        })
                    })
                    .catch(e => {
                        console.log(e)
                    }) 
                }
            })
         
        },
    }
</script>

<style lang="scss" scoped>
    .grid__container {
        overflow-x: hidden;
        display: grid;
        grid-template-columns: 1fr 3fr;
        min-height: 100vh;
        width: 100vw;
        
        * {
            color: black
        }

        .menu {
            grid-column: 1/2;
            border-right: 2px solid black;

            ul {
                margin: 10vh 0 0 2vh;
            }
        }

        .work_place {
            grid-column: 2/3;

            .modal {
                width: 100%;
                height: 100%;

                display: flex;
                flex-direction: column;

                h2 {
                    text-align: center;
                }
            }
        }
    }
</style>