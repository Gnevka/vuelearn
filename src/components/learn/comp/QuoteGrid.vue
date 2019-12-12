<template>
    <div class="row">
        <app-quote v-for="(quote, id) in quotes" :key="id" 
        @click.native="deleteQuote(id)"> {{ quote }}</app-quote>
    </div>
</template>

<script>    
import Quote from './Quote';


export default {
    name: 'QuoteGrid',
    props: ['quotes'],
    components: {
        AppQuote: Quote
    },
    methods: {
        deleteQuote (id) {
            this.$emit('quoteDeleted', id);
        }
    }
    
}
</script>

<style >
   
</style>