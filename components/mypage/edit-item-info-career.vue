<template>

    <div v-if="item.contents_ && item.contents_.length !== 0" class="info_box_wrap">

        <section
            v-for="(child,j) in item.contents_"
            :key="j"
            class="info_box_inner">

            <div class="info_box_inner_ttl">
                <div class="f-flex f-flex_mg40 a-date_tilde">
                    <div class="f-flex6">
                        <label class="m-form_bg m-form_label">
                            <input
                                class="a-form_input"
                                type="month"
                                ref="input_date"
                                @input="_AdjustInputDate"
                                placeholder="年月を入力してください"
                                v-model="child.date.start">
                        </label>
                    </div>
                    <div class="f-flex6">
                        <label class="m-form_bg m-form_label">
                            <input
                                class="a-form_input"
                                type="month"
                                ref="input_date"
                                @input="_AdjustInputDate"
                                placeholder="年月を入力してください"
                                v-model="child.date.end">
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <label class="m-form_bg m-form_label is_textarea">
                    <textarea
                        ref="textarea"
                        class="a-form_textarea"
                        placeholder="テキストを入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        v-model="child.text"></textarea>
                </label>
            </div>

            <button v-if="j > 0" type="button" class="info_box_inner_menu" @click="RemoveChild(j)">
                <i class="a-icon a-icon-minus is_gray20 a-icon-lg"></i>
            </button>

        </section>

        <div class="info_box_btn">
            <button type="button" @click="AddChild">
                <i class="a-icon a-icon-plus is_gray a-icon-1_75x"></i>
            </button>
        </div>

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
    },
    methods: {
        _AdjustInputDate(e) {
            AdjustInputDate(e)
        },
        AddChild() {
            this.item.contents_.push({
                "date": { "start": "", "end": "" },
                "type": "textarea",
                "text": ""
            })
        },
        RemoveChild: function(j) {
            let res = confirm("項目を削除しますか？");
            if( res == true ) {
                let removedList = this.item.contents_.filter((a,i) => i !== j);
                this.item.contents_ = removedList;
            }
        },
        DoAdjust() {
            if(this.$refs.input_date && this.$refs.input_date.length > 0) {
                for (var i = 0; i < this.$refs.input_date.length; i++) {
                    AdjustInputDate(this.$refs.input_date[i])
                }
            }
            if(this.$refs.textarea && this.$refs.textarea.length > 0) {
                for (var i = 0; i < this.$refs.textarea.length; i++) {
                    if(!this.$refs.textarea[i].style["0"]) AdjustTextAreaHeight(this.$refs.textarea[i])
                }
            }
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
