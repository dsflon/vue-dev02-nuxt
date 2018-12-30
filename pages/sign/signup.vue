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
                            @input="InputEmail"/>
                        </label>
                        <p class="a-form_error" ref="error"></p>
                    </div>
                    <div class="signin-btn">
                        <button
                        type="button"
                        class="a-btn_txt is_bg_blue"
                        :disabled="disabled"
                        @click="SendMail">メールを送信する</button>
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

export default {
    components: {
        Validate
    },
    data () {
        return {
            userid: false,
            pass: false,
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
                this.setState({ disabled: true })
                return false;
            }
            this.$refs.error.innerHTML = errorTxt ? errorTxt : null;
            this.disabled = errorTxt ? true : false;
        },
        SendMail(e) {
            e.preventDefault();
            window.Loading.Show();
            setTimeout( () => {
                window.Loading.Hide();
alert(`ご入力いただいたメールアドレスに
「info@steplack.com」からメールをお送りいたしました。

メールに記載されているURLより本登録を済ませてください。`)
            }, 2000)
        },
        Cancel: function(e) {
            e.preventDefault();
            this.$router.back()
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
