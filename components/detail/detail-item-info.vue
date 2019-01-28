<template>

    <div v-if="infoData && infoData.length !== 0" class="user_tab_inner user_tab_info">
        <section
            v-for="(item,i) in infoData"
            :key="i" class="info_box">

            <h2 class="info_box_ttl">{{item.title}}</h2>

            <div v-if="item.contents && item.contents.length !== 0" class="info_box_wrap">
                <section
                    v-for="(child,j) in item.contents"
                    :key="j"
                    class="info_box_inner">
                    <h3 class="info_box_inner_ttl">{{child.title}}</h3>

                    <!-- <p v-if="checkLink(child.text)" class="info_box_inner_txt">
                        <a :href="child.text" class="a-link" target="_blank">{{child.text}}</a>
                    </p>
                    <p v-else class="info_box_inner_txt">{{child.text}}</p> -->
                    <div class="info_box_inner_txt" v-html="AutoLink(child.text)"></div>

                </section>
            </div>

        </section>
    </div>

    <p v-else class="no_result">基本情報がありません</p>

</template>

<script>

export default {
    props: [
        "infoData"
    ],
    components: {
    },
    computed : {
        checkLink: function () { // ここでやらないとエラー出る
            return function (value) {
                if(!value) return null;
                return value.indexOf("http") !== -1;
            };
        },
        AutoLink: function () {
            return function (str) {
                let regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
                let regexp_makeLink = function(all, url, h, href) {
                    return `<a href="h${href}" target="_blank">${url}</a>`;
                }
                return str.replace(regexp_url, regexp_makeLink);
            }
        }
    },
    mounted: function() {
    }

}
</script>
