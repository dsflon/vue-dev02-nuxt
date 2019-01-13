<template>

    <div v-if="CheckFollowed" class="header_btns">
        <button
            class="a-btn_header is_m is_pink"
            @click="follow">
            <i class="a-icon a-icon-friends_check a-icon-1_75x"></i>
        </button>
    </div>
    <!-- <div v-if="$store.state.detail" class="header_btns">
        <button
            :class="['a-btn_header is_m', $store.state.detail.followed ? 'is_pink' :  'is_gray']"
            @click="follow">
            <i class="a-icon a-icon-friends_check a-icon-1_75x"></i>
        </button>
    </div> -->

</template>


<script>
import Follow from '~/middleware/_follow';

export default {
    computed : {
        CheckFollowed () { // ページタイトル部分のチラツキ対処
            let pageData = this.$store.state.common.pageData;
            if( !this.$store.state.detail.followed ) {
                return pageData ? pageData.followed : false
            } else {
                return this.$store.state.detail.followed
            }
        }
    },
    methods: {
        follow() {
            Follow(this)
        }
    }

}
</script>
