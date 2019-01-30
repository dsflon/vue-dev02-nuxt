<template>
    <ul
        v-if="$store.state.home.searchResult && $store.state.home.searchResult[0]"
        class="lists_inner">

        <li class="list"
            v-for="item in $store.state.home.searchResult"
            :key="item.user_name">
            <button
                class="list_btn"
                @click="ToDetail(item)">

                <div v-if="Boolean(item.followed)" class="list_followed">
                    <i class="a-icon a-icon-friends_check is_pink"></i>
                </div>

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
                            <span class="a-icon_txt">{{Number(item.count_follows).toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-heart is_gray"></i>
                            <span class="a-icon_txt">{{Number(item.count_likes).toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-picture is_gray"></i>
                            <span class="a-icon_txt">{{Number(item.count_posts).toLocaleString()}}</span>
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
                            ¥ {{Number(item.min_price).toLocaleString()}} ~ {{Number(item.max_price).toLocaleString()}}
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

import DelayLoader from '~/scripts/_delayLoader';
import ChangeTimeString from '~/components/common/changeTimeString.vue'

export default {
    components: {
        ChangeTimeString
    },
    methods: {
        ToDetail: function(data) {
            this.$store.dispatch('common/SetPageData',{
                title: data.user_name,
                followed: data.followed
            }).then(()=> {
                this.$router.push('/user/' + data.user_id)
            })
        }
    },
    mounted: function() {
        DelayLoader( this.$refs.list_user );
    },
    updated: function() {
        DelayLoader( this.$refs.list_user );
    }
}
</script>
