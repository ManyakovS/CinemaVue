<template>
    <div class="post">
        <div class="content">
            <p>
                �����:<br>
                {{users}}
                <br>
                {{film}}
            </p>
        </div>
    </div>
</template>

<script lang="js">
    import axios from 'axios';
    import { defineComponent } from 'vue';

    export default defineComponent({
        data() {
            return {
                loading: false,
                users: null,
                film: null,
            };
        },
        created() {
            this.fetchUsers();
            this.fetchFilms();
        },
        methods: {
            async fetchUsers() { //������ � ������
                try {
                    const response = await axios.get('https://localhost:7172/api/User',

                    )

                    this.users = response.data

                } catch (e) {
                    console.log(e)

                } finally {
                    this.loading = false;
                }
            },

            async fetchFilms() { //������ � ������
                try {
                    const response = await axios.get('https://localhost:7172/api/Film',

                    )

                    this.film = response.data

                } catch (e) {
                    console.log(e)

                } finally {
                    this.loading = false;
                }
            },
        },
    });
</script>