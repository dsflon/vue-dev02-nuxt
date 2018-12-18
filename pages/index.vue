<template>
    <div>

        <Header
            title=""
            userId="1"
            icon=""/>

        <main id="home">
            <div class="lists contents">

                <div class="lists_ttl">
                    <p class="lists_ttl_txt" ref="lists_ttl_txt"></p>
                    <div class="lists_ttl_btns">
                        <button onClick={this.Reload.bind(this)}>
                            <i class="a-icon a-icon-rotate_right a-icon-lg is_gray"></i>
                        </button>
                        <button onClick={this.ToggleFilter.bind(this)}>
                            <i class="a-icon a-icon-plus a-icon-lg is_blue"></i>
                        </button>
                    </div>
                </div>

                <!-- {filteredData} -->

                <!-- {lists} -->

            </div>
        </main>

        <Footer />

    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'

export default {
    components: {
        Header,
        Footer
    },
    mounted: function() {
    }
}
</script>
