<template>
    <div>

        <app-header
            title="プロフィールを編集"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

        <main id="detail" class="is_edit">

            <div class="detail_inner">

                <div class="contents">

                    <edit-detail-item
                        v-if="$store.state.detail.detailResult"
                        :userData="$store.state.detail.detailResult" />

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
import EditDetailItem from '~/components/detail/EditDetailItem.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "user-userid-edit" && from == "user-userid" ) {
            return "slide-left"
        }
        else {
            // 通常遷移
            return "slide-down"
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
        }
    },
    components: {
        AppHeader,
        AppFooter,
        EditDetailItem,
        FooterBtns
    },
    methods: {
    },
    beforeCreate: function() {
        if(!this.$store.state.detail.detailResult)
            this.$router.replace( location.pathname.split("/edit")[0] )
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
