<template>

    <div id="signin">

        <div class="signin-inner">

            <h1><img src="~/assets/images/common/logo.svg" alt="Step Lack"></h1>

            <form class="signin-form">

                <div class="signin-input">
                    <label class="m-form_line">
                        <input
                            class="a-form_input"
                            type="email"
                            placeholder="ユーザー名 or メールアドレス"
                            required
                            v-model="email"
                            @input="Email"
                            @keypress="KeyPress"/>
                    </label>
                    <p class="a-form_error">{{error}}</p>
                </div>
                <div class="signin-input">
                    <label class="m-form_line">
                    <input
                        class="a-form_input"
                        type="password"
                        @input="Password"
                        required
                        v-model="pass"
                        placeholder="パスワード"
                        @keypress="KeyPress"/>
                    </label>
                    <p class="a-form_error">{{errorPass}}</p>
                </div>
                <div class="signin-btn">
                    <button
                        type="button"
                        :disabled="disabled"
                        class="a-btn_txt is_bg_blue"
                        @click="Signin">サインイン</button>
                </div>

            </form>

            <div class="signin-sns">
                <p class="signin-sns_ttl">または</p>
                <button class="signin-sns_btn" @click="FBsignin">
                    <i class="a-icon a-icon-fb a-icon-1_5x"></i>
                    <span class="a-icon_txt">Facebookでサインイン</span>
                </button>
            </div>

            <div class="signin-cancel">
                <button @click="Cancel">
                    <i class="a-icon a-icon-arrow_left"></i>
                    <span class="a-icon_txt">戻る</span>
                </button>
            </div>

        </div>

        <div class="signin-new">
            <router-link to="/sign/signup" class="signin-new_btn">アカウントをお持ちでない方はこちら</router-link>
        </div>

    </div>
</template>

<script>
import Validate from '~/scripts/_validate';
import Fetch from '~/scripts/_fetch';

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "sign-one-time-password" && from == "sign-signup" ) {
            return "slide-left"
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
            title: "Signin | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },
    data () {
        return {
            email: null,
            pass: null,
            error: null,
            errorPass: null,
            disabled: true
        }
    },
    methods: {
        Email: function(e) {
            let val = e.currentTarget.value,
                validate = Validate.userid(val),
                errorTxt = validate !== true ? validate.message : null;
            if(!val) {
                this.error = null;
                this.userid = false;
                return false;
            }
            this.error = errorTxt ? errorTxt : null;
            // this.email = errorTxt ? false : true;
            this.BtnDisabled();
        },
        Password: function(e) {
            let val = e.currentTarget.value;
            this.errorPass = this.pass.length < 6 ? "6文字以上必要です" : null;
            this.BtnDisabled();
        },
        KeyPress: function(e) {
            if(e.keyCode === 13) {
                e.preventDefault();
            }
        },
        BtnDisabled: function() {
            this.disabled = !this.error && !this.errorPass && this.email && this.pass ? false : true;
        },
        Cancel: function(e) {
            e.preventDefault();
            this.$router.back()
            // this.$router.push("/search")
        },
        Signin: function(e) {
            e.preventDefault();

            this.$store.dispatch('user/Signin',{
                "id": this.email,
                "password": this.pass
            })
            .then((data)=>{
                this.$router.replace("/");
            })
            .catch((error,txt)=>{
                console.error(txt);
            })
        },
        FBsignin: function(e) {
            e.preventDefault();
            alert("Facebook signin !!")
        }
    },
    mounted: function() {
    },
    destroyed: function() {
        window.prev = "signin";
    }

}
</script>
