import Vuex from 'vuex'
import Fetch from '~/scripts/_fetch';
import ListFilter from '~/scripts/_listFilter';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    searchResult: null, // 検索結界のリストデータ（加工済みのものも入る）
    searchResultOrigin: null, // 検索結界のリストデータ
    filterData: null // フィルターの項目
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

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.search, postData, (json) => {
                window.Loading.Hide();
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
                window.Loading.Hide();
                reject("Error!! : home/GetSearchResult","サーバーに接続できませんでした。");
            });

        })
    },

    /**
     * 検索結果を登録する
     * @param {object} data - 検索結界のリストデータ
     */
    SetSearchResult(context, data) {
        context.commit('registerSearchResult', data)
    },

    /**
     * フィルタリングデータを登録する
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
