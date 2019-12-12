<template>
    <div class="container">
       
        <app-new-quote @quoteAdded="newQuote"></app-new-quote>
        <app-quote-grid :quotes="quotes" @quoteDeleted="deleteQuote"></app-quote-grid>
        <div class="row">
            <div class="col-sm-12 text-center">
                <div class="alert alert-info">Info: Clicl on  a Quote to Delete it! </div>
            </div>

        </div>
    </div>
</template>

<script>    
import QuoteGrid from './comp/QuoteGrid';
import NewQuote from './comp/NewQuote';


export default {

    name: 'unk',
    data () {
        return {
            quotes: [
                'Just a quote to see something'
            ],
            maxQuotes: 10
        }
    },
    methods: {
        newQuote (quote) {
            this.quotes.push(quote);
        },
        deleteQuote (id) {
            this.quotes.splice(id, 1);
        }
    },
    components: {
        AppQuoteGrid: QuoteGrid,
        AppNewQuote: NewQuote
    }
      
    
}
</script>

<style >
   
</style>