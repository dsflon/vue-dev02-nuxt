<template>

    <div v-if="item.contents && item.contents.length !== 0" class="info_box_wrap">
        <section
            v-for="(child,j) in item.contents"
            :key="j"
            class="info_box_inner">

            <div class="info_box_inner_ttl">
                <div class="f-flex f-flex_mg40">
                    <div class="f-flex6">
                        <label class="m-form_bg m-form_label">
                            <input
                                class="a-form_input"
                                type="month"
                                ref="input_date"
                                :name="'title_'+i+'_'+j"
                                @input="_AdjustInputDate"
                                placeholder="年月を入力してください"
                                :value="SetDate(0,child.title)">
                        </label>
                    </div>
                    <div class="f-flex6">
                        <label class="m-form_bg m-form_label">
                            <input
                                class="a-form_input"
                                type="month"
                                ref="input_date"
                                :name="'title_'+i+'_'+j"
                                @input="_AdjustInputDate"
                                placeholder="年月を入力してください"
                                :value="SetDate(1,child.title)">
                        </label>
                    </div>
                </div>
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

</template>

<script>
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import AdjustInputDate from '~/scripts/_adjustInputDate';
export default {
    props: [
        "item",
        "i",
        "OnFocus",
        "OnBlur"
    ],
    data () {
        return {
        }
    },
    computed : {
        SetDate() {
            return (i,value) => {
                return value.split(" 〜 ")[i].replace(/\./g,"-")
            }
        }
    },
    methods: {
        _AdjustInputDate(e) {
            AdjustInputDate(e)
        }
    },
    mounted: function() {
        if(this.$refs.textarea && this.$refs.textarea.length > 0) {
            for (var i = 0; i < this.$refs.textarea.length; i++) {
                AdjustTextAreaHeight(this.$refs.textarea[i])
            }
        }
        if(this.$refs.input_date && this.$refs.input_date.length > 0) {
            for (var i = 0; i < this.$refs.input_date.length; i++) {
                AdjustInputDate(this.$refs.input_date[i])
            }
        }
    },
    updated: function() {
    }

}
</script>
