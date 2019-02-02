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

                    <div class="info_box_inner_txt" v-html="autoLink(child.text)"></div>

                </section>
            </div>

        </section>
    </div>

    <p v-else class="no_result">基本情報がありません</p>

</template>

<script>
import AutoLink from '~/scripts/_autoLink'
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
        autoLink: function () {
            return str => AutoLink(str)
        }
    },
    mounted: function() {
    }

}
</script>
