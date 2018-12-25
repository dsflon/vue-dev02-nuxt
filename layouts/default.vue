<template>
    <div id="app" ref="app" data-message>
        <nuxt/>
    </div>
</template>

<script>
import BodyMessage from '~/middleware/_bodyMessage';
import Sign from '~/middleware/_sign';

export default {
    components: {},
    created: function() {
        Sign.Check( (data) => {
            this.$store.dispatch('mydata/SetMyData',data)
        });
    },
    mounted: function() {
        window.BodyMessage = new BodyMessage(this.$refs.app);
    }
}
</script>
