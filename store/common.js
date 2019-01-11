import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    menu: false
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerMenu(state, data) {
        state.menu = data
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
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
