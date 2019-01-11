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

            <div v-else-if="icon == 'edit'" class="header_btns">
                <router-link class="a-btn_header is_black" :to="$route.path+'/edit'">
                    <i class="a-icon a-icon-edit a-icon-1_75x"></i>
                </router-link>
            </div>

        </div>

        <transition name="slide-down">
            <div v-if="$store.state.common.menu && $store.state.user.myData" id="header_menu">
                <div class="header_menu_inner">
                    <ul>
                        <li>
                            <router-link
                                class="header_menu_btn is_arw"
                                :to="'/user/'+$store.state.user.myData.user_id">プロフィール</router-link>
                        </li>
                        <li>
                            <button class="header_menu_btn" @click="SignOut()">サインアウト</button>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>

    </header>
</template>


<script>
import IconUser from '~/components/common/IconUser.vue'
import IconFollowed from '~/components/common/IconFollowed.vue'

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
        SignOut: function() {
            let res = confirm("サインアウトしますか？");
            if( res == true ) {

                this.$store.dispatch('user/SetMyData',null).then( (data)=> {
                    localStorage.removeItem(window.LSUser);
                })
                if(this.$store.state.common.menu) this.$store.dispatch('common/ToggleMenu')

            } else {
                // window.Loading.Hide();
            }
        }
    },
    destroyed: function() {
        if(this.$store.state.common.menu) this.$store.dispatch('common/ToggleMenu')
    }
}
</script>
