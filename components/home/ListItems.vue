<template>
    <div v-if="this.$store.state.home.searchResult">
        <ul class="lists_inner">

            <li class="list"
                v-for="d in this.$store.state.home.searchResult"
                :key="d.user_name">
                    <button id={d.user_id} class="list_btn" onClick={this.props.GetPage.bind(this)}>

                        <div
                            class="list_user"
                            data-src={d.user_icon}>
                            <div class="list_user_wrap">
                                <p class="list_user_access">{{d.access_info}}</p>
                                <p class="list_user_name">{{d.user_name}}</p>
                            </div>
                            <!-- {{delayLoader}} -->
                        </div>
                        <div class="list_info">
                            <ul class="m-info_counts is_flex is_s">
                                <li>
                                    <i class="a-icon a-icon-friends is_gray"></i>
                                    <span class="a-icon_txt">{{d.count_follows.toLocaleString()}}</span>
                                </li>
                                <li>
                                    <i class="a-icon a-icon-heart is_gray"></i>
                                    <span class="a-icon_txt">{{d.count_likes.toLocaleString()}}</span>
                                </li>
                                <li>
                                    <i class="a-icon a-icon-picture is_gray"></i>
                                    <span class="a-icon_txt">{{d.count_posts.toLocaleString()}}</span>
                                </li>
                            </ul>
                            <div class="list_info_wrap">
                                <p class="list_info_time">
                                    <i class="a-icon a-icon-time"></i>
                                    <!-- <span class="a-icon_txt">{{ChangeTimeString(d.start_time)}} ~ {{ChangeTimeString(d.end_time)}}</span> -->
                                </p>
                                <p class="list_info_price">
                                    ¥ {{d.min_price.toLocaleString()}} ~ {{d.max_price.toLocaleString()}}
                                </p>
                            </div>
                        </div>
                    </button>
                </li>

        </ul>
    </div>
</template>


<script>

export default {
    // data () {
    //     return {
    //     }
    // },
    mounted: function() {
    },
    updated: function() {
        console.log(this.$store.state.home.searchResult);
    }
}
</script>
