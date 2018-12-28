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
import AppHeader from '~/components/common/Header.vue'
import AppFooter from '~/components/common/Footer.vue'

export default {
    components: {
        AppHeader,
        AppFooter
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
