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

        return new Promise((resolve, reject) => {

            Fetch(Api.detail, postData, (json) => {
                context.commit('registerDetailResult', json.data)
                context.commit('registerFollowed', Boolean(json.data.followed))

                resolve(json)
            },() => {
                reject("Error!! : detail/GetDetailResult","サーバーに接続できませんでした。");
            });

        })
    },

    /**
     * Followを登録する
     * @param {object} followData -
     */
    SetFollowed(context, followData) {

        return new Promise((resolve, reject) => {

            Fetch(Api.follow, followData, () => {
                let followed = !context.state.followed;
                window.BodyMessage.AutoPlay( followed ? "フォローしました。" : "フォローを解除しました。" );
                context.commit('registerFollowed', followed)
                resolve(followed)
            },() => {
                reject("Error!! : detail/SetFollow","サーバーに接続できませんでした。");
            });

            // console.log("follow:", {
            //     "search_user_id": Number(e.currentTarget.id),
            //     "user_id": window.userData ? window.userData["user_id"] : null,
            //     "language_flg": "ja"
            // });
            //
            // setTimeout( () => {
            //     context.commit('registerFollowed', follow)
            // }, 1000)

        })


    }

}

/**
 * Getters
 *
 */
export const getters = {

}
