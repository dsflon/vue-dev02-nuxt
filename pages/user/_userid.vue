<template>
    <div>
        <!-- <div class="detail-wrap" ref="detail_wrap"> -->

            <app-header
                :title="userData ? userData.user_name : ''"
                :userId=" $route.params.userid ? $route.params.userid : ''"
                :icon="$store.state.detail.followed ? 'followed' : ''" />

            <main id="detail">

                <div class="detail_inner">

                    <div class="contents">

                        <detail-item
                            v-if="!error && this.userData"
                            :userData="this.userData" />

                        <div v-else class="no_result">
                            <p>{{error}}</p>
                            <router-link to="/">
                                <i class="a-icon a-icon-arrow_left f-font_l"></i>
                                <span class="a-icon_txt">戻る</span>
                            </router-link>
                        </div>

                    </div>

                    <footer-btns
                        type="detail" />
                </div>

            </main>

        <!-- </div> -->
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
            return "user-home"
        }
        else if( to == "user-userid" && from == "user-post_userid-post-postid" ) {
            // postから来たとき
            return "post-user"
        }

    },
    data () {
        return {
            error: null,
            title: null,
            userData: null,
            // scrollVal: 0
        }
    },
    components: {
        AppHeader,
        AppFooter,
        DetailItem,
        FooterBtns
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
                if(!json) {
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
    },
    mounted: function() {
        // window.onscroll = () => {
        //     this.scrollVal = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        // }
    },
    beforeDestroy: function() {
        // console.log(this.scrollVal);
        // this.$refs.detail_wrap.style.transform = "translateY(-"+this.scrollVal+"px)"
    },
    destroyed: function() {
        window.prev = "user";
        // window.onscroll = null;
    }
}
</script>
