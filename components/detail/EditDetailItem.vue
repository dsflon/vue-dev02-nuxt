<template>

    <form class="user_inner">

        <div class="user_header">

            <figure
                class="user_thumb"
                :style="{'background-image': 'url(' + userData.user_icon + ')'}">
            </figure>

            <div class="user_info">
                <!-- <dl class="user_info_store">
                    <dt>営業時間</dt>
                    <dd>（基本情報で設定します）</dd>
                </dl>
                <dl class="user_info_store">
                    <dt>予算</dt>
                    <dd>（基本情報で設定します）</dd>
                </dl> -->
            </div>

            <div class="user_txt m-form_line" ref="user_txt2">
                <textarea
                    ref="user_txt"
                    class="a-form_textarea"
                    name="description"
                    @input="userTxt()"
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
        userTxt: function() {
            AdjustTextAreaHeight(this.$refs.user_txt)
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
        this.userTxt()
        setTimeout( this.AjustTabName, 1 )
    }

}
</script>
