<template>
    <form class="m-form f-flex">

        <div class="f-flex4">
            <div class="m-form_line">
                <select
                    v-if="$store.state.search.jobList"
                    v-model="selectedVal"
                    class="a-form_select"
                    tabIndex="-1"
                    ref="select">
                    <option
                        v-for="item in $store.state.search.jobList"
                        :key="item.job_id"
                        :value="item.job_id+','+item.job_name">
                        {{ item.job_name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="f-flex8">
            <div class="m-form_line">
                <div class="searchbox_wrap">
                    <button type="button" class="searchbox_txt f-font_s" @click="ToggleInputBox">
                        <span ref="search_txt">駅名を入力してください</span>
                        <i class="a-icon a-icon-search a-icon-2x f-txt_blue"></i>
                    </button>
                </div>
            </div>
        </div>

    </form>
</template>

<script>
export default {
    props: [
        "ToggleInputBox"
    ],
    data () {
        return {
            selectedVal: this.$store.state.search.jobList[0].job_id+","+this.$store.state.search.jobList[0].job_name,
        }
    },
    created: function() {

    },
    mounted: function() {

        if(this.$store.state.search.postData) {
            // this.selectedVal = this.$store.state.search.postData.search_job+","+this.$store.state.search.postData.search_job_name
        }

    }

}
</script>
