<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                <h1>Vuex</h1>
                <app-result></app-result>
                <app-another-result></app-another-result>
                <hr>
                <app-counter></app-counter>
                <app-another-counter></app-another-counter>
                <hr>
                <app-ani-counter></app-ani-counter>
                <hr>
                <input type="text" v-model="hfdhdth">
                <p> value: {{ hfdhdth }} </p>
            </div>
        </div>
    </div>
</template>

<script>
    import Counter from './Counter'
    import AnotherCounter from './AnotherCounter'
    import AniCounter from './AniCounter'
    import Result from './Result'
    import AnotherResult from './AnotherResult'
    import { mapGetters } from 'vuex'

    export default {
        name: 'vx',
        computed: {
            hfdhdth:{
                ...mapGetters({
                    get: 'stop/value'
                }),
                set(val){
                    this.$store.dispatch('stop/updateValue', val)
                }
            }
        },
        methods: {

        },
        components: {
            AppCounter: Counter,
            AppResult: Result,
            AppAnotherResult: AnotherResult,
            AppAnotherCounter: AnotherCounter,
            AppAniCounter: AniCounter,
        }
    }

</script>
