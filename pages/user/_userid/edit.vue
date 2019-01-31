<template>
    <div>

        <app-header
            title="プロフィールを編集"
            class="is_static"
            :userId=" $route.params.userid ? $route.params.userid : ''"
            icon="" />

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
                    <button v-if="!itemDraggable" class="a-btn" @click="ResetData">
                        <i class="a-icon a-icon-rotate_left a-icon-1_75x"></i>
                    </button>
                    <button v-if="!itemDraggable" class="a-btn is_blue" @click="SaveData">
                        <i class="a-icon a-icon-memory a-icon-1_75x"></i>
                    </button>
                    <button v-if="itemDraggable" class="a-btn is_blue" @click="ToggleItemDraggable">
                        <i class="a-icon a-icon-check"></i>
                    </button>
                </div>
            </div>

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
            return "slide-down"
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
            diff: false
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

            let res = confirm("変更を保存し公開しますか？");
            if( res == true ) {

                this.$store.dispatch('user/SaveEditData',this.userData)
                .then((data)=> {
                    this.$store.dispatch('detail/SetDetailResult',data)
                    this.$router.replace( location.pathname.split("/edit")[0] )
                })

            }
        },
        ResetData() {
            let res = confirm("変更を取り消しますか？");
            if( res == true ) {
                this.SetEditData();
            }
        },
        backMyPage() {
            if( this.CheckDiff() ) {
                let res = confirm("変更を取り消して前のページへ戻りますか？");
                if( res == true ) {
                    this.$router.replace( location.pathname.split("/edit")[0] )
                }
            } else {
                this.$router.replace( location.pathname.split("/edit")[0] )
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
    },
    destroyed: function() {
        window.prev = "edit";
    }
}
</script>
