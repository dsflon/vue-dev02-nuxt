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
