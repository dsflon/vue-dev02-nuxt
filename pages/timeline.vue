<template>
    <div>

        <app-header icon="user" />

        <main id="timeline">
            <div class="lists contents">
                timeline
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
