<template>
    <div id="post">
        <div id="post_inner">

            <div class="contents is_btns_noheader">{postDom}</div>

            <footer-btns
                v-if="!error"
                type="post" />

        </div>
    </div>
</template>

<script>
import AppFooter from '~/components/common/Footer.vue'
import FooterBtns from '~/components/common/FooterBtns.vue'

export default {
    transition (to, from) {

        let pages = {
            'user-userid': 'user'
        }

        return to.name ? pages[to.name] : null;
    },
    data () {
        return {
            error: null,
        }
    },
    components: {
        AppFooter,
        FooterBtns
    },
    created: function() {
console.log(this.$route.params);
        // if(!this.$route.params.userid) {
        //
        //     this.error = "ユーザーが見つかりませんでした。"
        //
        // } else {
        //
        //     let postData = {
        //         "search_user_id": this.$route.params.userid,
        //         "user_id": this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null,
        //         "language_flg": "ja"
        //     };
        //
        //     this.$store.dispatch('detail/GetDetailResult',postData)
        //     .then((json) => {
        //         // console.log("complete", json)
        //         this.error = null;
        //         this.userData = json.data;
        //     }).catch((error,txt)=>{
        //         console.error(txt);
        //         this.error = txt;
        //     })
        //
        // }
    },
    destroyed: function() {
        window.prev = "post";
    }
}
</script>
