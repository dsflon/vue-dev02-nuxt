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

                <list-filtered-text v-if="$store.state.home.filterData" />

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
import AppHeader from '~/components/common/header.vue'
import AppFooter from '~/components/common/footer.vue'
import ListItems from '~/components/home/list-items.vue'
import ListFilter from '~/components/home/list-filter.vue'
import ListFilteredText from '~/components/home/list-filtered-text.vue'

export default {
    transition (to, from) {

        to = to ? to.name : null
        from = from ? from.name : null

        if( to == "index" && from == "user-userid" ) {
            // user detailから来たとき
            // return "home-user"
                return "slide-right"
        }
        else if( to == "index" && from == "search" ) {
            return "slide-left"
        }
        else {
            // 通常遷移
            return "slide-down"
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
        ListFilteredText
    },
    methods: {
        ToggleFilter: function() {
            this.showFilter = !this.showFilter
        },
        SearchStart: function() {

            let postData = this.$store.state.search.postData,
                localPt = localStorage.getItem(window.LSPost);

                // storeに入ってなかったらlocalStorageから取得
                postData = !postData && localPt ? JSON.parse(localPt) : postData;

            this.$store.dispatch('home/GetSearchResult',postData)
            .then((data) => {
                // console.log("complete", data)
                localStorage.setItem(window.LSResult, JSON.stringify(data));
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

        let lsResult = localStorage.getItem(window.LSResult)
        if( lsResult ) this.$store.dispatch('home/SetSearchResult',JSON.parse(lsResult))

        if( window.prev !== "user" ) {
            this.SearchStart();
        } else if( window.prev === "user" && !this.$store.state.home.searchResult ) {
            this.SearchStart();
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
