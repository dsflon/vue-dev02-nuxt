<template>

    <div class="user_inner">

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
                <h2 class="a-ttl is_s is_gray f-mb5">自己紹介</h2>
                <label class="m-form_bg is_textarea">
                    <textarea
                        ref="textarea"
                        class="a-form_textarea"
                        placeholder="自己紹介を記入してください"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="userData.description"></textarea>
                </label>
            </div>

            <section class="m-form_sec">
                <h2 class="a-ttl is_s is_gray f-mb5 is_required">お名前</h2>
                <label class="m-form_bg">
                    <input
                        class="a-form_input"
                        required
                        type="text"
                        placeholder="お名前を入力してください"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="userData.user_fullname">
                </label>
            </section>
            <section class="m-form_sec">
                <h2 class="a-ttl is_s is_gray f-mb5 is_required">ニックネーム</h2>
                <label class="m-form_bg">
                    <input
                        class="a-form_input"
                        required
                        type="text"
                        placeholder="ニックネームを入力してください"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="userData.user_name">
                </label>
            </section>

            <section class="m-form_sec">
                <h2 class="a-ttl is_s is_gray f-mb5 is_required">職業</h2>
                <label class="m-form_bg">
                    <select
                        class="a-form_select"
                        tabIndex="-1"
                        ref="select"
                        @input="AdjustJobName($event); _AdjustSelect($event); OnBlur()"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="userData.job_id">
                        <option value="">選択してください</option>
                        <option
                            v-for="item in $store.state.search.jobList"
                            :key="item.job_id"
                            :value="item.job_id">
                            {{ item.job_name }}
                        </option>
                    </select>
                </label>
            </section>
                <section class=" m-form_sec">
                    <h2 class="a-ttl is_s is_gray f-mb5 is_required">メールアドレス</h2>
                    <label class="m-form_bg">
                        <input
                            class="a-form_input"
                            required
                            type="email"
                            placeholder="メールアドレスを入力してください"
                            @focus="OnFocus" @blur="OnBlur"
                            v-model="userData.user_mail">
                    </label>
                </section>
                <section class=" m-form_sec">
                    <h2 class="a-ttl is_s is_gray f-mb5 is_required">電話番号<span class="a-txt_s">（ハイフン不要）</span></h2>
                    <label class="m-form_bg">
                        <input
                            class="a-form_input"
                            required
                            type="tel"
                            placeholder="電話番号を入力してください"
                            @focus="OnFocus" @blur="OnBlur"
                            v-model="userData.tel">
                    </label>
                </section>

            <div class="f-flex m-form_sec">
                <section class="f-flex6">
                    <h2 class="a-ttl is_s is_gray f-mb5">性別</h2>
                    <label class="m-form_bg">
                        <select
                            tabindex="-1"
                            class="a-form_select"
                            @input="_AdjustSelect($event); OnBlur()"
                            @focus="OnFocus" @blur="OnBlur"
                            v-model="userData.user_sex">
                            <option value="">選択してください</option>
                            <option value="0">女性</option>
                            <option value="1">男性</option>
                        </select>
                    </label>
                </section>
                <section class="f-flex6">
                    <h2 class="a-ttl is_s is_gray f-mb5">生年月日</h2>
                    <label class="m-form_bg">
                        <input
                            class="a-form_input a-form_date"
                            required
                            type="date"
                            ref="input_date"
                            @input="_AdjustInputDate($event); OnBlur()"
                            @focus="OnFocus" @blur="OnBlur"
                            v-model="userData.user_birthday">
                    </label>
                </section>
            </div>

        </div>

        <div class="user_tab">
            <ul class="user_tab_btns">
                <li :class="{is_active: tabIndex == 0}"><button type="button" @click="ToggleTab(0)">基本情報</button></li>
                <li :class="{is_active: tabIndex == 1}"><button type="button" @click="ToggleTab(1)">メニュー</button></li>
            </ul>
            <div class="user_tab_detail" :class="{is_itemDraggable:itemDraggable}">
                <transition name="tab">
                    <edit-item-info
                        v-if="tabIndex == 0"
                        :itemDraggable="itemDraggable"
                        :ToggleItemDraggable="ToggleItemDraggable"
                        :OnFocus="OnFocus" :OnBlur="OnBlur"
                        :userData="userData" />
                    <detail-item-menu
                        v-if="tabIndex == 1"
                        :itemDraggable="itemDraggable"
                        :ToggleItemDraggable="ToggleItemDraggable"
                        :OnFocus="OnFocus" :OnBlur="OnBlur"
                        :userData="userData" />
                </transition>
            </div>
        </div>

    </div>

</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import AdjustInputDate from '~/scripts/_adjustInputDate';
import AdjustSelect from '~/scripts/_adjustSelect';

import ChangeTimeString from '~/components/common/changeTimeString.vue'

import EditItemInfo from '~/components/mypage/edit-item-info.vue'
import DetailItemMenu from '~/components/detail/detail-item-menu.vue'

export default {
    props: [
        "userData",
        "OnFocus",
        "OnBlur",
        "itemDraggable",
        "ToggleItemDraggable"
    ],
    components: {
        ChangeTimeString,
        EditItemInfo,
        DetailItemMenu,
        Carousel,
        Slide
    },
    data() {
        return {
            tabIndex: 0
        }
    },
    methods: {
        // AdjustTabName() {
        //     let tab = document.getElementsByClassName('VueCarousel-dot-button'),
        //         tabTxt = [ "基本情報", "メニュー"];
        //
        //     for (var i = 0; i < tab.length; i++) {
        //         tab[i].innerText = tabTxt[i];
        //     }
        // },
        ToggleTab: function(i) {
            this.tabIndex = i
        },
        _AdjustInputDate(e) { AdjustInputDate(e) },
        _AdjustSelect(e) { AdjustSelect(e) },
        AdjustJobName(e) {
            let i = e.currentTarget.value,
                jobList = this.$store.state.search.jobList;
            for (var key in jobList) {
                if (jobList[key].job_id == i) {
                    this.userData.job_name = jobList[key].job_name;
                }
            }
        }
    },
    created: function() {
        this.$store.dispatch('search/GetJobList')
        .catch((error,txt)=>{
            console.error(error);
        })
    },
    mounted: function() {
        // setTimeout( ()=> {
            let select = document.getElementsByClassName('a-form_select'),
                date = document.getElementsByClassName('a-form_date'),
                textarea = document.getElementsByClassName('a-form_textarea');
            for (var i = 0; i < select.length; i++) AdjustSelect(select[i])
            for (var i = 0; i < textarea.length; i++) AdjustTextAreaHeight(textarea[i])
            for (var i = 0; i < date.length; i++) AdjustInputDate(date[i])
        // }, 1 )
    },
    updated: function() {
    }

}
</script>
