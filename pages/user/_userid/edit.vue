<template>
    <div>

        <app-header
            title="プロフィールを編集"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

        <main id="detail">

            <div class="detail_inner">

                <div class="contents">
                    EDIT

                    <!-- <detail-item
                        v-if="!error && this.userData"
                        :userData="this.userData" />

                    <div v-else class="no_result">
                        <p>{{error}}</p>
                    </div> -->

                </div>

                <footer-btns
                    type="edit" />
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
            return "user-home"
        }
        else if( to == "user-userid" && from == "user-userid-post-postid" ) {
            // postから来たとき
            return "post-user"
        }

    },
    head () {
        return {
            title: this.userData ? this.userData.user_name + " | Edit Profile | User | Step Lack" : "ユーザーが見つかりません。 | Edit Profile | User | Step Lack",
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
    methods: {
        GetStart: function() {
        }
    },
    created: function() {

    },
    mounted: function() {
    },
    beforeDestroy: function() {
    },
    destroyed: function() {
        window.prev = "edit";
    }
}
</script>
