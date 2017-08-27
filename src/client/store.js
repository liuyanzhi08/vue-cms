import Vuex from 'vuex'

const store = new Vuex.Store({
    state: {
        pagination: {
            page: 1,
            num: 10
        },
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos: state => {
            return state.todos.filter(todo => todo.done)
        }
    }
})

export default store;