<template>

    <div>

        <div v-if="userData.info && userData.info.length !== 0" class="user_tab_inner user_tab_info">

            <draggable
                v-model="userData.info"
                :options="{disabled:!itemDraggable,animation:150}">

                <section
                    v-for="(item,i) in userData.info"
                    :key="i" class="info_box">

                    <transition name="fade">
                        <div v-if="itemMenu === i" class="info_box_overlay" @click="ToggleItemMenu(null)"></div>
                    </transition>

                    <div class="info_box_ttl">
                        <div v-if="!itemDraggable">
                            <label class="m-form_bg m-form_label">
                                <input
                                    class="a-form_input is_bold"
                                    type="text"
                                    placeholder="グループ名を入力してください"
                                    @focus="OnFocus" @blur="OnBlur"
                                    v-model="item.title">
                            </label>
                            <transition name="fade">
                                <button v-if="itemMenu === i" type="button" class="info_box_menu_btn is_black" @click="ToggleItemMenu(null)">
                                    <i class="a-icon a-icon-plus a-icon-1_75x is_white is_cross"></i>
                                </button>
                                <button v-else type="button" class="info_box_menu_btn is_black" @click="ToggleItemMenu(i)">
                                    <i class="a-icon a-icon-menu a-icon-lg"></i>
                                </button>
                            </transition>
                        </div>
                        <div v-else>
                            <h2>{{item.title}}</h2>
                            <button type="button" class="info_box_menu_btn draggable_btn">
                                <i class="a-icon a-icon-move a-icon-lg is_gray"></i>
                            </button>
                        </div>

                        <transition name="slide-left-toggle">
                            <div v-if="itemMenu === i" class="info_box_menu">
                                <ul>
                                    <!-- <li v-if="i !== 0">
                                        <button type="button" @click="MoveItem('top',i)">
                                            <i class="a-icon a-icon-arrow_top a-icon-lg is_gray"></i><span class="a-icon_txt">一つ上に移動する</span>
                                        </button>
                                    </li>
                                    <li v-if="i !== userData.info.length - 1">
                                        <button type="button" @click="MoveItem('bottom',i)">
                                            <i class="a-icon a-icon-arrow_bottom a-icon-lg is_gray"></i><span class="a-icon_txt">一つ下に移動する</span>
                                        </button>
                                    </li> -->
                                    <li>
                                        <button :disabled="userData.info.length <= 1 ? true : false" type="button" @click="ItemDraggable()">
                                            <i class="a-icon a-icon-move a-icon-lg is_gray"></i><span class="a-icon_txt">並べ替える</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button :disabled="userData.info.length <= 1 ? true : false" type="button" @click="RemoveItem(i)">
                                            <i class="a-icon a-icon-minus a-icon-lg is_gray"></i><span class="a-icon_txt">削除する</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </transition>

                    </div>

                    <div v-if="!itemDraggable">

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

                    </div>

                </section>

            </draggable>

        </div>

        <p v-else class="no_result">基本情報がありません</p>

        <div v-if="!itemDraggable" class="info_box_btn">
            <button type="button" @click="ToggleAddItemMenu">
                <i class="a-icon a-icon-plus a-icon-1_75x is_blue" :class="{is_cross: addItemWindow}"></i>
            </button>
            <transition name="slide-down">
                <div v-if="addItemWindow" class="info_box_btn_menu">
                    <ul>
                        <li><button type="button" @click="AddItem('store')"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">お店</span></button></li>
                        <li><button type="button" @click="AddItem('career')"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">経歴</span></button></li>
                        <li><button type="button" @click="AddItem('other')"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">自由項目</span></button></li>
                    </ul>
                </div>
            </transition>
        </div>

    </div>

</template>

<script>
import draggable from 'vuedraggable'

import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import SetTimeOptions from '~/scripts/_setTimeOptions';

import EditItemInfoStore from '~/components/mypage/edit-item-info-store.vue'
import EditItemInfoCareer from '~/components/mypage/edit-item-info-career.vue'
import EditItemInfoOther from '~/components/mypage/edit-item-info-other.vue'

export default {
    props: [
        "userData",
        "OnFocus",
        "OnBlur",
        "itemDraggable",
        "ToggleItemDraggable"
    ],
    components: {
        EditItemInfoStore,
        EditItemInfoCareer,
        EditItemInfoOther,
        draggable
    },
    data () {
        return {
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
                }
            }
        }
    },
    computed : {
    },
    methods: {
        ToggleAddItemMenu() {
            this.addItemWindow = !this.addItemWindow;
            this.itemMenu = false;
        },
        AddItem: function(category) {
            this.userData.info.push( JSON.parse(JSON.stringify(this.newItem[category])) )
            this.addItemWindow = false;
        },
        ToggleItemMenu: function(i) {
            this.itemMenu = i;
            this.addItemWindow = false;
        },
        // MoveItem: function(type,index) {
        //     if(type === 'bottom') {
        //         this.userData.info.splice(index, 2, this.userData.info[index+1], this.userData.info[index]);
        //     } else {
        //         this.userData.info.splice(index-1, 2, this.userData.info[index], this.userData.info[index-1]);
        //     }
        //     this.itemMenu = false;
        // },
        ItemDraggable: function() {
            this.ToggleItemDraggable()
            this.itemMenu = false;
        },
        RemoveItem: function(index) {
            let res = confirm("このグループを削除しますか？");
            if( res == true ) {
                this.userData.info.splice(index, 1);
                this.itemMenu = false;
            }
        }
    },
    mounted: function() {
    },
    updated: function() {
    }

}
</script>
