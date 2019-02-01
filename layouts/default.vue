<template>
    <div id="app" ref="app" data-message>
        <nuxt/>
        <app-footer :class="{is_hide: CheckPage}" />
        <transition name="fade">
            <div v-if="$store.state.common.menu" @click="ToggleMenu()" class="overlay"></div>
        </transition>
    </div>
</template>

<script>
import AppFooter from '~/components/common/footer.vue'
import BodyMessage from '~/scripts/_bodyMessage';

export default {
    components: {
        AppFooter
    },
    methods: {
        ToggleMenu: function() {
            this.$store.dispatch('common/ToggleMenu')
        }
    },
    computed: {
        CheckPage() {
            switch (this.$route.name) {
                case "index":
                case "message":
                case "timeline":
                case "notification":
                return false

                default:
                return true
            }
        }
    },
    created: function() {

        // check account
        let user = localStorage.getItem(window.LSUser);

        if(user) {
            this.$store.dispatch('user/SetMyData',JSON.parse(user))
        }

    },
    mounted: function() {
        window.BodyMessage = new BodyMessage(this.$refs.app);
    }

}
</script>
