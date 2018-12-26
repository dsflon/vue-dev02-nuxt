<template>

    <div class="user_tab">
        <!-- <Slick {...this.settings}>
            <Photos
                history={this.props.history}
                photos={this.props.photos} />
            <Info info={this.props.info} />
            <Menu menu={this.props.menu} />
        </Slick> -->
    </div>

</template>

<script>

import DetailItemSliderPhotos from '~/components/detail/DetailItemSliderPhotos.vue'
import DetailItemSliderInfo from '~/components/detail/DetailItemSliderInfo.vue'
import DetailItemSliderMenu from '~/components/detail/DetailItemSliderMenu.vue'

export default {
    props: [
        "userData"
    ],
    components: {
        DetailItemSliderPhotos,
        DetailItemSliderInfo,
        DetailItemSliderMenu
    },
    methods: {

    },
    mounted: function() {
    }

}
</script>
