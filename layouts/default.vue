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
        // let standalone = navigator.standalone || (screen.height-window.innerHeight<120)
        // if (standalone) {
        //     console.log("standalone");
        //     let lastPage = localStorage.getItem('steplack_lastpage');
        //     if(lastPage && location.pathname !== lastPage) this.$router.replace(lastPage);
        // }
    },
    created: function() {
        Sign.Check( (data) => {
            if(data) this.$store.dispatch('user/SetMyData',data)
        });
    },
    mounted: function() {
        window.BodyMessage = new BodyMessage(this.$refs.app);
    }
}
</script>
