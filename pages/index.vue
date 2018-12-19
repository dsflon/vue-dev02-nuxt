<template>
    <div>

        <app-header icon="user" />

        <main id="home">
            <div class="lists contents">

                <div class="lists_ttl">
                    <p class="lists_ttl_txt" ref="lists_ttl_txt"></p>
                    <div class="lists_ttl_btns">
                        <button @click="SearchStart">
                            <i class="a-icon a-icon-rotate_right a-icon-lg is_gray"></i>
                        </button>
                        <button @click="ToggleFilter">
                            <i class="a-icon a-icon-plus a-icon-lg is_blue"></i>
                        </button>
                    </div>
                </div>

                <!-- {filteredData} -->

                <list-items />

            </div>

            <transition name="filter">
                <list-filter v-if="showFilter" id="filter" :ToggleFilter="ToggleFilter" />
            </transition>

        </main>

        <app-footer />

    </div>
</template>

<script>
import AppHeader from '~/components/common/Header.vue'
import AppFooter from '~/components/common/Footer.vue'
import ListItems from '~/components/home/ListItems.vue'
import ListFilter from '~/components/home/ListFilter.vue'

export default {
    data () {
        return {
            showFilter: false
        }
    },
    components: {
        AppHeader,
        AppFooter,
        ListItems,
        ListFilter
    },
    methods: {
        ToggleFilter: function() {
            this.showFilter = !this.showFilter
        },
        SearchStart: function() {
            let postData = "test"

            this.$store.dispatch('home/GetSearchResult',postData)
            .then((data) => {
                // console.log("complete", data)
                // window.Loading.Hide();
            }).catch((error)=>{
                console.error(error);
                // this.refs.no_r.style.display = "block";
                // this.refs.no_r_m.innerHTML = "サーバーに接続できませんでした。";
                // window.Loading.Hide();
            })
        }
    },
    // created: function() {
    //     // console.log("created");
    // },
    // beforeMount: function() {
    //     // console.log("beforeMount");
    // },
    mounted: function() {
        // console.log("mounted");
        this.SearchStart();
    },
    // beforeUpdate: function() {
    //     // console.log("beforeUpdate");
    // },
    updated: function() {
        // console.log("updated");
        // console.log(this.$store.state.home.searchResult);
        // console.log(this.$store.state.home.filterData);
    }
}
</script>
