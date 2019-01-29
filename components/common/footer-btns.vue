<template>

    <div v-if="type == 'detail'" class="m-btns is_sticky">
        <button class="a-btn" @click="backHome">
            <i class="a-icon a-icon-arrow_left"></i>
        </button>
        <transition name="fade">
            <button
                v-if="!CheckFollowed"
                class="a-btn is_l is_pink"
                @click="follow">
                <i class="a-icon a-icon-friends_plus"></i>
            </button>
        </transition>
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
        <button class="a-btn is_blue" @click="SaveData">
            <i class="a-icon a-icon-check"></i>
        </button>
    </div>

</template>


<script>
import Follow from '~/scripts/_follow';

export default {

    props: [
        "type",
        "SaveData"
    ],
    computed : {
        CheckFollowed () { // ページタイトル部分のチラツキ対処
            // topから遷移してきた時、
            // state.common.pageData.followedにデータがあったらまずそれを表示
            let pageData = this.$store.state.common.pageData;
            return pageData ? pageData.followed : this.$store.state.detail.followed
        }
    },
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

            let res = confirm("変更を取り消しますか？");
            if( res == true ) {
                this.$router.replace( location.pathname.split("/edit")[0] )
            }

        },
        follow() {
            Follow(this)
        }
    },
    mounted: function() {
    }

}
</script>
