<template>
    <div>

        <app-header
            :title="SetTitle"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            :icon="checkId ? 'mypage' : 'followed'" />

        <main id="detail">

            <div class="detail_inner">

                <div class="contents">

                    <detail-item
                        v-if="!error && this.userData"
                        :userData="this.userData" />

                    <div v-else class="no_result">
                        <p>{{error}}</p>
                    </div>

                </div>

                <footer-btns
                    :type="checkId ? 'mypage' : 'detail'" />
            </div>

        </main>

    </div>
</template>

<script>
import AppHeader from '~/components/common/Header.vue'
import AppFooter from '~/components/common/Footer.vue'
import FooterBtns from '~/components/common/FooterBtns.vue'
import DetailItem from '~/components/detail/DetailItem.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "user-userid" && from == "index" ) {
            // homeから来たとき
            // return "user-home"
            return "slide-left"
        }
        if( to == "user-userid" && from == "user-userid-edit" ) {
            return "slide-right"
        }
        else if( to == "user-userid" && from == "user-userid-post-postid" ) {
            // postから来たとき
            return "post-user"
        }

    },
    head () {
        return {
            title: this.userData ? this.userData.user_name + " | User | Step Lack" : "ユーザーが見つかりません。 | User | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: this.userData ? this.userData.user_name + "さんのページです。" : "ユーザーが見つかりません。" }
            ]
        }
    },
    data () {
        return {
            error: null,
            userData: null
        }
    },
    components: {
        AppHeader,
        AppFooter,
        DetailItem,
        FooterBtns
    },
    computed : {
        SetTitle () { // ページタイトル部分のチラツキ対処
            let pageData = this.$store.state.common.pageData;
            if( !this.userData ) {
                return pageData ? pageData.title : ""
            } else {
                return this.userData.user_name
            }
        },
        checkId () {
            return this.$store.state.user.myData && this.$store.state.user.myData.user_id === this.$route.params.userid
        }
    },
    methods: {
        GetStart: function() {

            let postData = {
                "search_user_id": this.$route.params.userid,
                "user_id": this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null,
                "language_flg": "ja"
            };

            this.$store.dispatch('detail/GetDetailResult',postData)
            .then((json) => {
                if(!json || !json.data.user_id) {
                    this.error = "データが存在しません。";
                } else {
                    this.error = null;
                    this.userData = json.data;
                }
            }).catch((error,txt)=>{
                console.error(txt);
                this.error = txt;
            })

        }
    },
    created: function() {

        if(this.$store.state.detail.detailResult) this.userData = this.$store.state.detail.detailResult;

        if(!this.$route.params.userid) {

            this.error = "ユーザーが見つかりませんでした。"

        } else {

            if( window.prev !== "post" ) {
                this.GetStart();
            } else if( window.prev === "post" && !this.$store.state.detail.detailResult ) {
                this.GetStart();
            }

        }

        localStorage.setItem('steplack_lastpage', JSON.stringify({
            "page": location.pathname,
            "scroll": (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
            "time": new Date().getTime()
        }));

    },
    mounted: function() {
    },
    beforeCreate: function() {
        if( window.prev !== "post" ) this.$store.dispatch('detail/SetDetailResult',null)
    },
    destroyed: function(s) {
        window.prev = "user";
        localStorage.removeItem('steplack_lastpage');
    }
}
</script>
