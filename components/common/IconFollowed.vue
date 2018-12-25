<template>

    <div class="header_user">
        <button
            id={userId}
            class="a-btn_header"
            @click="follow">
            <i class="a-icon a-icon-friends_check a-icon-1_75x f-txt_pink"></i>
        </button>
    </div>

</template>


<script>
export default {

    methods: {
        follow() {

            let postData = {
                "search_user_id": this.$route.params.userid,
                "user_id": null,
                "language_flg": "ja"
            };

            this.$store.dispatch('detail/SetFollowed',postData)
            .then((data) => {
                // console.log("complete", data)
            }).catch((error,txt)=>{
                console.error(error);
                alert(txt)
            })

        }
    }

}
</script>
