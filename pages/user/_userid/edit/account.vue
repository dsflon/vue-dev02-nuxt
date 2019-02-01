<template>
    <div>

        <app-header
            title="アカウントを編集"
            class="is_static"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

        <main id="detail" class="is_edit_account">

            <div class="detail_inner">

                <form v-if="userData" ref="form" class="contents is_btns">

                    <section class="m-form_sec">
                        <h2 class="a-ttl is_s is_gray f-mb5 is_required">お名前<span class="a-txt_s">（フルネーム）</span></h2>
                        <label class="m-form_bg">
                            <input
                                class="a-form_input"
                                required
                                type="text"
                                placeholder="お名前を入力してください"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="userData.user_fullname">
                        </label>
                    </section>
                    <section class="m-form_sec">
                        <h2 class="a-ttl is_s is_gray f-mb5 is_required">ニックネーム</h2>
                        <label class="m-form_bg">
                            <input
                                class="a-form_input"
                                required
                                type="text"
                                placeholder="ニックネームを入力してください"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="userData.user_name">
                        </label>
                    </section>

                    <section class="m-form_sec">
                        <h2 class="a-ttl is_s is_gray f-mb5 is_required">職業</h2>
                        <label class="m-form_bg">
                            <select
                                class="a-form_select"
                                tabIndex="-1"
                                ref="select"
                                @input="AdjustJobName($event); _AdjustSelect($event); OnBlur()"
                                @focus="OnFocus" @blur="OnBlur"
                                v-model="userData.job_id">
                                <option value="">選択してください</option>
                                <option
                                    v-for="item in $store.state.search.jobList"
                                    :key="item.job_id"
                                    :value="item.job_id">
                                    {{ item.job_name }}
                                </option>
                            </select>
                        </label>
                    </section>
                        <section class=" m-form_sec">
                            <h2 class="a-ttl is_s is_gray f-mb5 is_required">メールアドレス</h2>
                            <label class="m-form_bg">
                                <input
                                    class="a-form_input"
                                    required
                                    type="email"
                                    placeholder="メールアドレスを入力してください"
                                    @focus="OnFocus" @blur="OnBlur"
                                    v-model="userData.user_mail">
                            </label>
                        </section>
                        <section class=" m-form_sec">
                            <h2 class="a-ttl is_s is_gray f-mb5 is_required">電話番号<span class="a-txt_s">（ハイフン不要）</span></h2>
                            <label class="m-form_bg">
                                <input
                                    class="a-form_input"
                                    required
                                    type="tel"
                                    placeholder="電話番号を入力してください"
                                    @focus="OnFocus" @blur="OnBlur"
                                    v-model="userData.tel">
                            </label>
                        </section>

                    <div class="f-flex m-form_sec">
                        <section class="f-flex6">
                            <h2 class="a-ttl is_s is_gray f-mb5">性別</h2>
                            <label class="m-form_bg">
                                <select
                                    tabindex="-1"
                                    class="a-form_select"
                                    @input="_AdjustSelect($event); OnBlur()"
                                    @focus="OnFocus" @blur="OnBlur"
                                    v-model="userData.user_sex">
                                    <option value="">選択してください</option>
                                    <option value="0">女性</option>
                                    <option value="1">男性</option>
                                </select>
                            </label>
                        </section>
                        <section class="f-flex6">
                            <h2 class="a-ttl is_s is_gray f-mb5">生年月日</h2>
                            <label class="m-form_bg">
                                <input
                                    class="a-form_input a-form_date"
                                    required
                                    type="date"
                                    ref="input_date"
                                    @input="_AdjustInputDate($event); OnBlur()"
                                    @focus="OnFocus" @blur="OnBlur"
                                    v-model="userData.user_birthday">
                            </label>
                        </section>
                    </div>
                </form>

                <div class="m-btns is_sticky" :class="{is_focus: onfocus}">
                    <button class="a-btn" @click="backMyPage">
                        <i class="a-icon a-icon-arrow_left"></i>
                    </button>
                    <!-- <button class="a-btn" @click="ResetData">
                        <i class="a-icon a-icon-rotate_left a-icon-1_75x"></i>
                    </button> -->
                    <button class="a-btn is_blue" @click="SaveData">
                        <i class="a-icon a-icon-memory a-icon-1_75x"></i>
                    </button>
                </div>
            </div>

        </main>

    </div>
</template>

<script>
import AppHeader from '~/components/common/header.vue'
import FooterBtns from '~/components/common/footer-btns.vue'
import EditItem from '~/components/mypage/edit-item.vue'

import AdjustInputDate from '~/scripts/_adjustInputDate';
import AdjustSelect from '~/scripts/_adjustSelect';

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "user-userid-edit-account" && from == "user-userid" ) {
            return "slide-left"
        }
        else {
            // 通常遷移
            return "fade"
        }

    },
    head () {
        return {
            title: this.userData ? this.userData.user_name + " | Edit Account | User | Step Lack" : "ユーザーが見つかりません。 | Edit Profile | User | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: this.userData ? this.userData.user_name + "さんのページです。" : "ユーザーが見つかりません。" }
            ]
        }
    },
    data() {
        return {
            onfocus: false,
            userData: null,
            diff: false
        }
    },
    components: {
        AppHeader,
        EditItem,
        FooterBtns
    },
    methods: {
        _AdjustInputDate(e) { AdjustInputDate(e) },
        _AdjustSelect(e) { AdjustSelect(e) },
        AdjustJobName(e) {
            let i = e.currentTarget.value,
                jobList = this.$store.state.search.jobList;
            for (var key in jobList) {
                if (jobList[key].job_id == i) {
                    this.userData.job_name = jobList[key].job_name;
                }
            }
        },
        OnFocus() { this.onfocus = true; },
        OnBlur() { this.onfocus = false; },
        SetEditData() {
            this.$store.dispatch('search/GetJobList')
            .catch((error,txt)=>{
                console.error(error);
            })
            this.$store.dispatch('user/SetEditData',this.$store.state.detail.detailResult)
            .then((data) => {
                this.userData = JSON.parse(JSON.stringify(data));
            });
        },
        SaveData() {
            this.$store.dispatch('user/SaveEditData',this.userData)
            .then((data)=> {
                this.$store.dispatch('detail/SetDetailResult',data)
                this.$router.back();
            })
        },
        // ResetData() {
        //     if( this.CheckDiff() ) {
        //         let res = confirm("変更を取り消しますか？");
        //         if( res == true ) this.SetEditData();
        //     } else {
        //         window.BodyMessage.AutoPlay("変更はありません。");
        //     }
        // },
        backMyPage() {
            if( this.CheckDiff() ) {
                let res = confirm("変更を破棄しますか？");
                if( res )  {
                    this.$router.back();
                } else {
                    this.$router.back();
                }
            } else {
                this.$router.back();
            }
        },
        CheckDiff() {
            //内容の更新がある場合true
            return JSON.stringify(this.$store.state.detail.detailResult)!==JSON.stringify(this.userData)
        }
    },
    created: function() {
        this.SetEditData();
    },
    updated: function() {
        let select = document.getElementsByClassName('a-form_select'),
            date = document.getElementsByClassName('a-form_date');
        for (var i = 0; i < select.length; i++) AdjustSelect(select[i])
        for (var i = 0; i < date.length; i++) AdjustInputDate(date[i])
    },
    destroyed: function() {
        window.prev = "edit";
    }
}
</script>
