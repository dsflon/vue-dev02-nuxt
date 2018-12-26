<template>

    <div class="user_tab_inner user_tab_photos">
        <ul>
            <li
                v-for="data in photosData"
                :key="data.post_id">
                <router-link
                    class="photos_btn"
                    ref="photos_btn"
                    :data-src="data.post_image"
                    :to="'./post/'+data.post_id">
                </router-link>
            </li>
        </ul>
    </div>

</template>

<script>
import DelayLoader from '~/middleware/_delayLoader';

export default {
    props: [
        "photosData"
    ],
    components: {
    },
    methods: {

    },
    mounted: function() {
        setTimeout( () => {
            DelayLoader( this.$refs.photos_btn );
        },1 )
    }

}
</script>
