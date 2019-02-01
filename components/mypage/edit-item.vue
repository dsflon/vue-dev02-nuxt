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
                        :userData="userData"
                        :addItemWindow="addItemWindow"
                        :itemMenu="itemMenu"
                        :ToggleAddItemMenu="ToggleAddItemMenu"
                        :AddItem="AddItem"
                        :ToggleItemMenu="ToggleItemMenu"
                        :ChangeDraggable="ChangeDraggable"
                        :RemoveItem="RemoveItem" />
                    <edit-item-menu
                        v-if="tabIndex == 1"
                        :itemDraggable="itemDraggable"
                        :ToggleItemDraggable="ToggleItemDraggable"
                        :OnFocus="OnFocus" :OnBlur="OnBlur"
                        :userData="userData"
                        :itemMenu="itemMenu"
                        :AddItem="AddItem"
                        :ToggleItemMenu="ToggleItemMenu"
                        :ChangeDraggable="ChangeDraggable"
                        :RemoveItem="RemoveItem" />
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
import EditItemMenu from '~/components/mypage/edit-item-menu.vue'

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
        EditItemMenu,
        Carousel,
        Slide
    },
    data() {
        return {
            tabIndex: 0,
            addItemWindow: false,
            itemMenu: false,
            newItem: {
                "store": {
                    "title": "お店",
                    "category": "store",
                    "contents_": {
                        "store_name": { "text": "" },
                        "store_address": { "postal": "", "station": "", "gate": "", "transportation": "", "time": "", "text": ""},
                        "store_time": { "start_time": "", "end_time": "" },
                        "store_holiday": { "text": "" },
                        "store_url": { "text": "" }
                    }
                },
                "career": {
                    "title": "経歴",
                    "category": "career",
                    "contents_": [ { "date": { "start": "", "end": "" }, "text": "" } ]
                },
                "other": {
                    "title": "その他",
                    "category": "other",
                    "contents": [ { "title": "", "text": "" } ]
                },
                "menus": { "id": "", "name": "メニュータイトル", "price": "", "description": "" }
            }
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
        ToggleAddItemMenu() { //基本情報の場合のサブメニュー開閉
            this.addItemWindow = !this.addItemWindow;
            this.itemMenu = false;
        },
        AddItem: function(category, type) {
            this.userData[type].push( JSON.parse(JSON.stringify(this.newItem[category])) )
            this.addItemWindow = false;
        },
        ToggleItemMenu: function(i) {
            this.itemMenu = i;
            this.addItemWindow = false;
        },
        ChangeDraggable() {
            this.ToggleItemDraggable()
            this.itemMenu = false;
        },
        RemoveItem: function(index, type) {
            let res = confirm("このグループを削除しますか？");
            if( res == true ) {
                this.userData[type].splice(index, 1);
                this.itemMenu = false;
            }
        }
    },
    created: function() {
    },
    mounted: function() {
        let textarea = document.getElementsByClassName('a-form_textarea');
        for (var i = 0; i < textarea.length; i++) AdjustTextAreaHeight(textarea[i])
    },
    updated: function() {
    }

}
</script>
