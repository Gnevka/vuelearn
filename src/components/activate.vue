<template>
    <div id="activate">
        <div class="login_form">
            <div class="container h100">
                <div class="row justify-content-md-center">
                    <div class="col-md-auto">
                    <section id="s1" class="login_page">
                        <div class="inner">
                        <div class="wrap">
                            <h1 style="text-align:center">Активация</h1>
                            <form action="" class="login" @submit.prevent="activate">
                            <h4>Пароль</h4>
                            <input required  v-model="password" id="password" type="password" placeholder="Пароль">
                            <h4>Ваш пароль</h4>
                            <input required  v-model="confirm" id ="password" type="password" placeholder="Подтверждение">
                            <br>
                            <input type="submit" id="submit" value="Войти в систему">
                            </form>
                        </div>
                        </div>
                    </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Http from '../utils/http'
export default {
    data() {
        return {
            key: null,
            password: null,
            confirm: null,
        }
    },
    computed: {
        apiUrl() {
            return this.$store.state.app.apiUrl
        }
    },
    methods: {
        check () {
            this.key = this.$route.params.key
        },
        activate () {
            var that = this
            Http.post(that.apiUrl + '/auth/activate', {key: that.key, password: that.password, confirm: that.confirm})
                .then(() => {
                    this.$router.push('/login')
                })
        }
    },
    created() {
        this.check()
    }
}
</script>