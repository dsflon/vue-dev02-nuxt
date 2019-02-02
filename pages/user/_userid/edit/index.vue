<template>
    <div>

        <app-header
            title="プロフィールを編集"
            class="is_static"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

        <button v-if="draft" class="a-btn_draft" type="button" @click="ToggleApplyDraftBox">下書き</button>

        <main id="detail" class="is_edit">

            <div class="detail_inner">

                <form ref="form" class="contents">
                    <edit-item
                        v-if="userData"
                        :itemDraggable="itemDraggable"
                        :ToggleItemDraggable="ToggleItemDraggable"
                        :OnFocus="OnFocus"
                        :OnBlur="OnBlur"
                        :userData="userData" />
                </form>

                <div class="m-btns is_sticky" :class="{is_focus: onfocus}">
                    <button v-if="!itemDraggable" class="a-btn" @click="backMyPage">
                        <i class="a-icon a-icon-arrow_left"></i>
                    </button>
                    <!-- <button v-if="!itemDraggable" class="a-btn" @click="ResetData">
                        <i class="a-icon a-icon-rotate_left a-icon-1_75x"></i>
                    </button> -->
                    <button v-if="!itemDraggable" class="a-btn is_blue" @click="SaveData">
                        <i class="a-icon a-icon-memory a-icon-1_75x"></i>
                    </button>
                    <button v-if="itemDraggable" class="a-btn is_blue" @click="ToggleItemDraggable">
                        <i class="a-icon a-icon-check"></i>
                    </button>
                </div>
            </div>

            <transition name="fade">
                <div v-if="toggleSaveDraftBox" class="m-box_confirm">
                    <div class="m-box_confirm_inner">
                        <p>下書きを保存しますか？</p>
                        <div class="m-box_confirm_btns">
                            <button class="is_no" type="button" @click="SaveDraftNo">いいえ</button>
                            <button class="is_yes" type="button" @click="SaveDraftYes">はい</button>
                        </div>
                    </div>
                </div>
            </transition>
            <transition name="fade">
                <div v-if="toggleApplyDraftBox" class="m-box_confirm">
                    <div class="m-box_confirm_inner">
                        <p>下書きを適用しますか？</p>
                        <div class="m-box_confirm_btns">
                            <button class="is_no" type="button" @click="ToggleApplyDraftBox">いいえ</button>
                            <button class="is_no" type="button" @click="RemoveDraft">削除</button>
                            <button class="is_yes" type="button" @click="ApplyDraft">はい</button>
                        </div>
                    </div>
                </div>
            </transition>

        </main>

    </div>
</template>

<script>
import AppHeader from '~/components/common/header.vue'
import AppFooter from '~/components/common/footer.vue'
import FooterBtns from '~/components/common/footer-btns.vue'

import EditItem from '~/components/mypage/edit-item.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "user-userid-edit" && from == "user-userid" ) {
            return "slide-left"
        }
        else {
            // 通常遷移
            return "fade"
        }

    },
    head () {
        return {
            title: this.userData ? this.userData.user_name + " | Edit Profile | User | Step Lack" : "ユーザーが見つかりません。 | Edit Profile | User | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: this.userData ? this.userData.user_name + "さんのページです。" : "ユーザーが見つかりません。" }
            ]
        }
    },
    data() {
        return {
            onfocus: false,
            userData: null,
            itemDraggable: false,
            diff: false,
            toggleSaveDraftBox: false,
            toggleApplyDraftBox: false,
            draft: null //下書きデータ
        }
    },
    components: {
        AppHeader,
        AppFooter,
        EditItem,
        FooterBtns
    },
    methods: {
        OnFocus() { this.onfocus = true; },
        OnBlur() { this.onfocus = false; },
        ToggleItemDraggable: function() {
            this.itemDraggable = !this.itemDraggable;
        },
        SetEditData() {
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
                localStorage.removeItem(window.LSProfileDraft)
            })
        },
        backMyPage() {
            if( this.CheckDiff() ) {
                this.toggleSaveDraftBox = true;
            } else {
                this.$router.back();
            }
        },
        CheckDiff() { //内容の更新がある場合true
            return JSON.stringify(this.$store.state.detail.detailResult)!==JSON.stringify(this.userData)
        },

        //下書き関連
        SaveDraftYes() { //下書きを保存する
            localStorage.setItem(window.LSProfileDraft, JSON.stringify({
                description: this.userData.description,
                info: this.userData.info,
                menus: this.userData.menus
            }));
            this.toggleSaveDraftBox = false;
            this.$router.back();
            window.BodyMessage.AutoPlay( "下書きを保存しました。" );
        },
        SaveDraftNo() { //下書きを保存しないで前のページへ戻る
            this.toggleSaveDraftBox = false;
            this.$router.back();
        },
        ToggleApplyDraftBox() { //下書き適用boxの開閉
            this.toggleApplyDraftBox = !this.toggleApplyDraftBox;
        },
        RemoveDraft(message) { //下書きを削除する
            localStorage.removeItem(window.LSProfileDraft);
            this.draft = null;
            this.toggleApplyDraftBox = false;
            window.BodyMessage.AutoPlay( message ? message : "下書きを削除しました。" );
        },
        ApplyDraft() { //下書きを適用する
            this.userData.description = JSON.parse(this.draft).description;
            this.userData.info = JSON.parse(this.draft).info;
            this.userData.menus = JSON.parse(this.draft).menus;
            this.RemoveDraft("下書きを適用しました。")
        }
    },
    created: function() {
        this.SetEditData();
        this.draft = localStorage.getItem(window.LSProfileDraft);
    },
    updated: function() {
    },
    destroyed: function() {
        window.prev = "edit";
    }
}
</script>
