<template>
    <div>

        <app-header icon="user" />

        <main id="timeline">
            <div class="lists contents">
                timeline
            </div>

        </main>

        <!-- <app-footer /> -->

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
            return "fade"
        // }

    },
    components: {
        AppHeader,
        AppFooter
    },
    head () {
        return {
            title: "Timeline | Step Lack",
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
        window.prev = "timeline";
    }

}
</script>
