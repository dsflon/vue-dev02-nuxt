<template>

    <div v-if="type == 'detail'" class="m-btns is_sticky">
        <button class="a-btn" @click="goBackUser">
            <i class="a-icon a-icon-arrow_left"></i>
        </button>
        <!-- <button
            v-show="!this.$store.state.detail.followed"
            :id="this.$route.params.userid"
            class="a-btn is_l is_pink"
            @click="follow">
            <i class="a-icon a-icon-friends_plus"></i>
        </button> -->
        <router-link to="/message" class="a-btn is_l is_blue">
            <i class="a-icon a-icon-mail"></i>
        </router-link>
    </div>

    <div v-else-if="type == 'post'" class="m-btns is_sticky">
        <button class="a-btn" @click="goBackPost">
            <i class="a-icon a-icon-cross"></i>
        </button>
        <router-link to="/message" class="a-btn is_l is_blue">
            <i class="a-icon a-icon-mail"></i>
        </router-link>
    </div>

</template>


<script>
export default {

    props: [
        "type"
    ],
    methods: {
        goBackUser() {
            if(history.length <= 2) {
                this.$router.push( "/" )
            } else {
                this.$router.back()
            }
        },
        goBackPost() {
            if(history.length <= 2) {
                this.$router.push( location.pathname.split("/post")[0] )
            } else {
                this.$router.back()
            }
        },
        // follow() {
        //
        //     let postData = {
        //         "search_user_id": this.$route.params.userid,
        //         "user_id": this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null,
        //         "language_flg": "ja"
        //     };
        //
        //     this.$store.dispatch('detail/SetFollowed',postData)
        //     .then((data) => {
        //         // console.log("complete", data)
        //     }).catch((error,txt)=>{
        //         console.error(error);
        //         alert(txt)
        //     })
        //
        // }
    },
    mounted: function() {
    }

}
</script>
