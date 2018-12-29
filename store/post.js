import Vuex from 'vuex'
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    postResult: null,
    like: false,
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerPostResult(state, data) {
        state.postResult = data
    },
    registerLike(state, data) {
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
    GetPostResult(context, postData) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.post, postData, (json) => {
                context.commit('registerPostResult', json.data)
                window.Loading.Hide();
                resolve(json)
            },() => {
                window.Loading.Hide();
                reject("Error!! : post/GetPostResult","サーバーに接続できませんでした。");
            });

        })
    },

    /**
     * Followを登録する
     * @param {object} likeData -
     */
    // SetFollowed(context, likeData) {
    //
    //     window.Loading.Show();
    //
    //     return new Promise((resolve, reject) => {
    //
    //         Fetch(Api.follow, likeData, () => {
    //
    //             window.BodyMessage.AutoPlay( followed ? "いいねしました。" : "いいねを解除しました。" );
    //             window.Loading.Hide();
    //             context.commit('registerFollowed', followed)
    //             resolve(followed)
    //
    //         },() => {
    //             reject("Error!! : post/SetFollow","サーバーに接続できませんでした。");
    //             window.Loading.Hide();
    //         });
    //
    //     })
    //
    // }

}

/**
 * Getters
 *
 */
export const getters = {

}
