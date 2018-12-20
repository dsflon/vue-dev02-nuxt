<template>
    <div id="app" ref="app" data-message>
        <nuxt/>
    </div>
</template>

<script>
import BodyMessage from '~/middleware/_bodyMessage';

export default {
    components: {},
    mounted: function() {
        window.BodyMessage = new BodyMessage(this.$refs.app);
    }
}
</script>
