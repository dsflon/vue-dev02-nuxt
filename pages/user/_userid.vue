<template>
    <div>

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
                    v-if="!error"
                    :type="{
                        page: 'detail',
                        userId: this.$route.params.userid,
                        followed: this.$store.state.detail.followed
                    }" />
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
        return to.name == 'user-userid' ? 'user' : ''
        // return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
    },
    data () {
        return {
            error: null,
            title: null,
            userData: null
        }
    },
    components: {
        AppHeader,
        AppFooter,
        DetailItem,
        FooterBtns
    },
    created: function() {

        if(!this.$route.params.userid) {

            this.error = "ユーザーが見つかりませんでした。"

        } else {

            let postData = {
                "search_user_id": this.$route.params.userid,
                "user_id": this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null,
                "language_flg": "ja"
            };

            this.$store.dispatch('detail/GetDetailResult',postData)
            .then((json) => {
                // console.log("complete", json)
                this.error = null;
                this.userData = json.data;
            }).catch((error,txt)=>{
                console.error(txt);
                this.error = txt;
            })

        }
    },
    destroyed: function() {
        window.prev = "user";
    }
}
</script>
