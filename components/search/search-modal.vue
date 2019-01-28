<template>

    <div class="inputbox">

        <div class="inputbox_input">
            <div :class="'m-form_label m-form_line' + inputLabelClass" ref="input_label">
                <button
                    v-if="os === 'ios'"
                    class="inputbox_back"
                    @click="ToggleInputBox">
                    <i class="a-icon a-icon-arrow_left f-font_m"></i>
                </button>
                <input
                    tabIndex="-1"
                    class="a-form_input"
                    type="text"
                    ref="input"
                    @input="Input"
                    @focus="Focus"
                    @blur="Blur"
                    placeholder="駅名を入力してください" />
            </div>
        </div>

        <div class="inputbox_list">
            <div class="inputbox_list_inner">
                <ul v-if="!error">
                    <li v-for="item in $store.state.search.stationList" :key="item.station_id">
                        <button :id="item.station_id" type="button" @click="SearchStart">
                            {{item.station_name}}
                        </button>
                    </li>
                </ul>
                <p v-else class="no_result">{{ error }}</p>
            </div>
        </div>

        <div v-if="os === 'android'" class="m-btns is_nobg">
            <button
                type="button"
                class="inputbox_hide a-btn"
                @click="ToggleInputBox">
                <i class="a-icon a-icon-cross"></i>
            </button>
        </div>

    </div>

</template>

<script>
export default {
    props: [
        "ToggleInputBox",
        "SearchStart"
    ],
    data () {
        return {
            os: window.os,
            inputTimer: null,
            inputLabelClass: "",
            error: null
        }
    },
    directives: {
        focus: {
            // ディレクティブ定義
            inserted: function (el) {
                // this.$nextTick( () => el.focus() )
            }
        }
    },
    methods: {
        Input(e) {

            e.preventDefault();
            let target = e.currentTarget,
                value = target.value;

            clearTimeout(this.inputTimer)

            if( value === "" || !value ) {
                this.$store.dispatch('search/SetStationList',null)
            } else {
                this.inputTimer = setTimeout( () => {
                    this.$store.dispatch('search/GetStationList',value)
                    .then(()=>{
                        this.error = null;
                    })
                    .catch((error,txt)=>{
                        console.error(error);
                        this.error = txt;
                        aletr(txt)
                    })
                }, 200);
            }

        },
        Focus() {
            this.inputLabelClass = " is_focus"
        },
        Blur() {
            setTimeout( () => {
                this.inputLabelClass = " is_blur"
            },1)
        },
        Ios() {
            let timer;

            const ShowInput = (scrollVal) => {
                this.$refs.input_label.classList.remove("is_hide");
                this.$refs.input_label.style.transform = "translate(0,"+scrollVal+"px)"
            }

            window.onscroll = () => {

                let scrollVal = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

                this.$refs.input_label.classList.add("is_hide");

                clearTimeout(timer);

                if( scrollVal <= 50 ) {
                    scrollVal = 0;
                    ShowInput(scrollVal);
                } else {
                    timer = setTimeout( ()=> {
                        ShowInput(scrollVal);
                    }, 200);
                }

            }
        },
        SetFocus: function() {
            this.$refs.input.focus()
            console.log(1);
        }
    },
    mounted: function() {
        // this.$nextTick( () => this.$refs.input.focus() )
        // if( this.os === "ios" ) this.Ios();
    },
    updated: function() {
        if( this.os === "ios" ) this.Ios();
        this.error = !this.$store.state.search.stationList || this.$store.state.search.stationList.length === 0
            ? "検索候補がありません" : null;
    },
    destroyed: function() {
        window.onscroll = null;
    }
}
</script>
