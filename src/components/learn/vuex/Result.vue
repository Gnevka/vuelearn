<template>
    <p> Counter is: {{ counter }}</p>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Result', 
    computed: {
        ...mapGetters({
            counter: 'stop/counter'
        })
    }
}
</script>