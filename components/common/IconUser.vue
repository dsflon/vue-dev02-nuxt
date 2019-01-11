<template>

    <div class="header_btns">
        <router-link v-if="!$store.state.user.myData" class="a-btn_user" to="/sign/signin"></router-link>
        <button v-else class="a-btn_user" @click="ToggleMenu()"></button>
    </div>

</template>


<script>
export default {
    // computed : {
    //     checkId () {
    //         return this.$store.state.user.myData && this.$store.state.user.myData.user_id === this.$route.params.userid
    //     }
    // },
    methods: {
        ToggleMenu: function() {
            this.$store.dispatch('common/ToggleMenu')
        }
    }
}
</script>
