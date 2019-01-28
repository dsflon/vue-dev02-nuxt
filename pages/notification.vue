<template>
    <div>

        <app-header icon="user" />

        <main id="notification">
            <div class="lists contents">
                notification
            </div>

        </main>

        <app-footer />

    </div>
</template>

<script>
import AppHeader from '~/components/common/header.vue'
import AppFooter from '~/components/common/footer.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        // if( to == "index" && from == "user-userid" ) {
            // user detailから来たとき
            // return "home-user"
        // } else {
            // 通常遷移
            return "slide-down"
        // }

    },
    components: {
        AppHeader,
        AppFooter
    },
    head () {
        return {
            title: "Notification | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "" }
            ]
        }
    },
    data () {
        return {
        }
    },
    created: function() {
    },
    mounted: function() {
    },
    destroyed: function() {
        window.prev = "notification";
    }

}
</script>
