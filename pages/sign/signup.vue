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
                            type="email"
                            placeholder="メールアドレス"
                            v-model="email"
                            @input="InputEmail"
                            @keypress="KeyPress"/>
                        </label>
                        <p class="a-form_error" ref="error"></p>
                    </div>
                    <div class="signin-btn">
                        <button
                        type="button"
                        class="a-btn_txt is_bg_blue"
                        :disabled="disabled"
                        @click="SendMail">メールアドレスを送信する</button>
                    </div>

                </form>

                <div class="signin-sns">
                    <p class="signin-sns_ttl">または</p>
                    <button
                        class="signin-sns_btn"
                        @click="FBsignin">
                        <i class="a-icon a-icon-fb a-icon-1_5x"></i>
                        <span class="a-icon_txt">Facebookでサインアップ</span>
                    </button>
                </div>

                <div class="signin-cancel">
                    <button
                    @click="Cancel">
                        <i class="a-icon a-icon-arrow_left"></i>
                        <span class="a-icon_txt">戻る</span>
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
            title: "Signup | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },
    data () {
        return {
            email: null,
            disabled: true
        }
    },
    methods: {
        InputEmail(e) {
            let val = e.currentTarget.value,
                validate = Validate.mail(val),
                errorTxt = validate !== true ? validate.message : null;
            if(!val) {
                this.$refs.error.innerHTML = null;
                return false;
            }
            this.$refs.error.innerHTML = errorTxt ? errorTxt : null;
            this.disabled = errorTxt ? true : false;
        },
        SendMail(e) {
            e.preventDefault();
            window.Loading.Show();

            let postData = {
                email: this.email,
                language_flg: "ja"
            }

            Fetch(Api.sendEmail, postData, (json) => {

                window.Loading.Hide();
alert(`ご入力いただいたメールアドレスに
「register@steplack.com」からメールをお送りいたしました。

メールに記載されているワンタイムパスワードを次のページで入力してください。`)

                this.$router.replace("/sign/one-time-password?email="+this.email)

            },() => {
                window.Loading.Hide();
                alert("Error!! : メールアドレスを送信できませんでした。")
            });

        },
        KeyPress: function(e) {
            if(e.keyCode === 13) {
                e.preventDefault();
            }
        },
        FBsignin: function(e) {
            e.preventDefault();
            alert("Facebook signin !!")
        },
        Cancel: function(e) {
            e.preventDefault();
            // this.$router.back()
            this.$router.replace("/sign/signin");
        }
    },
    mounted: function() {
    },
    destroyed: function() {
        window.prev = "signup";
    }

}
</script>
