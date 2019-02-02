<template>

    <div v-if="userData.info && userData.info.length !== 0" class="user_tab_inner user_tab_info">

        <draggable
            v-model="userData.info"
            :options="{disabled:!itemDraggable,animation:150}">

            <div v-for="(item,i) in userData.info" :key="i">

                <section class="info_box" :class="{'f-mb0': i == userData.info.length - 1 }">

                    <transition name="fade">
                        <div v-if="itemMenu === i" class="box_overlay" @click="ToggleItemMenu(null)"></div>
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
                                <button v-if="itemMenu === i" type="button" class="box_menu_btn is_black" @click="ToggleItemMenu(null)">
                                    <i class="a-icon a-icon-plus a-icon-1_75x is_white is_cross"></i>
                                </button>
                                <button v-else type="button" class="box_menu_btn is_black" @click="ToggleItemMenu(i)">
                                    <i class="a-icon a-icon-menu a-icon-lg"></i>
                                </button>
                            </transition>
                        </div>
                        <div v-else>
                            <h2>{{item.title}}</h2>
                            <button type="button" class="box_menu_btn draggable_btn">
                                <i class="a-icon a-icon-move a-icon-lg is_gray"></i>
                            </button>
                        </div>

                        <transition name="slide-left-toggle">
                            <div v-if="itemMenu === i" class="box_menu">
                                <ul>
                                    <li>
                                        <button :disabled="userData.info.length <= 1 ? true : false" type="button" @click="ChangeDraggable">
                                            <i class="a-icon a-icon-move a-icon-lg is_gray"></i><span class="a-icon_txt">並べ替える</span>
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" @click="RemoveItem(i, 'info')">
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

                <div v-if="!itemDraggable" class="info_box_btn">
                    <button type="button" @click="ToggleAddItemMenu(i)">
                        <i class="a-icon a-icon-plus a-icon-2x is_blue" :class="{is_cross: addItemWindow === i}"></i>
                    </button>
                    <transition name="slide-down">
                        <div v-if="addItemWindow === i" class="info_box_btn_menu">
                            <ul>
                                <li><button type="button" @click="AddItem('store','info', i)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">お店</span></button></li>
                                <li><button type="button" @click="AddItem('career','info', i)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">経歴</span></button></li>
                                <li><button type="button" @click="AddItem('other','info', i)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">自由項目</span></button></li>
                            </ul>
                        </div>
                    </transition>
                </div>
            </div>

        </draggable>

    </div>

    <div v-else>
        <p class="no_result">基本情報がありません</p>
        <div class="info_box_btn is_front">
            <button type="button" @click="ToggleAddItemMenu(0)">
                <i class="a-icon a-icon-plus a-icon-2x is_blue" :class="{is_cross: addItemWindow === 0}"></i>
            </button>
            <transition name="slide-down">
                <div v-if="addItemWindow === 0" class="info_box_btn_menu">
                    <ul>
                        <li><button type="button" @click="AddItem('store','info', 0)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">お店</span></button></li>
                        <li><button type="button" @click="AddItem('career','info', 0)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">経歴</span></button></li>
                        <li><button type="button" @click="AddItem('other','info', 0)"><i class="a-icon a-icon-plus a-icon-lg is_white"></i><span class="a-icon_txt">自由項目</span></button></li>
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
        "ToggleItemDraggable",

        "addItemWindow",
        "itemMenu",
        "ToggleAddItemMenu",
        "AddItem",
        "ToggleItemMenu",
        "ChangeDraggable",
        "RemoveItem"
    ],
    components: {
        EditItemInfoStore,
        EditItemInfoCareer,
        EditItemInfoOther,
        draggable
    },
    data () {
        return {
        }
    },
    computed : {
    },
    methods: {
    },
    mounted: function() {
    },
    updated: function() {
    }

}
</script>
