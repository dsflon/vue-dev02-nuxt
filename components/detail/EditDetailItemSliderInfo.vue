<template>

    <div v-if="newInfoData && newInfoData.length !== 0" class="user_tab_inner user_tab_info">

        <section
            v-for="(item,i) in newInfoData"
            :key="i" class="info_box">

            <div v-if="item.type==='store'">

                <div class="info_box_ttl">
                    <h2>{{item.title}}</h2>
                    <button type="button" class="info_box_menu is_black">
                        <i class="a-icon a-icon-menu a-icon-lg"></i>
                    </button>
                </div>

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
                                    :data-value="start_time[i] ? start_time[i] : item.contents_.store_time.start_time"
                                    v-model="start_time[i]"
                                    @input="SetStartTime(i, $event)"
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
                                    :data-value="end_time[i] ? end_time[i] : item.contents_.store_time.end_time"
                                    v-model="end_time[i]"
                                    name="store_time_end_time">
                                    <option value="">選択してください</option>
                                    <option
                                        v-for="opn in SetTimeOption"
                                        :key="opn.n"
                                        :value="SetEndTimeValue(opn,i)">{{ SetTimeString(opn,i) }}</option>
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
                                :value="item.contents_.store_holiday.time">
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
                                <input
                                    v-if="checkLink(child.text)"
                                    class="a-form_input"
                                    type="text"
                                    :name="'url_'+i+'_'+j"
                                    placeholder="URLを入力してください"
                                    @focus="OnFocus"
                                    @blur="OnBlur"
                                    :value="child.text">
                                <textarea
                                    v-else
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
export default {
    props: [
        "infoData",
        "OnFocus",
        "OnBlur"
    ],
    data () {
        return {
            newInfoData: this.infoData,
            start_time: [],
            end_time: [],
        }
    },
    computed : {
        checkLink() {
            return (value) => {
                if(!value) return null;
                return value.indexOf("http") !== -1;
            };
        },
        SetTimeOption() {
            return SetTimeOptions.for()
        },
        SetTimeString() {
            return (opn,i) => SetTimeOptions.text(opn,this.start_time[i]);
        },
        SetEndTimeValue() {
            return (opn,i) => SetTimeOptions.endTimeVal(opn,this.start_time[i]);
        }
    },
    methods: {
        _AdjustTextAreaHeight(e) {
            AdjustTextAreaHeight(e.currentTarget)
        },
        SetStartTime: function(i,e) {
            let target = e.currentTarget ? e.currentTarget : e;
            this.start_time.splice(i, 1, target.dataset.value);
            setTimeout(()=> {
                this.SetEndTime(i,this.$refs.end_time[i])
            },1)
        },
        SetEndTime: function(i,e) {
            let target = e.currentTarget ? e.currentTarget : e,
                option = target.children,
                value = "";
            for (var j = 0; j < option.length; j++) { // valueに一致しなければ空にする
                if( target.dataset.value === option[j].value ) {
                    value = target.dataset.value;
                }
            }
            this.end_time.splice(i, 1, value);
        }
    },
    mounted: function() {
        if(this.$refs.textarea) {
            for (var i = 0; i < this.$refs.textarea.length; i++) {
                AdjustTextAreaHeight(this.$refs.textarea[i])
            }
        }
        if(this.$refs.start_time) {
            for (var i = 0; i < this.$refs.start_time.length; i++) {
                this.SetStartTime(i, this.$refs.start_time[i])
            }
        }
    },
    updated: function() {
    }

}
</script>
