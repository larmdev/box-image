import axios from "axios"

export default ({
    namespaced: true,
    state: {
        token: null,
        user: null
    },
    getters: {
        authenticated(state) {
            return state.token && state.user
        },
        user(state) {
            return state.user
        }
    },

    mutations: {
        SET_TOKEN(state, token) {
            state.token = token
        },

        SET_USER(state, data) {
            state.user = data
        },
    },

    actions: {
        async signIn({ dispatch }, credentials) {
            let { data } = await axios.post('auth/sing-in', credentials);
            return dispatch('attempt', data.accessToken)
        },

        async signUp({ dispatch }, credentials) {
            console.log('credential', credentials)
            let { data } = await axios.post('auth/sing-up', credentials);
            dispatch('signIn', {username: data.username, password: credentials.password})
            return data
        },

        async attempt({ commit, state }, token) {
            if (token) {
                commit('SET_TOKEN', token)
            }

            if (!state.token) {
                return
            }

            try {
                let { data } = await axios.get('auth/me')
                commit('SET_USER', data)
            } catch (e) {
                console.log(e)
                commit('SET_TOKEN', null)
                commit('SET_USER', null)
            }
        },

        async signOut({ commit }) {
            commit('SET_TOKEN', null)
            commit('SET_USER', null)
        }
    },
})
