const state = {
    userInfo : []
}
const getters = {
    getUserInfo :state => state.userInfo
}

const actions = {
    getInfo({commit}, val) {
        commit('CHANGE_INFO',val)
    }
}
const mutations = {
    CHANGE_INFO(state, newData) {
        state.userInfo = newData
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}

