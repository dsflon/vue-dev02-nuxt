<template>

    <div v-if="type.page == 'detail'" class="m-btns is_sticky">
        <button class="a-btn" @click="goBack">
            <i class="a-icon a-icon-arrow_left"></i>
        </button>
        <button
            v-if="!type.followed"
            :id="type.userId"
            class="a-btn is_l is_pink"
            @click="follow">
            <i class="a-icon a-icon-friends_plus"></i>
        </button>
        <router-link to="/message" class="a-btn is_l is_blue">
            <i class="a-icon a-icon-mail"></i>
        </router-link>
    </div>

    <div v-else-if="type.page == 'post'" class="m-btns is_sticky">
        <button class="a-btn" @click="goBack">
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
        goBack() {
            this.$router.go(-1)
        },
        follow() {

            window.Loading.Show();

            let postData = {
                "search_user_id": "this.userId",
                "user_id": window.myData ? window.myData["user_id"] : null,
                "language_flg": "ja"
            };

            this.$store.dispatch('detail/SetFollowed',postData)
            .then((data) => {
                // console.log("complete", data)
                window.Loading.Hide();
            }).catch((error,txt)=>{
                console.error(error);
                alert(txt)
                window.Loading.Hide();
            })

        }
    }

}
</script>
