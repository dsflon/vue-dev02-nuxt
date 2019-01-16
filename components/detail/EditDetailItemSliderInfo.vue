<template>

    <div v-if="infoData && infoData.length !== 0" class="user_tab_inner user_tab_info">

        <section
            v-for="(item,i) in infoData"
            :key="i" class="info_box">

            <div v-if="item.type==='store'">

                <h2 class="info_box_ttl">お店</h2>

                <div v-if="item.contents_" class="info_box_wrap">
                    <section>
                        <h3 class="a-ttl is_s is_gray">住所</h3>
                        <label class="m-form_line m-form_label is_postal">
                            <input
                                class="a-form_input"
                                type="tel"
                                name="store_address_postal"
                                placeholder="000-0000"
                                :value="item.contents_.store_address.postal">
                        </label>
                        <label class="m-form_line m-form_label">
                            <input
                                class="a-form_input"
                                type="text"
                                name="store_address_postal"
                                placeholder="住所を入力してください"
                                :value="item.contents_.store_address.text">
                        </label>
                    </section>
                    <div class="f-flex">
                        <section class="f-flex6 m-form_sec">
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">駅名</h3>
                                <input
                                    class="a-form_input"
                                    type="text"
                                    name="store_address_postal"
                                    placeholder="最寄りの駅名を入力してください"
                                    :value="item.contents_.store_address.station">
                            </label>
                        </section>
                        <section class="f-flex6 m-form_sec">
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">改札・出口</h3>
                                <input
                                    class="a-form_input"
                                    type="text"
                                    name="store_address_postal"
                                    placeholder="改札・出口を入力してください"
                                    :value="item.contents_.store_address.gate">
                            </label>
                        </section>
                        <section class="f-flex6 m-form_sec">
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">移動手段</h3>
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
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">時間</h3>
                                <input
                                    class="a-form_input"
                                    type="text"
                                    name="store_address_postal"
                                    placeholder="駅からの時間を入力してください"
                                    :value="item.contents_.store_address.time">
                            </label>
                        </section>
                        <section class="f-flex6 m-form_sec">
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">開店時間</h3>
                                <!-- :value="item.contents_.store_time.start_time" -->
                                <!-- v-model="start_time[i].n" -->
                                <select
                                    ref="start_time"
                                    class="a-form_select"
                                    :value="item.contents_.store_time.start_time"
                                    name="store_time_start_time">
                                    <option
                                        v-for="item in SetTimeOption()"
                                        :key="item.n"
                                        :value="item.n">{{item.t}}</option>
                                </select>
                            </label>
                        </section>
                        <section class="f-flex6 m-form_sec">
                            <label class="m-form_line">
                                <h3 class="a-ttl is_s is_gray">閉店時間</h3>
                                <select
                                    ref="end_time"
                                    class="a-form_select"
                                    :value="item.contents_.store_time.end_time"
                                    name="store_time_end_time">
                                    <option v-for="item in SetTimeOption()"
                                        :key="item.n"
                                        :value="SetTimeValue(item,i)">
                                        <!-- {{ SetTimeString(item) }} --></option>
                                </select>
                            </label>
                        </section>
                    </div>

                </div>

            </div>

        </section>
    </div>

    <p v-else class="no_result">基本情報がありません</p>

</template>

<script>
import AdjustTextAreaHeight from '~/middleware/_adjustTextAreaHeight';

export default {
    props: [
        "infoData"
    ],
    data () {
        return {
            start_time: [],
            end_time: [],
        }
    },
    methods: {
        _AdjustTextAreaHeight(e) {
            AdjustTextAreaHeight(e.currentTarget)
        },
        AjustEndTime(e) {
            console.log(e.currentTarget.value);
        },
        SetStartTime: function() {
            this.start_time.push({ n: "", t: "" })
        },
        SetEndTime: function() {
            this.start_time.push({ n: "", t: "" })
        }
    },
    computed : {
        checkLink: function () { // ここでやらないとエラー出る
            return function (value) {
                if(!value) return null;
                return value.indexOf("http") !== -1;
            };
        },
        SetTimeOption() {
            return () => {
                let data = [];
                for (var i = 1; i <= 24; i++) {
                    let n = i*100,
                        _n = String(i*100),
                        t = _n.split("");
                        t = n < 1000 ? (t[0]+":"+t[1]+t[2]) : (t[0]+t[1]+":"+t[2]+t[3]);
                    data.push({ "n": n, "t": t })
                }
                return data;
            }
        },
        SetTimeString() {
            return item => item.n <= this.start_time.n ? "翌 " + item.t : item.t;
        },
        SetTimeValue() {
            return (item,i) => {
                console.log(this.$refs.start_time);
                return "";
            }
            // return (item.n <= start_time.n) ? (24*100) + item.n : item.n;
        }
    },
    mounted: function() {
        if(this.$refs.textarea) {
            for (var i = 0; i < this.$refs.textarea.length; i++) {
                AdjustTextAreaHeight(this.$refs.textarea[i])
            }
        }
        for (var i = 0; i < this.$refs.end_time.length; i++) {
            console.log(this.$refs.end_time[i]);
        }
    }

}
</script>
