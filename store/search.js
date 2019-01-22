import Vuex from 'vuex'
import Fetch from '~/scripts/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
* State
*
*/
export const state = () => ({
    // searchResult: null,
    inputBox: null,
    stationList: null,
    postData: null,
    jobList: null
})

/**
* Mutations
*
*/
export const mutations = {
    registerJobList(state, data) {
        state.jobList = data
    },
    registerStationList(state, data) {
        state.stationList = data
    },
    registerPostData(state, data) {
        state.postData = data
    },
}

/**
* Actions
*
*/
export const actions = {

    /**
    * JobListを取得する
    * @param {object} postData - postするデータ
    */
    GetJobList(context) {

        // window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.jobList, null, (json) => {
                // window.Loading.Hide();
                localStorage.setItem(window.LSJob, JSON.stringify(json));
                context.commit('registerJobList', json)
                resolve(json)
            },() => {
                // window.Loading.Hide();
                reject("Error!! : search/GetJobList","サーバーに接続できませんでした。");
            });

        })

    },

    /**
    * JobListを取得する
    * @param {object} data -JobListデータ
    */
    SetJobList(context, data) {
        context.commit('registerJobList', data)
    },

    /**
    * StationListを取得する
    * @param {string} value - 入力データ
    */
    GetStationList(context, value) {
        return new Promise((resolve, reject) => {

            Fetch(Api.stationList, {
                input_string: value
            }, (json) => {
                context.commit('registerStationList', json)
                resolve(json)
            },() => {
                reject("Error!! : search/SetStationList","サーバーに接続できませんでした。");
            });

        })

    },

    /**
    * StationListを登録する
    * @param {object} data -StationListデータ
    */
    SetStationList(context, data) {
        context.commit('registerStationList', data)
    },

    /**
    * PostDataを登録する
    * @param {object} data - PostData
    */
    SetPostData(context, data) {
        context.commit('registerPostData', data)
    }

}

/**
* Getters
*
*/
export const getters = {

}
