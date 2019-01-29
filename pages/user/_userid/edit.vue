<template>
    <div>

        <app-header
            title="プロフィールを編集"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

        <main id="detail" class="is_edit">

            <div class="detail_inner">

                <form ref="form" class="contents">

                    <edit-item
                        v-if="userData"
                        :OnFocus="OnFocus"
                        :OnBlur="OnBlur"
                        :userData="userData" />

                </form>
                <transition name="fade">
                    <footer-btns v-if="!onfocus" type="edit" :SaveData="SaveData" />
                </transition>
            </div>

        </main>

    </div>
</template>

<script>
import AppHeader from '~/components/common/header.vue'
import AppFooter from '~/components/common/footer.vue'
import FooterBtns from '~/components/common/footer-btns.vue'
import EditItem from '~/components/mypage/edit-item.vue'

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
    data() {
        return {
            onfocus: false,
            userData: JSON.parse(JSON.stringify(this.$store.state.detail.detailResult)),
            postData: { info: [], menu: [] }
        }
    },
    components: {
        AppHeader,
        AppFooter,
        EditItem,
        FooterBtns
    },
    methods: {
        OnFocus() { this.onfocus = true; },
        OnBlur() { this.onfocus = false; },
        SaveData() {
            // alert("Save data !")
            console.log(this.userData);
            // this.$router.replace( location.pathname.split("/edit")[0] )
        }
    },
    beforeCreate: function() {
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
