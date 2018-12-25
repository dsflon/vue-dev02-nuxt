<template>

    <div class="user_inner">

        <div class="user_header">

            <figure
                class="user_thumb"
                :style="{'background-image': 'url(' + userData.user_icon + ')'}">
            </figure>

            <div class="user_info">
                <ul class="m-info_counts is_m">
                    <li>
                        <i class="a-icon a-icon-friends is_gray"></i>
                        <span class="a-icon_txt">{{userData.count_follows.toLocaleString()}}</span>
                    </li>
                    <li>
                        <i class="a-icon a-icon-heart is_gray"></i>
                        <span class="a-icon_txt">{{userData.count_likes.toLocaleString()}}</span>
                    </li>
                    <li>
                        <i class="a-icon a-icon-picture is_gray"></i>
                        <span class="a-icon_txt">{{userData.count_posts.toLocaleString()}}</span>
                    </li>
                </ul>
                <dl class="user_info_store">
                    <dt>営業時間</dt>
                    <dd><change-time-string :num="userData.start_time" /> ~ <change-time-string :num="userData.end_time" /></dd>
                </dl>
                <dl class="user_info_store">
                    <dt>予算</dt>
                    <dd>¥ {{Number(userData.min_price).toLocaleString()}} ~ {{Number(userData.max_price).toLocaleString()}}</dd>
                </dl>
            </div>

            <div class="user_txt">
                <p ref="user_txt">{{userData.description}}</p>
                <button
                    @click="showAllTxt()"
                    class="a-link f-font_s"
                    ref="user_btn">...全文見る</button>
            </div>

        </div>

        <!-- <Slider
            history={this.props.history}
            photos={userData.photo}
            info={userData.info}
            menu={userData.menus} /> -->

    </div>
</template>

<script>

import DelayLoader from '~/middleware/_delayLoader';
import ChangeTimeString from '~/components/common/ChangeTimeString.vue'

export default {
    props: [
        "userData"
    ],
    components: {
        ChangeTimeString
    },
    methods: {
        userTxt: function() {
            let minHeight = 38,
                target = this.$refs.user_txt,
                btn = this.$refs.user_btn,
                height = target.scrollHeight;
            if( height > minHeight ) {
                target.style.height = minHeight + "px";
                btn.style.display = "inline-block";
            }
        },
        showAllTxt: function() {
            let target = this.$refs.user_txt,
                btn = this.$refs.user_btn,
                height = target.scrollHeight;
            target.style.height = "inherit";
            btn.style.display = "none";
        }
    },
    mounted: function() {
        this.userTxt()
    }

}
</script>
