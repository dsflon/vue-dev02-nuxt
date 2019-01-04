<template>
    <div id="search">

        <div class="search_inner">

            <div class="search_user"><icon-user /></div>

            <div class="contents">
                <div class="searchbox">
                    <h1><img src="~/assets/images/common/logo.svg" alt="Step Lack"></h1>
                    <search-form
                        v-if="this.$store.state.search.jobList"
                        ref="search_form"
                        :ToggleInputBox="ToggleInputBox" />
                </div>
            </div>

        </div>

        <input-box
            ref="inputbox"
            :class="{is_show: showInputBox}"
            :ToggleInputBox="ToggleInputBox"
            :SearchStart="SearchStart" />

    </div>
</template>

<script>
import IconUser from '~/components/common/IconUser.vue'
import SearchForm from '~/components/search/SearchForm.vue'
import InputBox from '~/components/search/InputBox.vue'

export default {
    components: {
        IconUser,
        SearchForm,
        InputBox
    },
    head () {
        return {
            title: "Search | Step Lack",
            meta: [
                { hid: 'description', name: 'description', content: "駅名と職業で検索します。" }
            ]
        }
    },
    data () {
        return {
            showInputBox: false,
            postData: null,
            jobList: null
        }
    },
    methods: {
        ToggleInputBox: function() {
            this.showInputBox = !this.showInputBox;
            this.$store.dispatch('search/SetStationList',null)

            // inputのfocusをここで当てないとiosで効かない
            if(this.showInputBox) {
                this.$refs.inputbox.$refs.input.focus()
                this.$refs.inputbox.$refs.input.value = "";
            } else {
                this.$refs.inputbox.$refs.input.blur()
                window.onscroll = null;
            }
        },
        CheckLocalStrage: function() {
            // localStorageを参照
            let postData = localStorage.getItem(window.LSPost);
            this.postData = postData ? JSON.parse(postData) : null;

            let jobList = localStorage.getItem(window.LSJob);
            this.jobList = jobList ? JSON.parse(jobList) : null;

            if(this.jobList) this.$store.dispatch('search/SetJobList',this.jobList)
            if(this.postData) this.$store.dispatch('search/SetPostData',this.postData)
        },
        SearchStart(e) {

            let target = e.currentTarget,
                stationName = target.innerText,
                stationId = target.id;

            let selectedJob = this.$refs.search_form._data.selectedVal.split(","),
                selectedJobName = selectedJob[1],
                selectedJobVal = selectedJob[0];

            let postData = {
                search_job: Number(selectedJobVal),
                search_job_name: selectedJobName,
                search_station_id: Number(stationId),
                search_station_name: stationName,

                // ここ考える余地あり
                user_id: window.userData ? window.userData["user_id"] : null,
                // ここ考える余地あり

                start_price: null,
                end_price: null,
                start_price: null,
                end_price: null,
                language_flg: "ja"
            }


            window.Loading.Show();
            localStorage.setItem(window.LSPost, JSON.stringify(postData));
            this.$store.dispatch('search/SetPostData',postData)
            //
            setTimeout( () => {
                this.$router.push('/')
            }, 100)

        }
    },
    created: function() {

        this.CheckLocalStrage();

        // サーバから取得
        this.$store.dispatch('search/GetJobList')
        .then((data) => {
            // console.log("complete", data)
        }).catch((error,txt)=>{
            console.error(error);
        })

    },
    mounted: function() {

        window.scrollTop = 0;
        // this.actions.InputBox(false);
        this.$store.dispatch('search/SetStationList',null)
    },
    destroyed: function() {
        window.prev = "search";
    }

}
</script>
