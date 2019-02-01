<template>
    <div>

        <div v-if="userData.menus && userData.menus.length !== 0" class="user_tab_inner user_tab_menu">

            <draggable
                v-model="userData.menus"
                :options="{disabled:!itemDraggable,animation:150}">

                <section
                    v-for="(item,i) in userData.menus"
                    :key="i" class="menu_box">

                    <transition name="fade">
                        <div v-if="itemMenu === i" class="box_overlay" @click="ToggleItemMenu(null)"></div>
                    </transition>

                    <div v-if="!itemDraggable" class="menu_box_inner">

                        <label class="m-form_bg m-form_label f-mb5">
                            <input
                                class="a-form_input is_bold"
                                type="text"
                                placeholder="メニュータイトルを入力してください"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="item.name">
                        </label>
                        <transition name="fade">
                            <button v-if="itemMenu === i" type="button" class="box_menu_btn is_menus is_black" @click="ToggleItemMenu(null)">
                                <i class="a-icon a-icon-plus a-icon-1_75x is_white is_cross"></i>
                            </button>
                            <button v-else type="button" class="box_menu_btn is_menus is_black" @click="ToggleItemMenu(i)">
                                <i class="a-icon a-icon-menu a-icon-lg"></i>
                            </button>
                        </transition>
                        <label class="m-form_bg m-form_label f-mb5" data-before="￥">
                            <input
                                class="a-form_input"
                                type="number"
                                placeholder="金額を入力してください"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="item.price">
                        </label>
                        <label class="m-form_bg m-form_label is_textarea">
                            <textarea
                                ref="textarea"
                                class="a-form_textarea"
                                :placeholder="'説明文を入力してください'"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="item.description"></textarea>
                        </label>

                    </div>
                    <div v-else>
                        <h2 class="menu_box_ttl">{{item.name}}</h2>
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
                                    <button :disabled="userData.info.length <= 1 ? true : false" type="button" @click="RemoveItem(i,'menus')">
                                        <i class="a-icon a-icon-minus a-icon-lg is_gray"></i><span class="a-icon_txt">削除する</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </transition>

                </section>

            </draggable>

        </div>

        <p v-else class="no_result">メニューがありません</p>

        <div v-if="!itemDraggable" class="info_box_btn">
            <button type="button" @click="AddItem('menus','menus')">
                <i class="a-icon a-icon-plus a-icon-1_75x is_blue"></i>
            </button>
        </div>

    </div>
</template>

<script>
import draggable from 'vuedraggable'
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
export default {
    props: [
        "userData",
        "OnFocus",
        "OnBlur",

        "itemDraggable",
        "ToggleItemDraggable",

        "addItemWindow",
        "itemMenu",
        "AddItem",
        "ToggleItemMenu",
        "ChangeDraggable",
        "RemoveItem"
    ],
    components: {
        draggable
    },
    data () {
        return {
        }
    },
    methods: {
        DoAdjust() {
            if(this.$refs.textarea && this.$refs.textarea.length > 0)
            for (var i = 0; i < this.$refs.textarea.length; i++) AdjustTextAreaHeight(this.$refs.textarea[i])
        }
    },
    mounted: function() {
        this.DoAdjust()
    },
    updated: function() {
        this.DoAdjust()
    }

}
</script>
