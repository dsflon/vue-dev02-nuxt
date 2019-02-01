import Vuex from 'vuex'
import Fetch from '~/scripts/_fetch';
import Api from '~/plugins/_api';

// export const strict = false;

/**
 * State
 *
 */
export const state = () => ({
    myData: null,
    editData: null,
    signupData: null
})

/**
 * Mutations
 *
 */
export const mutations = {
    registerMyData(state, data) {
        state.myData = data
    },
    registerEditData(state, data) {
        state.editData = data
    },
    registerSignupData(state, data) {
        state.signupData = data
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

            localStorage.setItem(window.LSUser, JSON.stringify(data));
            context.commit('registerMyData', data);
            resolve(data);

        })
    },

    /**
     * プロフィール編集画面のデータを登録する
     * @param {object} data - My Data
     */
    SetEditData(context, data) {

        return new Promise((resolve, reject) => {

            context.commit('registerEditData', data);
            resolve(data);

        })
    },

    /**
     * プロフィール編集画面のデータをサーバに登録する
     * @param {object} data - My Data
     */
    SaveEditData(context, data) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            // Fetch(Api.detail, postData, (json) => {
            //     context.commit('registerEditData', data);
            //     window.Loading.Hide();
            //     resolve(json)
            // },() => {
            //     window.Loading.Hide();
            //     reject("Error!! : detail/GetDetailResult","サーバーに接続できませんでした。");
            // });
            setTimeout(()=> {
                context.commit('registerEditData', data);
                window.Loading.Hide();
                window.BodyMessage.AutoPlay("保存しました");
                resolve(data)
            },1000)


        })
    },

    /**
     * サインアップ時のデータを一時保存する
     * @param {object} data - My Data
     */
    SetSignupData(context, data) {

        return new Promise((resolve, reject) => {

            context.commit('registerSignupData', data);

        })
    },

    /**
     * サインインを行う
     * @param {object} postData - My Data
     */
    Signin(context, postData) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.signin, postData, (json) => {

                window.BodyMessage.AutoPlay( "サインインしました。" );
                window.Loading.Hide();

                localStorage.setItem(window.LSUser, JSON.stringify(json.data));
                context.commit('registerMyData', json.data)

                resolve(json.data)

            },() => {
                reject("Error!! : user/Signin","サインインできませんでした。");
                window.Loading.Hide();
            });

        })
    },

    /**
     * サインインを行う
     * @param {object} postData - My Data
     */
    Signup(context, postData) {

        window.Loading.Show();

        return new Promise((resolve, reject) => {

            Fetch(Api.signup, postData, (json) => {

                window.BodyMessage.AutoPlay( "サインアップしました。" );
                window.Loading.Hide();

                localStorage.setItem(window.LSUser, JSON.stringify(json.data));
                context.commit('registerMyData', json.data)

                resolve(json.data)

            },() => {
                reject("Error!! : user/Signup","サインアップできませんでした。");
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
