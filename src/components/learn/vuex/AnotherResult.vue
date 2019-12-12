<template>
    <div>
        <p> Counter is: {{ counter }}</p>
        <p> Number of clicks: {{ click }}</p>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Result', 
    computed: {
        ...mapGetters({
            counter: 'stop/doubleCounter',
            click: 'stop/stringClick'
        })
    }
}
</script>