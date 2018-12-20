<template>
    <ul
        v-if="$store.state.home.searchResult && $store.state.home.searchResult[0]"
        class="lists_inner">

        <li class="list"
            v-for="item in $store.state.home.searchResult"
            :key="item.user_name">
            <button :id="item.user_id" class="list_btn" onClick={this.props.GetPage.bind(this)}>

                <div
                    ref="list_user"
                    class="list_user"
                    :data-src="item.user_icon">
                    <div class="list_user_wrap">
                        <p class="list_user_access">{{item.access_info}}</p>
                        <p class="list_user_name">{{item.user_name}}</p>
                    </div>
                </div>
                <div class="list_info">
                    <ul class="m-info_counts is_flex is_s">
                        <li>
                            <i class="a-icon a-icon-friends is_gray"></i>
                            <span class="a-icon_txt">{{item.count_follows.toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-heart is_gray"></i>
                            <span class="a-icon_txt">{{item.count_likes.toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-picture is_gray"></i>
                            <span class="a-icon_txt">{{item.count_posts.toLocaleString()}}</span>
                        </li>
                    </ul>
                    <div class="list_info_wrap">
                        <div class="list_info_time">
                            <i class="a-icon a-icon-time"></i>
                            <div class="a-icon_txt">
                                <change-time-string :num="item.start_time" /> ~ <change-time-string :num="item.end_time" />
                            </div>
                        </div>
                        <div class="list_info_price">
                            ¥ {{item.min_price.toLocaleString()}} ~ {{item.max_price.toLocaleString()}}
                        </div>
                    </div>
                </div>
            </button>
        </li>

    </ul>
    <ul v-else class="lists_inner">
        <li class="no_user">
            <p>該当するユーザーがいません。</p>
            <p>条件を変えて検索を行ってください。</p>
            <router-link to="/search">
                <i class="a-icon a-icon-search f-font_l"></i>
                <span class="a-icon_txt">検索する</span>
            </router-link>
        </li>
    </ul>
</template>


<script>

import DelayLoader from '~/middleware/_delayLoader';
import ChangeTimeString from '~/components/common/ChangeTimeString.vue'

export default {
    components: {
        ChangeTimeString
    },
    // methods: {
    //     imgOnload: function() {
    //         DelayLoader( this.$refs.list_user );
    //     }
    // },
    mounted: function() {
    },
    updated: function() {
        DelayLoader( this.$refs.list_user );
    }
}
</script>
