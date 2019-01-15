<template>

    <form class="user_inner">

        <div class="user_header">

            <figure
                class="user_thumb"
                :style="{'background-image': 'url(' + userData.user_icon + ')'}">
            </figure>

            <div class="user_info">
                <dl class="user_info_store">
                    <dt>営業時間</dt>
                    <dd><change-time-string :num="userData.start_time" /> ~ <change-time-string :num="userData.end_time" /></dd>
                </dl>
                <dl class="user_info_store">
                    <dt>予算</dt>
                    <dd>¥ {{Number(userData.min_price).toLocaleString()}} ~ {{Number(userData.max_price).toLocaleString()}}</dd>
                </dl>
                <p class="user_info_notice">※ 営業時間、予算は「基本情報」および「メニュー」の内容が反映されます。</p>
            </div>

            <div class="user_txt m-form_line">
                <textarea
                    ref="textarea"
                    class="a-form_textarea"
                    name="description"
                    placeholder="自己紹介を記入してください"
                    @input="_AdjustTextAreaHeight"
                    :value="userData.description"></textarea>
            </div>

        </div>

        <div class="user_tab">
            <carousel :adjustableHeight="true" :perPage="1" :minSwipeDistance="50">
                <slide>
                    <detail-item-slider-info :infoData="userData.info? userData.info : null" />
                </slide>
                <slide>
                    <detail-item-slider-menu :menuData="userData.menus? userData.menus : null" />
                </slide>
            </carousel>
        </div>

    </form>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import AdjustTextAreaHeight from '~/middleware/_adjustTextAreaHeight';

import ChangeTimeString from '~/components/common/ChangeTimeString.vue'

import DetailItemSliderInfo from '~/components/detail/DetailItemSliderInfo.vue'
import DetailItemSliderMenu from '~/components/detail/DetailItemSliderMenu.vue'

export default {
    props: [
        "userData"
    ],
    components: {
        ChangeTimeString,
        DetailItemSliderInfo,
        DetailItemSliderMenu,
        Carousel,
        Slide
    },
    methods: {
        _AdjustTextAreaHeight(e) {
            AdjustTextAreaHeight(e.currentTarget)
        },
        AjustTabName() {
            let tab = document.getElementsByClassName('VueCarousel-dot-button'),
                tabTxt = [ "基本情報", "メニュー"];

            for (var i = 0; i < tab.length; i++) {
                tab[i].innerText = tabTxt[i];
            }
        }
    },
    mounted: function() {
        // for (var i = 0; i < this.$refs.textarea.length; i++) {
        //     AdjustTextAreaHeight(this.$refs.textarea[i])
        // }
        AdjustTextAreaHeight(this.$refs.textarea)
        setTimeout( this.AjustTabName, 1 )
    }

}
</script>
