import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    detailResult: null,
    followed: false,
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerDetailResult(state, data) {
        state.detailResult = data
    },
    registerFollowed(state, data) {
        state.followed = data
    }
}

/**
 * Actions
 *
 */
export const actions = {

    /**
     * ユーザーデータを受け取る
     * @param {object} postData - postするデータ
     */
    GetDetailResult(context, postData) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.detail, postData, (json) => {
                context.commit('registerDetailResult', json.data)
                context.commit('registerFollowed', Boolean(json.data.followed))
                window.Loading.Hide();
                resolve(json)
            },() => {
                window.Loading.Hide();
                reject("Error!! : detail/GetDetailResult","サーバーに接続できませんでした。");
            });

        })
    },

    /**
     * ユーザーデータを格納する
     * @param {object} postData - postするデータ
     */
    SetDetailResult(context, postData) {

        return new Promise((resolve, reject) => {

            context.commit('registerDetailResult', postData)

        })
    },

    /**
     * Followを登録する
     * @param {object} followData -
     */
    SetFollowed(context, followData) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.follow, followData, () => {

                let followed = followData && followData.user_id ? true : false;
                window.BodyMessage.AutoPlay( followed ? "フォローしました。" : "フォローを解除しました。" );
                window.Loading.Hide();
                context.commit('registerFollowed', followed)
                resolve(followed)

            },() => {
                reject("Error!! : detail/SetFollow","サーバーに接続できませんでした。");
                window.Loading.Hide();
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
