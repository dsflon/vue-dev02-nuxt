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
        window.prev = "message";
    }

}
</script>
