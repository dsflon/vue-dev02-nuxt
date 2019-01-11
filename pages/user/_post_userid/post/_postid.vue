<template>
    <div id="post">
        <div id="post_inner">

            <div class="contents is_btns_noheader">

                <div v-if="!error && this.postData">
                    <div>

                        <carousel :perPage="1" :minSwipeDistance="50">
                            <slide v-for="(item,i) in postData.post_photos" :key="i">
                                <figure class="post_photo" :style="{'background-image': 'url('+ item +')'}"></figure>
                            </slide>
                        </carousel>

                        <div class="post_wrap">
                            <!-- <ul class="m-info_counts is_l">
                                <li>
                                    <button onClick={this.Like.bind(this,userId,postId)}>
                                        <i class={"a-icon a-icon-heart_plus "+( like.bool ? "is_pink" : "is_gray")}></i>
                                        <span class="a-icon_txt">{(like.count||0).toLocaleString()}</span>
                                    </button>
                                </li>
                            </ul> -->
                            <div class="post_txt">{{postData.description}}</div>
                        </div>
                    </div>
                </div>

                <div v-else class="no_result">
                    <p>{{error}}</p>
                </div>

            </div>

            <footer-btns type="post" />

        </div>
    </div>
</template>

<script>
import AppFooter from '~/components/common/Footer.vue'
import FooterBtns from '~/components/common/FooterBtns.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "user-post_userid-post-postid" && from == "user-userid" ) {
            // user detailから来たとき
            return "user-post"
        }

    },
    head () {
        return {
            title: this.postData ? this.postData.user_name + "さんの投稿 | Post | User | Step Lack" : "投稿が見つかりません。 | Post | User | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: this.postData ? this.postData.user_name + "さんの投稿です。" : "ユーザーが見つかりません。" }
            ]
        }
    },
    data () {
        return {
            postData: null,
            userName: null,
            error: null
        }
    },
    components: {
        AppFooter,
        FooterBtns
    },
    methods: {
        GetStart: function() {

            let postData = {
                "search_user_id": this.$route.params.post_userid,
                "user_id": this.$store.state.user.myData ? this.$store.state.user.myData.user_id : null,
                "language_flg": "ja"
            };

            this.$store.dispatch('post/GetPostResult',postData)
            .then((json) => {
                if(!json) {
                    this.error = "データが存在しません。";
                } else {
                    this.error = null;
                    this.postData = json.data;
                }
            }).catch((error,txt)=>{
                console.error(txt);
                this.error = txt;
            })

        }
    },
    created: function() {

        this.GetStart();

        localStorage.setItem('steplack_lastpage', JSON.stringify({
            "page": location.pathname,
            "scroll": (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop,
            "time": new Date().getTime()
        }));

    },
    destroyed: function() {
        window.prev = "post";
        localStorage.removeItem('steplack_lastpage');
    }
}
</script>
