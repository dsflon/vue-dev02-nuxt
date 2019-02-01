<template>

    <div v-if="menuData && menuData.length !== 0" class="user_tab_inner user_tab_menu">

        <router-link
            v-for="(item,i) in menuData"
            :to="'/message/'+ $route.params.userid +'?reservation='+item.id"
            :key="i" class="menu_box">

            <h2 class="menu_box_ttl">{{item.name}}</h2>
            <p class="menu_box_price">¥ {{Number(item.price).toLocaleString()}}</p>
            <p v-if="item.description" class="menu_box_txt">{{item.description}}</p>

        </router-link>

    </div>

    <p v-else class="no_result">メニューがありません</p>

</template>

<script>


export default {
    props: [
        "menuData"
    ],
    components: {
    },
    methods: {

    },
    mounted: function() {
    }

}
</script>
