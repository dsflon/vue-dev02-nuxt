<template>

    <div v-if="newInfoData && newInfoData.length !== 0" class="user_tab_inner user_tab_info">

        <section
            v-for="(item,i) in newInfoData"
            :key="i" class="info_box">

            <div v-if="item.category==='store'">
                <div class="info_box_ttl">
                    <h2>{{item.title}}</h2>
                    <button type="button" class="info_box_menu is_black"><i class="a-icon a-icon-menu a-icon-lg"></i></button>
                </div>
                <edit-item-info-store
                    :i="i"
                    :item="item"
                    :OnFocus="OnFocus"
                    :OnBlur="OnBlur" />
            </div>
            <!-- / item.type==='store' -->

            <div v-else-if="item.category==='career'">
                <div class="info_box_ttl">
                    <h2>{{item.title}}</h2>
                    <button type="button" class="info_box_menu is_black"><i class="a-icon a-icon-menu a-icon-lg"></i></button>
                </div>
                <edit-item-info-career
                    :i="i"
                    :item="item"
                    :OnFocus="OnFocus"
                    :OnBlur="OnBlur" />
            </div>
            <!-- / item.type==='store' -->

            <div v-else>
                <div class="info_box_ttl">
                    <!-- <h3 class="a-ttl is_s is_gray f-mb5">カテゴリー名</h3> -->
                    <h2>{{item.title}}</h2>
                    <!-- <label class="m-form_bg m-form_label">
                        <input
                            class="a-form_input is_bold"
                            type="text"
                            :name="'group_'+i"
                            placeholder="カテゴリー名を入力してください"
                            @focus="OnFocus"
                            @blur="OnBlur"
                            :value="item.title">
                    </label> -->
                    <button type="button" class="info_box_menu is_black">
                        <i class="a-icon a-icon-menu a-icon-lg"></i>
                    </button>
                </div>

                <div v-if="item.contents && item.contents.length !== 0" class="info_box_wrap">
                    <section
                        v-for="(child,j) in item.contents"
                        :key="j"
                        class="info_box_inner">

                        <div class="info_box_inner_ttl">
                            <!-- <p class="a-ttl is_s is_gray f-mb5">タイトル</p> -->
                            <label class="m-form_bg m-form_label">
                                <input
                                    class="a-form_input is_bold"
                                    type="text"
                                    :name="'title_'+i+'_'+j"
                                    placeholder="タイトルを入力してください"
                                    @focus="OnFocus"
                                    @blur="OnBlur"
                                    :value="child.title">
                            </label>
                        </div>
                        <div>
                            <!-- <p v-if="checkLink(child.text)" class="a-ttl is_s is_gray f-mb5">URL</p>
                            <p v-else class="a-ttl is_s is_gray f-mb5">テキスト</p> -->
                            <label class="m-form_bg m-form_label">
                                <textarea
                                    ref="textarea"
                                    class="a-form_textarea"
                                    :name="'text_'+i+'_'+j"
                                    placeholder="テキストを入力してください"
                                    @focus="OnFocus"
                                    @blur="OnBlur"
                                    :value="child.text"></textarea>
                            </label>
                        </div>

                    </section>
                </div>

                <div class="info_box_btn">
                    <button type="button">
                        <i class="a-icon a-icon-plus is_gray20 a-icon-1_75x"></i>
                    </button>
                </div>

            </div>

        </section>

        <div class="info_box_btn">
            <button type="button">
                <i class="a-icon a-icon-plus is_blue a-icon-1_75x"></i>
            </button>
        </div>

    </div>

    <p v-else class="no_result">基本情報がありません</p>

</template>

<script>
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import SetTimeOptions from '~/scripts/_setTimeOptions';

import EditItemInfoStore from '~/components/mypage/edit-item-info-store.vue'
import EditItemInfoCareer from '~/components/mypage/edit-item-info-career.vue'

export default {
    props: [
        "infoData",
        "OnFocus",
        "OnBlur"
    ],
    components: {
        EditItemInfoStore,
        EditItemInfoCareer
    },
    data () {
        return {
            newInfoData: this.infoData
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
