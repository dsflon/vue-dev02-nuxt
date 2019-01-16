<template>

    <form class="user_inner">

        <div class="user_header">

            <div class="user_header_inner">
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
            </div>

            <div class="user_txt">
                <label class="m-form_line">
                    <h2 class="a-ttl is_s is_gray">自己紹介</h2>
                    <textarea
                        ref="textarea"
                        class="a-form_textarea"
                        name="description"
                        placeholder="自己紹介を記入してください"
                        @input="_AdjustTextAreaHeight"
                        :value="userData.description"></textarea>
                </label>
            </div>

            <section class="m-form_sec">
                <label class="m-form_line">
                    <h2 class="a-ttl is_s is_gray is_required">お名前</h2>
                    <input
                        class="a-form_input"
                        required
                        type="text"
                        name="user_fullname"
                        placeholder="お名前を入力してください"
                        :value="userData.user_fullname">
                </label>
            </section>
            <section class="m-form_sec">
                <label class="m-form_line">
                    <h2 class="a-ttl is_s is_gray is_required">ニックネーム</h2>
                    <input
                        class="a-form_input"
                        required
                        type="text"
                        name="user_name"
                        placeholder="ニックネームを入力してください"
                        :value="userData.user_name">
                </label>
            </section>

            <section class="m-form_sec">
                <label class="m-form_line">
                    <h2 class="a-ttl is_s is_gray is_required">職業</h2>
                    <select
                        class="a-form_select"
                        tabIndex="-1"
                        name="user_job"
                        ref="select"
                        :value="userData.job_id+','+userData.job_name">
                        <option>----</option>
                        <!-- <option
                            v-for="item in $store.state.search.jobList"
                            :key="item.job_id"
                            :value="item.job_id+','+item.job_name">
                            {{ item.job_name }}
                        </option> -->
                    </select>
                </label>
            </section>
                <section class=" m-form_sec">
                    <label class="m-form_line">
                        <h2 class="a-ttl is_s is_gray is_required">メールアドレス</h2>
                        <input
                            class="a-form_input"
                            required
                            type="email"
                            name="user_email"
                            placeholder="メールアドレスを入力してください"
                            :value="userData.user_mail">
                    </label>
                </section>
                <section class=" m-form_sec">
                    <label class="m-form_line">
                        <h2 class="a-ttl is_s is_gray is_required">電話番号<span class="a-txt_s">（ハイフン不要）</span></h2>
                        <input
                            class="a-form_input"
                            required
                            type="tel"
                            name="user_email"
                            placeholder="電話番号を入力してください"
                            :value="userData.tel">
                    </label>
                </section>

            <div class="f-flex m-form_sec">
                <section class="f-flex6">
                    <label class="m-form_line">
                        <h2 class="a-ttl is_s is_gray">性別</h2>
                        <select
                            tabindex="-1"
                            class="a-form_select"
                            :value="userData.user_sex"
                            name="user_sex">
                            <option>----</option>
                            <option value="femail">女性</option>
                            <option value="male">男性</option>
                        </select>
                    </label>
                </section>
                <section class="f-flex6">
                    <label class="m-form_line">
                        <h2 class="a-ttl is_s is_gray">生年月日</h2>
                        <input
                            class="a-form_input"
                            required
                            type="date"
                            name="user_birthday"
                            :value="userData.user_birthday">
                    </label>
                </section>
            </div>

            <!-- <section class="m-form_sec">
                <label class="m-form_line">
                    <h2 class="a-ttl is_s is_gray">住所</h2>
                    <input
                        class="a-form_input"
                        required
                        type="text"
                        name="user_name"
                        placeholder="住所を入力してください"
                        value="">
                </label>
            </section> -->

        </div>

        <div class="user_tab">
            <carousel :adjustableHeight="true" :perPage="1" :minSwipeDistance="50">
                <slide>
                    <edit-detail-item-slider-info :infoData="userData.info? userData.info : null" />
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

import EditDetailItemSliderInfo from '~/components/detail/EditDetailItemSliderInfo.vue'
import DetailItemSliderMenu from '~/components/detail/DetailItemSliderMenu.vue'

export default {
    props: [
        "userData"
    ],
    components: {
        ChangeTimeString,
        EditDetailItemSliderInfo,
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
        AdjustTextAreaHeight(this.$refs.textarea)
        setTimeout( this.AjustTabName, 1 )
    }

}
</script>
