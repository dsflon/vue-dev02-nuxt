import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import ListFilter from '~/middleware/_listFilter';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    searchResult: null,
    searchResultOrigin: null,
    filterData: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerSearchResult(state, data) {
        state.searchResult = data
    },
    registerSearchResultOrigin(state, data) {
        state.searchResultOrigin = data
    },
    registerFilterData(state, data) {
        state.filterData = data
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
                if(context.state.filterData && Object.values(context.state.filterData)[0]) {
                    ListFilter( json, context.state.filterData, (data) => {
                        context.commit('registerSearchResult', data)
                        resolve(data)
                    })
                } else {
                    context.commit('registerSearchResult', json)
                    resolve(json)
                }
                context.commit('registerSearchResultOrigin', json)
            },() => {
                reject("Error!! : home/GetSearchResult","サーバーに接続できませんでした。");
            });

        })
    },

    /**
     * 検索結果を格納する
     * @param {object} data - 検索結界のリストデータ
     */
    SetSearchResult(context, data) {
        context.commit('registerSearchResult', data)
    },

    /**
     * フィルタリングデータを格納する
     * @param {object} filterData - filterDataのオブジェクト
     */
    SetFilterData(context, filterData) {
        context.commit('registerFilterData', filterData)
    }

}

/**
 * Getters
 *
 */
export const getters = {

}
