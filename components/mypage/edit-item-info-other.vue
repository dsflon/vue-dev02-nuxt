<template>

    <div v-if="item.contents && item.contents.length !== 0" class="info_box_wrap">
        <section
            v-for="(child,j) in item.contents"
            :key="j"
            class="info_box_inner">

            <div class="info_box_inner_ttl">
                <label class="m-form_bg m-form_label">
                    <input
                        class="a-form_input is_bold"
                        type="text"
                        placeholder="タイトルを入力してください"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="child.title">
                </label>
            </div>
            <div>
                <label class="m-form_bg m-form_label is_textarea">
                    <textarea
                        ref="textarea"
                        class="a-form_textarea"
                        :placeholder="(item.category==='links'?'URL':'テキスト')+'を入力してください'"
                        @focus="OnFocus" @blur="OnBlur"
                        v-model="child.text"></textarea>
                </label>
            </div>

            <button v-if="j > 0" type="button" class="info_box_inner_menu" @click="RemoveChild(j)">
                <i class="a-icon a-icon-minus is_gray20 a-icon-lg"></i>
            </button>

        </section>

        <div class="info_box_btn">
            <button type="button" @click="AddChild">
                <i class="a-icon a-icon-plus is_gray20 a-icon-1_5x"></i>
            </button>
        </div>

    </div>

</template>

<script>
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
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
        AddChild() {
            this.item.contents.push({
                "title": "",
                "type": this.item.category==='links'?'input':'textarea',
                "text": ""
            })
        },
        RemoveChild: function(index) {
            let res = confirm("項目を削除しますか？");
            if( res == true ) {
                this.item.contents.splice(index, 1);
            }
        },
        DoAdjust() {
            if(this.$refs.textarea && this.$refs.textarea.length > 0) {
                for (var i = 0; i < this.$refs.textarea.length; i++) {
                    AdjustTextAreaHeight(this.$refs.textarea[i])
                }
            }
        }
    },
    mounted: function() {
        this.DoAdjust();
    },
    updated: function() {
        this.DoAdjust();
    }

}
</script>
