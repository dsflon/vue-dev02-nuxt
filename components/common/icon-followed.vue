<template>
    <transition name="fade">
        <div v-if="CheckFollowed" class="header_btns">
            <button
                class="a-btn_header is_m is_pink"
                @click="follow">
                <i class="a-icon a-icon-friends_check a-icon-1_75x"></i>
            </button>
        </div>
    </transition>
</template>


<script>
import Follow from '~/scripts/_follow';

export default {
    computed : {
        CheckFollowed () { // ページタイトル部分のチラツキ対処
            // topから遷移してきた時、
            // state.common.pageData.followedにデータがあったらまずそれを表示
            let pageData = this.$store.state.common.pageData;
            return pageData ? pageData.followed : this.$store.state.detail.followed
        }
    },
    methods: {
        follow() {
            Follow(this)
        }
    },
    mounted: function() {
    }

}
</script>
