import Vuex from 'vuex'
import Fetch from '~/scripts/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    menu: false,
    pageData: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerMenu(state, data) {
        state.menu = data
    },
    registerPageData(state, data) {
        state.pageData = data
    }
}

/**
 * Actions
 *
 */
export const actions = {

    /**
     * メニューを開閉する
     */
    ToggleMenu(context) {
        return new Promise((resolve, reject) => {
            context.commit('registerMenu', !context.state.menu);
        })
    },

    /**
     * ページのタイトルなどを一時保存
     * @param {object} data - ページのデータ
     */
    SetPageData(context,data) {
        return new Promise((resolve, reject) => {
            context.commit('registerPageData', data);
            resolve(data)
        })
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
