<template>

    <div v-if="$store.state.detail" class="header_btns">
        <button
            :class="['a-btn_header is_m', $store.state.detail.followed ? 'is_pink' :  'is_gray']"
            @click="follow">
            <i class="a-icon a-icon-friends_check a-icon-1_75x"></i>
        </button>
    </div>

</template>


<script>
export default {

    methods: {
        follow() {

            let userId = this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null;

            if( userId ) {

                let postData = {
                    "search_user_id": !this.$route.params.userid ? this.$route.params.userid :  null,
                    "user_id": !this.$store.state.detail.followed ? userId :  null,
                    "language_flg": "ja"
                };

                this.$store.dispatch('detail/SetFollowed',postData)
                .then((data) => {
                    // console.log("complete", data)
                }).catch((error,txt)=>{
                    console.error(error);
                    alert(txt)
                })

            } else {

                alert(`ユーザー登録が必要です。`)

            }

        }
    }

}
</script>
