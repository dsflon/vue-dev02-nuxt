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
