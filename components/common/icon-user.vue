<template>

    <div class="header_btns">

        <router-link
        v-if="!$store.state.user.myData"
        class="a-btn_user"
        to="/sign/signin"></router-link>

        <router-link
        v-else
        class="a-btn_user is_signin"
        :style="$store.state.user.myData.user_icon ? {'background-image': 'url(' + $store.state.user.myData.user_icon + ')'} : null"
        :to="'/user/'+$store.state.user.myData.user_id"></router-link>

    </div>

</template>


<script>
export default {
    // computed : {
    //     checkId () {
    //         return this.$store.state.user.myData && this.$store.state.user.myData.user_id === this.$route.params.userid
    //     }
    // },
}
</script>
