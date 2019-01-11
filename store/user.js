import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    myData: null,
    signupData: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerMyData(state, data) {
        state.myData = data
    },
    registerSignupData(state, data) {
        state.signupData = data
    }
}

/**
 * Actions
 *
 */
export const actions = {

    /**
     * ユーザーデータを登録する
     * @param {object} data - My Data
     */
    SetMyData(context, data) {

        return new Promise((resolve, reject) => {

            context.commit('registerMyData', data);
            resolve(data);

        })
    },

    /**
     * サインアップ時のデータを一時保存する
     * @param {object} data - My Data
     */
    SetSignupData(context, data) {

        return new Promise((resolve, reject) => {

            context.commit('registerSignupData', data);

        })
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
