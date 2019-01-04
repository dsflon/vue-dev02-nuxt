<template>

    <div id="signin">

        <div class="contents">

            <div class="signin-inner">

                <h1><img src="~/assets/images/common/logo.svg" alt="Step Lack"></h1>

                <form class="signin-form">

                    <div class="signin-input">
                        <label class="m-form_line">
                            <input
                            class="a-form_input"
                            type="number"
                            placeholder="ワンタイムパスワードを入力してください"
                            maxlength='6'
                            v-model="pass"
                            @input="InputOnetimePass"
                            @keypress="KeyPress"/>
                        </label>
                        <p class="a-form_error" ref="error"></p>
                    </div>
                    <div class="signin-btn">
                        <button
                        type="button"
                        class="a-btn_txt is_bg_blue"
                        :disabled="disabled"
                        @click="SendPass">ワンタイムパスワードを送信する</button>
                    </div>

                </form>

                <div class="signin-cancel">
                    <button
                        @click="Cancel">
                        <i class="a-icon a-icon-arrow_left"></i>
                        <span class="a-icon_txt">もう一度メールを送信する</span>
                    </button>
                </div>

            </div>

        </div>

    </div>

</template>

<script>
import Validate from '~/middleware/_validate';
import Fetch from '~/middleware/_fetch';
import Api from '~/plugins/_api';


export default {
    components: {
        Validate
    },
    head () {
        return {
            title: "Enter a one time password | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },
    data () {
        return {
            pass: null,
            disabled: true
        }
    },
    methods: {
        InputOnetimePass(e) {
            let val = e.currentTarget.value;
            this.disabled = val.length !== 6 ? true : false;
        },
        SendPass(e) {
            e.preventDefault();
            window.Loading.Show();

            let postData = {
                email: this.$router.history.current.query.email,
                confirmed_code: this.pass,
                language_flg: "ja"
            }

            Fetch(Api.sendOnetimePass, postData, (json) => {

                window.Loading.Hide();
alert(`ワンタイムパスワードを確認いたしました。

プロフィール編集画面に移動します。
引き続き Step Lack をお楽しみください。`)
                // this.$router.replace("/user/edit/");
                this.$router.replace("/search");
            },() => {
                window.Loading.Hide();
                alert("Error!! : ワンタイムパスワードを送信できませんでした。")
            });

        },
        KeyPress: function(e) {
            if(e.keyCode === 13) {
                e.preventDefault();
            }
        },
        Cancel: function(e) {
            e.preventDefault();
            this.$router.replace("/sign/signup");
        }
    },
    beforeCreate: function() {
        if( window.prev !== "signup" || !this.$router.history.current.query.email ) this.$router.replace("signup");
    },
    destroyed: function() {
        window.prev = "onetimepassword";
    }

}
</script>
