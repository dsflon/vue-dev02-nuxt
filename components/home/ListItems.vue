<template>
    <div v-if="this.$store.state.home.searchResult">
        <ul class="lists_inner">

            <li class="list"
                v-for="item in this.$store.state.home.searchResult"
                :key="item.user_name">
                    <button id={item.user_id} class="list_btn" onClick={this.props.GetPage.bind(this)}>

                        <div
                            class="list_user"
                            data-src={item.user_icon}>
                            <div class="list_user_wrap">
                                <p class="list_user_access">{{item.access_info}}</p>
                                <p class="list_user_name">{{item.user_name}}</p>
                            </div>
                            <!-- {{delayLoader}} -->
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
    </div>
</template>


<script>

import ChangeTimeString from '~/components/common/ChangeTimeString.vue'

export default {
    components: {
        ChangeTimeString
    }
}
</script>
