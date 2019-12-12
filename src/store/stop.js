const state = {
    counter: 0,
    click: 0,
    value: 0
}

const getters = {
    value: state => state.value,
    counter: state => state.counter,
    click: state => state.click,
    doubleCounter: state =>  {
        return state.counter * 2;
    },
    stringClick: state => {
        return state.click + ' clicks'
    }
    
}

const mutations = {
    increment (state, payload) {
        state.counter += +payload;
        state.click++
    },
    decrement(state, payload) {
        state.counter -= +payload;
        state.click++
    },
    updateValue (state, payload) {
        state.value = payload;
    },
}

const actions = {
    increment: ({commit}, payload) => {
        commit('increment', payload);
    },
    decrement: ({commit}, payload) => {
        commit('decrement', payload);
    },
    anyncIncrement: ({commit}, payload) => {
        setTimeout(() => {
        commit('increment', payload.by);
        }, payload.duration);
    },
    anyncDecrement: ({commit}, payload) => {
        setTimeout(() => {
        commit('decrement', payload.by);
        }, payload.duration);
    },
    updateValue: ({commit}, payload) => {
        commit('updateValue', payload);
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}