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
                        @focus="OnFocus"
                        @blur="OnBlur"
                        v-model="child.title">
                </label>
            </div>
            <div>
                <label class="m-form_bg m-form_label">
                    <textarea
                        v-if="child.type === 'textarea'"
                        ref="textarea"
                        class="a-form_textarea"
                        placeholder="テキストやURLを入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        v-model="child.text"></textarea>
                    <input
                        v-if="child.type === 'input'"
                        class="a-form_input"
                        type="text"
                        placeholder="テキストやURLを入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        v-model="child.text">
                    <input
                        type="hidden"
                        v-model="child.type">
                </label>
            </div>

            <button v-if="j > 0" type="button" class="info_box_inner_menu"><i class="a-icon a-icon-plus is_gray20 a-icon-lg"></i></button>

        </section>

        <div class="info_box_btn">
            <button type="button">
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
        }
    },
    mounted: function() {
        if(this.$refs.textarea && this.$refs.textarea.length > 0) {
            for (var i = 0; i < this.$refs.textarea.length; i++) {
                AdjustTextAreaHeight(this.$refs.textarea[i])
            }
        }
    },
    updated: function() {
    }

}
</script>
