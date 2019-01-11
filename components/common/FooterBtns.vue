<template>

    <div v-if="type == 'detail'" class="m-btns is_sticky">
        <button class="a-btn" @click="backHome">
            <i class="a-icon a-icon-arrow_left"></i>
        </button>
        <router-link to="/message" class="a-btn is_l is_blue">
            <i class="a-icon a-icon-mail"></i>
        </router-link>
    </div>

    <div v-else-if="type == 'post'" class="m-btns is_sticky">
        <button class="a-btn" @click="backUserDetail">
            <i class="a-icon a-icon-cross"></i>
        </button>
        <router-link to="/message" class="a-btn is_l is_blue">
            <i class="a-icon a-icon-mail"></i>
        </router-link>
    </div>

    <div v-else-if="type == 'mypage'" class="m-btns is_sticky">
        <button class="a-btn" @click="backHome">
            <i class="a-icon a-icon-cross"></i>
        </button>
        <button class="a-btn is_l is_blue">
            <i class="a-icon a-icon-picture_plus"></i>
        </button>
    </div>

    <div v-else-if="type == 'edit'" class="m-btns is_sticky">
        <button class="a-btn" @click="backMyPage">
            <i class="a-icon a-icon-cross"></i>
        </button>
        <button class="a-btn is_blue" @click="saveData">
            <i class="a-icon a-icon-check"></i>
        </button>
    </div>

</template>


<script>
export default {

    props: [
        "type"
    ],
    methods: {
        backHome() {
            if( history.length < 2 ) {
                this.$router.replace( "/" )
                return false;
            }
            switch (window.prev) {
                case "home":
                case "timeline":
                case "notification":
                case "message":
                    this.$router.back();
                break;

                default:
                    this.$router.replace( "/" )

            }
        },
        backUserDetail() {
            if( history.length < 2 ) {
                this.$router.replace( location.pathname.split("/post")[0] )
                return false;
            }
            switch (window.prev) {
                case "user":
                case "timeline":
                case "notification":
                case "message":
                    this.$router.back();
                break;

                default:
                    this.$router.replace( location.pathname.split("/post")[0] )

            }
        },
        backMyPage() {
            if( history.length < 2 ) {
                this.$router.replace( location.pathname.split("/edit")[0] )
                return false;
            }
            switch (window.prev) {
                case "detail":
                    this.$router.back();
                break;

                default:
                    this.$router.replace( location.pathname.split("/edit")[0] )

            }
        },
        saveData() {
            alert("Save data !")
            this.backMyPage();
        }
    },
    mounted: function() {
    }

}
</script>
