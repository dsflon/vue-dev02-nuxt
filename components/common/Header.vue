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
    ]
}
</script>
