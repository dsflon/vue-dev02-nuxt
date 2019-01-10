<template>
    <div>

        <app-header icon="user" />

        <main id="message">
            <div class="lists contents">
                message
            </div>

        </main>

        <app-footer />

    </div>
</template>

<script>
import AppHeader from '~/components/common/Header.vue'
import AppFooter from '~/components/common/Footer.vue'

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
            title: "Message | Step Lack",
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
        window.prev = "message";
    }

}
</script>
