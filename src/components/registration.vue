<template>
    <div id="registration">
        <div class="registration_form">
            <div class="container h100">
            <div class="row justify-content-md-center">
                <div class="col-md-auto">
                <section id="s1" class="registration_page">
                    <div class="inner">
                    <div class="wrap">
                        <h1>Регистрация</h1>
                        <div v-if="message" class="alert alert-success">
                            {{ message }}
                        </div>
                        <form action="" @submit.prevent="registration" style="width:600px">
                        <h4>Ваш e-mail</h4>
                        <input v-model="email" id="login" type="text" placeholder="Введите e-mail" >
                        <br>
                        <div v-if="show">
                            <p class="text text-center" style="margin-top:50px">
                                Отправив настоящую заявку, я даю Компании НАЗВАНИЕ своё согласие на сбор и 
                                обработку моих персональных данных в соответствии с Федеральным законом 
                                от 27.07.2006 №152-Ф3 О персональных данных.
                            </p>
                            <br>
                            <p class="text text-center">
                                Срок данного согласия неограничен. Согласие может быть отозвано в любой момент
                                по моему письменному заявлению.
                            </p>
                        </div>
                        <label>
                            <input class="checkbox" type="checkbox" v-model="can" name="checkbox-test">
                            <span class="checkbox-custom"></span>
                            <span class="label">С <span style="color:lightblue;" @click="show =! show">условиями</span> подачи заявки ознакомлен(а)</span>
                        </label><br>
                        <a id="recovery" style="float:none" href="/login">Авторизация</a><br>
                        <a id="recovery" style="float:none" href="/restore">Забыли пароль?</a><br>
                        <input type="submit" id="submit" value="Зарегестрироваться">
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
            can: false,
            show: false,
            message: null
        }
    },
    computed: {
        apiUrl() {
            return this.$store.state.app.apiUrl
        }
    },
    methods: {
        registration() {   
            if (this.can !== true) {
                return
            } 
            var that = this
            Http.post(that.apiUrl + '/auth/registry', {email: that.email})
                .then(() => {
                    that.message = 'Проверьте вашу почту'
                })
        },
    }
}
</script>