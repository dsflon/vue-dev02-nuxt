<template>

    <div id="signin">

        <div class="signin-inner">

            <h1><img src="~/assets/images/common/logo.svg" alt="Step Lack"></h1>

            <form class="signin-form">

                <div class="signin-input">
                    <label class="m-form_line">
                        <input
                        class="a-form_input"
                        type="number"
                        autofocus
                        required
                        placeholder="ワンタイムパスワード"
                        maxlength="6"
                        v-model="pass"
                        @input="InputOnetimePass"
                        @keypress="KeyPress"/>
                    </label>
                    <p class="a-form_error"></p>
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

</template>

<script>
import Validate from '~/scripts/_validate';
import Fetch from '~/scripts/_fetch';
import Api from '~/plugins/_api';


export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "sign-one-time-password" && from == "sign-signup" ) {
            return "slide-left"
        }
        else if( to == "sign-password" && from == "sign-one-time-password" ) {
            return "slide-right"
        }
        else {
            // 通常遷移
            return "fade"
        }

    },
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

            let postData = this.$store.state.user.signupData;
            postData["confirmed_code"] = this.pass;

            Fetch(Api.sendOnetimePass, postData, (json) => {

                window.Loading.Hide();
alert(`ワンタイムパスワードを確認いたしました。

引き続き、パスワードを設定してください。`)
                this.$router.replace("/sign/password");
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
            this.$router.push("/sign/signup");
        }
    },
    beforeCreate: function() {
    },
    destroyed: function() {
        window.prev = "onetimepassword";
    }

}
</script>
