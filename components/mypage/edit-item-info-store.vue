<template>

    <div v-if="item.contents_" class="info_box_wrap">

        <h3 class="a-ttl is_s is_gray f-mb5">住所</h3>
        <section>
            <label class="m-form_bg m-form_label f-mb5" data-before="〒">
                <input
                    class="a-form_input"
                    type="tel"
                    name="store_address_postal"
                    placeholder="000-0000"
                    @focus="OnFocus"
                    @blur="OnBlur"
                    :value="item.contents_.store_address.postal">
            </label>
            <label class="m-form_bg m-form_label">
                <textarea
                    ref="textarea"
                    class="a-form_textarea"
                    name="store_address_postal"
                    placeholder="住所を入力してください"
                    @focus="OnFocus"
                    @blur="OnBlur"
                    :value="item.contents_.store_address.text"></textarea>
            </label>
        </section>
        <div class="f-flex">
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">駅名</h3>
                <label class="m-form_bg">
                    <input
                        class="a-form_input"
                        type="text"
                        name="store_address_postal"
                        placeholder="最寄りの駅名を入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        :value="item.contents_.store_address.station">
                </label>
            </section>
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">改札・出口</h3>
                <label class="m-form_bg">
                    <input
                        class="a-form_input"
                        type="text"
                        name="store_address_postal"
                        placeholder="改札・出口を入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        :value="item.contents_.store_address.gate">
                </label>
            </section>
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">駅からの移動手段</h3>
                <label class="m-form_bg">
                    <select
                        class="a-form_select"
                        :value="item.contents_.store_address.way"
                        name="store_address_postal">
                        <option value="徒歩">徒歩</option>
                        <option value="バス">バス</option>
                        <option value="タクシー">タクシー</option>
                    </select>
                </label>
            </section>
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">駅からお店までの時間</h3>
                <label class="m-form_bg">
                    <input
                        class="a-form_input"
                        type="text"
                        name="store_address_postal"
                        placeholder="駅からの時間を入力してください"
                        @focus="OnFocus"
                        @blur="OnBlur"
                        :value="item.contents_.store_address.time">
                </label>
            </section>
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">開店時間</h3>
                <label class="m-form_bg">
                    <select
                        ref="start_time"
                        class="a-form_select"
                        :data-value="start_time ? start_time : item.contents_.store_time.start_time"
                        v-model="start_time"
                        @input="SetStartTime"
                        name="store_time_start_time">
                        <option value="">選択してください</option>
                        <option
                        v-for="opn in SetTimeOption"
                        :key="opn.n"
                        :value="opn.n">{{opn.t}}</option>
                    </select>
                </label>
            </section>
            <section class="f-flex6 m-form_sec">
                <h3 class="a-ttl is_s is_gray f-mb5">閉店時間</h3>
                <label class="m-form_bg">
                    <select
                        ref="end_time"
                        class="a-form_select"
                        :data-value="end_time ? end_time : item.contents_.store_time.end_time"
                        v-model="end_time"
                        name="store_time_end_time">
                        <option value="">選択してください</option>
                        <option
                        v-for="opn in SetTimeOption"
                        :key="opn.n"
                        :value="SetEndTimeValue(opn)">{{ SetTimeString(opn) }}</option>
                    </select>
                </label>
            </section>
        </div>
        <section class="m-form_sec">
            <h3 class="a-ttl is_s is_gray f-mb5">定休日</h3>
            <label class="m-form_bg">
                <input
                class="a-form_input"
                type="text"
                name="store_address_postal"
                placeholder="定休日を入力してください"
                @focus="OnFocus"
                @blur="OnBlur"
                :value="item.contents_.store_holiday.text">
            </label>
        </section>
        <section class="m-form_sec">
            <h3 class="a-ttl is_s is_gray f-mb5">URL</h3>
            <label class="m-form_bg">
                <input
                class="a-form_input"
                type="text"
                name="store_url"
                placeholder="お店のURLを入力してください"
                @focus="OnFocus"
                @blur="OnBlur"
                :value="item.contents_.store_url.text">
            </label>
        </section>

    </div>

</template>

<script>
import AdjustTextAreaHeight from '~/scripts/_adjustTextAreaHeight';
import SetTimeOptions from '~/scripts/_setTimeOptions';
export default {
    props: [
        "item",
        "i",
        "OnFocus",
        "OnBlur"
    ],
    data () {
        return {
            start_time: null,
            end_time: null,
        }
    },
    computed : {
        SetTimeOption() {
            return SetTimeOptions.for()
        },
        SetTimeString() {
            return (opn) => SetTimeOptions.text(opn,this.start_time);
        },
        SetEndTimeValue() {
            return (opn) => SetTimeOptions.endTimeVal(opn,this.start_time);
        }
    },
    methods: {
        SetStartTime: function(e) {
            let target = e.currentTarget ? e.currentTarget : e;
            this.start_time = target.dataset.value;
            setTimeout(()=> {
                this.SetEndTime(this.$refs.end_time)
            },1)
        },
        SetEndTime: function(e) {
            let target = e.currentTarget ? e.currentTarget : e,
                option = target.children,
                value = "";
            for (var j = 0; j < option.length; j++) { // valueに一致しなければ空にする
                if( target.dataset.value === option[j].value ) {
                    value = target.dataset.value;
                }
            }
            this.end_time = value;
        }
    },
    mounted: function() {
        AdjustTextAreaHeight(this.$refs.textarea)
        this.SetStartTime(this.$refs.start_time)
    },
    updated: function() {
    }

}
</script>
