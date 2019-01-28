<template>

    <div v-if="newInfoData && newInfoData.length !== 0" class="user_tab_inner user_tab_info">

        <section
            v-for="(item,i) in newInfoData"
            :key="i" class="info_box">

            <div v-if="item.category==='store'">
                <div class="info_box_ttl">
                    <h2>{{item.title}}</h2>
                    <button type="button" class="info_box_menu"><i class="a-icon a-icon-menu a-icon-lg"></i></button>
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
                    <button type="button" class="info_box_menu"><i class="a-icon a-icon-menu a-icon-lg"></i></button>
                </div>
                <edit-item-info-career
                    :i="i"
                    :item="item"
                    :OnFocus="OnFocus"
                    :OnBlur="OnBlur" />
            </div>
            <!-- / item.type==='career' -->

            <div v-else>
                <div class="info_box_ttl">
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

                <edit-item-info-other
                    :i="i"
                    :item="item"
                    :OnFocus="OnFocus"
                    :OnBlur="OnBlur" />

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
