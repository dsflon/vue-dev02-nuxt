<template>

    <div class="user_inner">

        <div class="user_header">

            <div class="user_header_inner">

                <figure
                    class="user_thumb"
                    :style="{'background-image': 'url(' + userData.user_icon + ')'}">
                </figure>

                <div class="user_info">
                    <ul class="m-info_counts is_m">
                        <li>
                            <i class="a-icon a-icon-friends is_gray"></i>
                            <span class="a-icon_txt">{{Number(userData.count_follows).toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-heart is_gray"></i>
                            <span class="a-icon_txt">{{Number(userData.count_likes).toLocaleString()}}</span>
                        </li>
                        <li>
                            <i class="a-icon a-icon-picture is_gray"></i>
                            <span class="a-icon_txt">{{Number(userData.count_posts).toLocaleString()}}</span>
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
            </div>

            <div v-if="userData.description" class="user_txt">
                <div class="user_txt_inner" ref="user_txt" v-html="autoLink(userData.description)"></div>
                <button
                    @click="showAllTxt()"
                    class="a-link f-font_s"
                    ref="user_btn">...全文見る</button>
            </div>

        </div>

        <div class="user_tab">
            <carousel ref="vue_carousel" :adjustableHeight="true" :perPage="1" :minSwipeDistance="50">
                <slide>
                    <detail-item-photos :photosData="userData.photo ? userData.photo : null"  />
                </slide>
                <slide>
                    <detail-item-info :infoData="userData.info? userData.info : null" />
                </slide>
                <slide>
                    <detail-item-menu :menuData="userData.menus? userData.menus : null" />
                </slide>
            </carousel>
        </div>

    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import AutoLink from '~/scripts/_autoLink'

import ChangeTimeString from '~/components/common/changeTimeString.vue'

import DetailItemPhotos from '~/components/detail/detail-item-photos.vue'
import DetailItemInfo from '~/components/detail/detail-item-info.vue'
import DetailItemMenu from '~/components/detail/detail-item-menu.vue'

export default {
    props: [
        "userData"
    ],
    components: {
        ChangeTimeString,
        DetailItemPhotos,
        DetailItemInfo,
        DetailItemMenu,
        Carousel,
        Slide
    },
    computed : {
        autoLink: function () {
            return str => AutoLink(str)
        }
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
        },
        AjustTabName() {
            let tab = document.getElementsByClassName('VueCarousel-dot-button'),
                tabTxt = [ "写真", "基本情報", "メニュー"];

            for (var i = 0; i < tab.length; i++) {
                tab[i].innerText = tabTxt[i];
            }
        }
    },
    mounted: function() {
        if(this.$refs.user_txt) this.userTxt()
        setTimeout( this.AjustTabName, 1 )
    }

}
</script>
