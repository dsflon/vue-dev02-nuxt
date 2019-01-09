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
    beforeCreate: function() {
    },
    created: function() {
        Sign.Check( (data) => {
            if(data) this.$store.dispatch('user/SetMyData',data)
        });
    },
    mounted: function() {
        window.BodyMessage = new BodyMessage(this.$refs.app);
        
        let lastPage = localStorage.getItem('steplack_lastpage');
        if(lastPage && location.pathname !== lastPage) this.$router.replace(lastPage);
    }
}
</script>
