import Vuex from 'vuex'

export const state = () => ({
    user: null
})

// 同期処理はmutationsへ
// MutationはStateの変更に留める
export const mutations = {
    login(state, user) {
        state.user = user
    },
    logout(state) {
        state.user = null
    }
}

// 非同期処理はactionsへ
export const actions = {
    login(context, value) {
        context.commit('login', value)
    },
    writeUser(context, obj) {
        // コミットすることで状態変更が反映される
        // setTimeout(() => {
        //     context.commit('login', obj.name)
        //     if(obj.complete) obj.complete(obj.name)
        // }, 1000)

        // Promise を使うと終了タイミングがわかる
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                context.commit('login', obj.name)
                resolve(obj.name)
            }, 1000)
        })
    }
}

// ストアの算出プロパティ
export const getters = {
    getSplitUser(state, getters){
        let user = state.user ? state.user.split("_") : null;
        console.log(user);
        return user ? (user[0] + user[1]) : null
    }
}
