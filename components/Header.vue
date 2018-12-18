<template>
    <header id="header">
        <div id="header_inner">


            <h1 v-if="title" class="header_ttl">
                {{title}}
            </h1>
            <h1 v-else class="header_logo">
                <img src="~/assets/images/common/logo.svg" alt="Step Lack">
            </h1>


            <div v-if="icon == 'user'" class="header_user">
                <router-Link class="a-btn_user" to="/signin"></router-Link>
            </div>
            <div v-else-if="icon == 'followed'" class="header_user">
                <button
                    id={userId}
                    class="a-btn_header"
                    onClick={Follow.bind(this,this.props.actions,false)}>
                    <i class="a-icon a-icon-friends_check a-icon-1_75x f-txt_pink"></i>
                </button>
            </div>


        </div>
    </header>
</template>


<script>
// import TtlLogo from '~/components/TtlLogo.vue';

export default {
    components: {
        // TtlLogo
    },

    props: [
        "title",
        "userId",
        "icon"
    ],

    mounted: function() {
    }
}
</script>
