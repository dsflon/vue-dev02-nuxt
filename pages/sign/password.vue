<template>

    <div id="signin">

        <div class="contents">

            <div class="signin-inner">

                <h1><img src="~/assets/images/common/logo.svg" alt="Step Lack"></h1>

                <form class="signin-form">

                    <p class="f-font_b">* 半角英数6文字以上</p>

                    <div class="signin-input">
                        <label class="m-form_line">
                            <input
                            class="a-form_input"
                            type="password"
                            placeholder="パスワード"
                            minlength='6'
                            autofocus
                            required
                            v-model="pass"
                            @input="InputPass"
                            @keypress="KeyPress"/>
                        </label>
                        <p class="a-form_error">{{error}}</p>
                    </div>
                    <div class="signin-input">
                        <label class="m-form_line">
                            <input
                            class="a-form_input"
                            type="password"
                            placeholder="パスワード再入力"
                            minlength='6'
                            required
                            v-model="passConf"
                            @input="InputPassConf"
                            @keypress="KeyPress"/>
                        </label>
                        <p class="a-form_error">{{errorConf}}</p>
                    </div>
                    <div class="signin-btn">
                        <button
                        type="button"
                        class="a-btn_txt is_bg_blue"
                        :disabled="disabled"
                        @click="SendPass">パスワードを送信する</button>
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
            title: "Enter a password | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },
    data () {
        return {
            pass: null,
            passConf: null,
            error: null,
            errorConf: null,
            disabled: true
        }
    },
    methods: {
        InputPass(e) {
            this.error = this.pass.length < 6 ? "6文字以上必要です" : null;
            if( this.passConf ) this.InputPassConf()
        },
        InputPassConf(e) {

            if( !this.pass || this.pass !== this.passConf ) {
                this.errorConf = "パスワードが一致しません";
            } else {
                this.errorConf = null;
            }

            this.BtnDisabled()
        },
        BtnDisabled() {
            this.disabled = this.pass && this.passConf && !this.error && !this.errorConf ? false : true;
        },
        SendPass(e) {
            e.preventDefault();
            window.Loading.Show();

            let postData = this.$store.state.user.signupData;
            postData["password__"] = this.pass;
            delete postData.confirmed_code;

            Fetch(Api.sendPass, postData, (json) => {

                window.Loading.Hide();
alert(`ワンタイムパスワードを確認いたしました。

プロフィール編集画面に移動します。
引き続き Step Lack をお楽しみください。`)
                // this.$router.push("/user/edit/");
                this.$router.push("/search");
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
        // if( window.prev !== "onetimepassword" || !this.$store.state.user.signupData ) this.$router.replace("/sign/signup");
    },
    destroyed: function() {
        window.prev = "password";
    }

}
</script>
