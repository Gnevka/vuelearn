<template>
    <div id="restore">
        <div class="login_form">
            <div class="container h100">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">

                <section id="s1" class="login_page" style="margin-top:30%">
                    <div class="inner">
                    <div class="wrap" style="text-align:center;width:450px">
                        <h1>Восстановление пароля</h1>
                        <div v-if="message" class="alert alert-success">
                            {{ message }}
                        </div>
                        <p style="margin-top:50px">Введите e-mail указанный при регистрации</p>
                        <form action="" class="login" @submit.prevent="restore">
                        <input required v-model="email" id="login" type="text" placeholder="Введите e-mail" style="margin-bottom:30px">
                        <br>
                        <a id="recovery" style="float:none" href="/login">Авторизация</a><br>
                        <a id="recovery" style="float:none" href="/registration">Регистрация</a><br>
                        <input type="submit" id="submit" style="margin-top:50px" value="Отправить">
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
            email: null,
            message: null,
        }
    },
    computed: {
        apiUrl() {
            return this.$store.state.app.apiUrl
        }
    },
    methods: {
        restore() {
            var that = this
            Http.post(that.apiUrl + 'auth/requestpassword', {email: that.email})
                .then(() => {
                    that.message = 'Проверьте вашу почту'
                })
        }
    }
}
</script>