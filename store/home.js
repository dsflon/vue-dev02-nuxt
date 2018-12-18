import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

/**
 * State
 *
 */
export const state = () => ({
    searchResult: null,
    searchResultOrigin: null,
    filter: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    SetSearchResult(state, data) {
        state.searchResult = data
    },
    SetSearchResultOrigin(state, data) {
        state.searchResultOrigin = data
    }
}

/**
 * Actions
 *
 */
export const actions = {

    /**
     * 検索結果を受け取る
     * @param {object} postData - postするデータ
     */
    GetSearchResult(context, postData) {
        return new Promise((resolve, reject) => {

            Fetch(Api.search, postData, (json) => {
                // context.commit('SetSearchResultOrigin', json)
                // if(this.filter && Object.values(this.filter)[0]) {
                    // ListFilter( json, this.filter, (data) => {
                    //     this.actions.Result(data);
                    //     console.log(data);
                    // })
                // } else {
                    context.commit('SetSearchResult', json)
                    resolve(json)
                // }
            },() => {
                reject("Error!! : home/GetSearchResult");
            });

        })
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
