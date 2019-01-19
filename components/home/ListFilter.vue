<template>
    <div>

        <form ref="form" class="contents">

            <section>
                <h2 class="a-ttl is_bg">絞り込み</h2>

                <div class="filter-inner">

                    <section>
                        <h3 class="a-ttl is_s">金額</h3>
                        <div class="filter-item f-flex f-flex_mg40">

                            <div class="f-flex6">
                                <div class="m-form_line">
                                    <select
                                        class="a-form_select"
                                        tabIndex="-1"
                                        data-type="min_price"
                                        v-model="min_price.n"
                                        @input="SetSelectValue">
                                        <option value="">指定なし</option>
                                        <option value="1000">1,000</option>
                                        <option value="3000">3,000</option>
                                        <option value="5000">5,000</option>
                                        <option value="10000">10,000</option>
                                        <option value="20000">20,000</option>
                                    </select>
                                </div>
                            </div>
                            <div class="f-flex6">
                                <div class="m-form_line">
                                    <select
                                        class="a-form_select"
                                        tabIndex="-1"
                                        data-type="max_price"
                                        v-model="max_price.n"
                                        @input="SetSelectValue">
                                        <option value="">指定なし</option>
                                        <option value="3000">3,000</option>
                                        <option value="5000">5,000</option>
                                        <option value="10000">10,000</option>
                                        <option value="20000">20,000</option>
                                        <option value="30000">30,000</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </section>

                    <section>
                        <h3 class="a-ttl is_s">営業時間</h3>
                        <div class="filter-item f-flex f-flex_mg40">

                            <div class="f-flex6">
                                <div class="m-form_line">
                                    <select
                                        class="a-form_select"
                                        tabIndex="-1"
                                        data-type="start_time"
                                        ref="start_time"
                                        v-model="start_time.n"
                                        @input="SetSelectValue">
                                        <option value="">指定なし</option>
                                        <option
                                            v-for="item in SetTimeOption"
                                            :key="item.n"
                                            :value="item.n">{{item.t}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="f-flex6">
                                <div class="m-form_line">
                                    <select class="a-form_select"
                                        tabIndex="-1"
                                        data-type="end_time"
                                        ref="end_time"
                                        v-model="end_time.n"
                                        @input="SetSelectValue">
                                        <option value="">指定なし</option>
                                        <option v-for="opn in SetTimeOption"
                                            :key="opn.n"
                                            :value=" (opn.n <= start_time.n) ? (24*100) + opn.n : opn.n">
                                            {{ SetTimeString(opn) }}
                                        </option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </section>

                </div>
            </section>

            <section>
                <h2 class="a-ttl is_bg">並び替え</h2>

                <div class="filter-inner">

                    <div class="sort-item f-flex">
                        <div class="f-flex4">
                            <button @click="Sort"
                                :class="'a-btn_txt is_s' + (sort && sort.type==='min_price'?' is_active':'')"
                                data-sorttype="min_price"
                                type="button">安い順</button>
                        </div>
                        <div class="f-flex4">
                            <button @click="Sort"
                                :class="'a-btn_txt is_s' + (sort && sort.type==='max_price'?' is_active':'')"
                                data-sorttype="max_price"
                                type="button">高い順</button>
                        </div>
                        <div class="f-flex4">
                            <button @click="Sort"
                                :class="'a-btn_txt is_s' + (sort && sort.type==='count_follows'?' is_active':'')"
                                data-sorttype="count_follows"
                                type="button">フォロワー順</button>
                        </div>
                        <div class="f-flex4">
                            <button @click="Sort"
                                :class="'a-btn_txt is_s' + (sort && sort.type==='count_likes'?' is_active':'')"
                                data-sorttype="count_likes"
                                type="button">いいね順</button>
                        </div>
                        <div class="f-flex4">
                            <button @click="Sort"
                                :class="'a-btn_txt is_s' + (sort && sort.type==='count_posts'?' is_active':'')"
                                data-sorttype="count_posts"
                                type="button">投稿数順</button>
                        </div>
                    </div>
                </div>
            </section>

        </form>

        <div class="m-btns is_sticky" ref="btns">
            <button class="a-btn" @click="ToggleFilter">
                <i class="a-icon a-icon-cross"></i>
            </button>
            <button class="a-btn is_m" @click="Reset">
                <i class="a-icon a-icon-rotate_left"></i>
            </button>
            <button class="a-btn is_l is_blue" @click="Search">
                <i class="a-icon a-icon-search"></i>
            </button>
        </div>

    </div>
</template>


<script>
import ListFilter from '~/middleware/_listFilter';
import SetTimeOptions from '~/middleware/_setTimeOptions';

export default {
    props: [
        "ToggleFilter"
    ],
    data () {
        return {
            sort: { type: null, text: "" },
            min_price: { n: "", t: "" },
            max_price: { n: "", t: "" },
            start_time: { n: "", t: "" },
            end_time: { n: "", t: "" },
        }
    },
    methods: {
        Search: function(e) {

            ListFilter(
                this.$store.state.home.searchResultOrigin,
                {
                    min_price: this.min_price,
                    max_price: this.max_price,
                    start_time: this.start_time,
                    end_time: this.end_time,
                    sort: this.sort
                },
                (data,filter) => {
                    this.ToggleFilter();
                    localStorage.setItem(window.LSResult, JSON.stringify(data));
                    this.$store.dispatch('home/SetSearchResult',data)
                    this.$store.dispatch('home/SetFilterData',filter)
                }
            )

        },
        Reset: function(e) {

            this.sort = { type: null, text: "" };
            this.min_price = { n: "", t: "" };
            this.max_price = { n: "", t: "" };
            this.start_time = { n: "", t: "" };
            this.end_time = { n: "", t: "" };

        },

        Sort: function(e) {
            let sortType = e.currentTarget.dataset.sorttype;
            this.sort = {
                type: this.sort&&this.sort.type !== sortType ? sortType : null,
                text: this.sort&&this.sort.type !== sortType ? e.currentTarget.innerText : ""
            }
        },

        SetSelectValue: function(e) {

            let target = e.currentTarget,
                type = target.dataset.type

            this[type] = {
                n: Number(target.value),
                t: target.options[target.selectedIndex].text
            }

            if(type==="start_time") setTimeout(()=> { this.SetEndTime() },1);

        },
        SetEndTime: function() {
            let option = this.$refs.end_time.children,
                value = { n: "", t: "指定なし" };

            for (var j = 0; j < option.length; j++) { // valueに一致しなければ空にする
                if( this.end_time.n === Number(option[j].value) ) {
                    value = this.end_time;
                }
            }
            this.end_time = value
        }

    },

    computed: {
        SetTimeOption() {
            return SetTimeOptions.for()
        },
        SetTimeString() {
            return opn => SetTimeOptions.text(opn,this.start_time.n);
        }
    },

    mounted: function() {

        // filterDataがあったら反映する
        let store = this.$store.state.home.filterData;
        for (var key in store) this[key] = store[key];

    }
}
</script>
