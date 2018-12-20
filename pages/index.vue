<template>
    <div>

        <app-header icon="user" />

        <main id="home">
            <div class="lists contents">

                <div class="lists_ttl">
                    <p class="lists_ttl_txt" ref="lists_ttl_txt">{{searchTitle}}</p>
                    <div class="lists_ttl_btns">
                        <button @click="SearchStart">
                            <i class="a-icon a-icon-rotate_right a-icon-lg is_gray"></i>
                        </button>
                        <button @click="ToggleFilter">
                            <i class="a-icon a-icon-plus a-icon-lg is_blue"></i>
                        </button>
                    </div>
                </div>

                <filtered-text v-if="$store.state.home.filterData" />

                <list-items v-if="!error" />

                <div v-else class="no_result">
                    <p>{{error}}</p>
                    <p>もう一度検索を行ってください。</p>
                    <router-link to="/search">
                        <i class="a-icon a-icon-search f-font_l"></i>
                        <span class="a-icon_txt">検索する</span>
                    </router-link>
                </div>

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
import FilteredText from '~/components/home/FilteredText.vue'

export default {
    data () {
        return {
            // searchTitle: this.postData.search_job_name  + " / " + this.postData.search_station_name
            searchTitle: "titleが入ります",
            showFilter: false,
            error: null
        }
    },
    components: {
        AppHeader,
        AppFooter,
        ListItems,
        ListFilter,
        FilteredText
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
            }).catch((error,txt)=>{
                console.error(error);
                this.error = txt;
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
