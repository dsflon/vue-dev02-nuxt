<template>
    <div>

        <app-header icon="user" />

        <main id="home">
            <div class="lists contents">

                <div class="lists_ttl">
                    <p class="lists_ttl_txt">{{SearchKey}}</p>
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
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "index" && from == "user-userid" ) {
            // user detailから来たとき
            return "home-user"
        }

    },
    head () {
        return {
            title: this.SearchKey + "の検索結果 | Home | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: this.SearchKey + "の検索結果です。 | Step Lack" }
            ]
        }
    },
    data () {
        return {
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

            let postData = this.$store.state.search.postData

            this.$store.dispatch('home/GetSearchResult',postData)
            .then((data) => {
                // console.log("complete", data)
            }).catch((error,txt)=>{
                console.error(error);
                this.error = txt;
            })
        }
    },
    computed: {
        SearchKey() {

            let statePt = this.$store.state.search.postData,
                localPt = localStorage.getItem(window.LSPost);

            if(statePt) { // searchから来た場合はstateから
                return statePt.search_job_name  + " / " + statePt.search_station_name;
            } else if ( !statePt && localPt ) { // localStorageから
                localPt = JSON.parse(localPt);
                return localPt.search_job_name  + " / " + localPt.search_station_name;
            } else {
                return "検索項目がありません";
            }

        }
    },
    created: function() {
        if( window.prev !== "user" ) {
            this.SearchStart();
        } else if( window.prev === "user" && !this.$store.state.home.searchResult ) {
            this.SearchStart();
        }

        if( !localStorage.getItem(window.LSPost) ) {
            this.$router.replace("/search");    
        }
    },
    destroyed: function() {
        window.prev = "home";
    }
    // beforeMount: function() {
    //     // console.log("beforeMount");
    // },
    // mounted: function() {
    //     // console.log("mounted");
    // },
    // beforeUpdate: function() {
    //     // console.log("beforeUpdate");
    // },
    // updated: function() {
    //     // console.log("updated");
    //     // console.log(this.$store.state.home.searchResult);
    //     // console.log(this.$store.state.home.filterData);
    // }
}
</script>
