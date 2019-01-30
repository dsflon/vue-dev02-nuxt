<template>

    <div v-if="infoData && infoData.length !== 0" class="user_tab_inner user_tab_info">

        <section
            v-for="(item,i) in infoData"
            :key="i" class="info_box">

            <div class="info_box_ttl">
                <label class="m-form_bg m-form_label">
                    <input
                        class="a-form_input is_bold"
                        type="text"
                        placeholder="カテゴリ名を入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        v-model="item.title">
                </label>
                <button type="button" class="info_box_menu is_black">
                    <i class="a-icon a-icon-menu a-icon-lg"></i>
                </button>
            </div>

            <edit-item-info-store
                v-if="item.category==='store'"
                :i="i" :item="item" :OnFocus="OnFocus" :OnBlur="OnBlur" />
            <!-- / item.type==='store' -->

            <edit-item-info-career
                v-else-if="item.category==='career'"
                :i="i" :item="item" :OnFocus="OnFocus" :OnBlur="OnBlur" />
            <!-- / item.type==='career' -->

            <edit-item-info-other
                v-else
                :i="i" :item="item" :OnFocus="OnFocus" :OnBlur="OnBlur" />

        </section>

        <div class="info_box_btn">
            <button type="button" @click="ToggleAddItemWindow">
                <i class="a-icon a-icon-plus is_blue a-icon-1_75x" :class="{is_cross: addItemWindow}"></i>
            </button>
            <transition name="slide-down">
                <div v-if="addItemWindow" class="info_box_btn_menu">
                    <ul>
                        <li><button type="button" @click="AddItem('store')"><i class="a-icon a-icon-plus is_white"></i><span class="a-icon_txt">お店</span></button></li>
                        <li><button type="button" @click="AddItem('career')"><i class="a-icon a-icon-plus is_white"></i><span class="a-icon_txt">経歴</span></button></li>
                        <li><button type="button" @click="AddItem('other')"><i class="a-icon a-icon-plus is_white"></i><span class="a-icon_txt">自由項目</span></button></li>
                    </ul>
                </div>
            </transition>
        </div>

    </div>

    <p v-else class="no_result">基本情報がありません</p>

</template>

<script>
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import SetTimeOptions from '~/scripts/_setTimeOptions';

import EditItemInfoStore from '~/components/mypage/edit-item-info-store.vue'
import EditItemInfoCareer from '~/components/mypage/edit-item-info-career.vue'
import EditItemInfoOther from '~/components/mypage/edit-item-info-other.vue'

export default {
    props: [
        "infoData",
        "OnFocus",
        "OnBlur"
    ],
    components: {
        EditItemInfoStore,
        EditItemInfoCareer,
        EditItemInfoOther
    },
    data () {
        return {
            addItemWindow: false,
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
                }
            }
        }
    },
    computed : {
    },
    methods: {
        ToggleAddItemWindow() {
            this.addItemWindow = !this.addItemWindow;
        },
        AddItem: function(category) {
            this.infoData.push(this.newItem[category])
            this.addItemWindow = false;
        }
    },
    mounted: function() {
    },
    updated: function() {
    }

}
</script>
