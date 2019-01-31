<template>
    <header id="header">

        <div id="header_inner">

            <h1 v-if="title" class="header_ttl">
                {{title}}
            </h1>
            <h1 v-else class="header_logo">
                <img src="~/assets/images/common/logo.svg" alt="Step Lack">
            </h1>

            <icon-user v-if="icon == 'user'" />

            <icon-followed v-else-if="icon == 'followed'" />

            <div v-else-if="icon == 'mypage'" class="header_btns">
                <button class="a-btn_header is_black" @click="ToggleMenu()">
                    <i class="a-icon a-icon-menu"></i>
                </button>
            </div>

        </div>

        <transition name="slide-down">
            <div v-if="$store.state.common.menu && $store.state.user.myData" id="header_menu">
                <div class="header_menu_inner">
                    <ul>
                        <li>
                            <router-link
                                class="header_menu_btn"
                                :to="$route.path+'/edit'">
                                <i class="a-icon a-icon-edit a-icon-lg"></i><span class="a-icon_txt">プロフィール編集</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link
                                class="header_menu_btn"
                                :to="$route.path+'/account'">
                                <i class="a-icon a-icon-user a-icon-1_5x"></i><span class="a-icon_txt">アカウント編集</span>
                            </router-link>
                        </li>
                        <li>
                            <button class="header_menu_btn is_signout" @click="SignOut()">サインアウト</button>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

    </header>
</template>


<script>
import IconUser from '~/components/common/icon-user.vue'
import IconFollowed from '~/components/common/icon-followed.vue'

export default {
    components: {
        IconUser,
        IconFollowed
    },
    props: [
        "title",
        "userId",
        "icon"
    ],
    methods: {
        ToggleMenu: function() {
            this.$store.dispatch('common/ToggleMenu')
        },
        SignOut: function() {
            let res = confirm("サインアウトしますか？");
            if( res == true ) {

                this.$store.dispatch('user/SetMyData',null).then( (data)=> {
                    localStorage.removeItem(window.LSUser);
                    window.BodyMessage.AutoPlay( "サインアウトしました。" );
                    this.$router.replace("/");
                })

                if(this.$store.state.common.menu) this.$store.dispatch('common/ToggleMenu')

            }
        }
    },
    mounted: function() {
    },
    destroyed: function() {
        if(this.$store.state.common.menu) this.$store.dispatch('common/ToggleMenu')
    }
}
</script>
