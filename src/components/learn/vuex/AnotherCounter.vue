<template>
    <div>
        <button class="btn btn-primary" @click="anyncIncrement({by: 50, duration: 500})">Increment</button>
        <button class="btn btn-primary" @click="anyncDecrement({by: 50, duration: 500})">Decrement</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'AnotherCounter',
    methods: {
        ...mapActions({
            anyncIncrement: 'stop/anyncIncrement',
            anyncDecrement: 'stop/anyncDecrement'
        })  
    }
      
}
</script>