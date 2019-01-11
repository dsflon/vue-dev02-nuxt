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

        // if ( navigator.standalone || (screen.height-window.innerHeight<120) ) {
        //     console.log("standalone");
        //     let lastPage = localStorage.getItem('steplack_lastpage');
        //         lastPage = lastPage ? JSON.parse(lastPage) : null;
        //
        //     if(lastPage) {
        //         let limit = new Date().getTime() - lastPage.time;
        //             limit = limit / (1000 * 60 * 60); // hour
        //
        //         // 離脱して24時間以内はリダイレクト
        //         if(
        //             location.pathname !== lastPage.page && Math.floor(limit) <= 24
        //         ) {
        //             this.$router.replace(lastPage.page);
        //         }
        //     }
        // }

    }
}
</script>
