import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    myData: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerMyData(state, data) {
        state.myData = data
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

        })
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
