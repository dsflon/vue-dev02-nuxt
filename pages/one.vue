<template>
    <div>

        <p
        class="subtitle"
        v-if="this.$store.state.__index.user">userName : {{ this.$store.state.__index.user }}</p>
        <!-- <p>computed : {{ getSplitUser }}</p> -->

        <!-- <button class="button--green" @click="$store.commit('login', 'test_user')">Test ログイン</button> -->
        <button class="button--green" @click="login()">ログイン</button>
        <button class="button--green" @click="writeUser()">Actions WriteUsere</button>

        <br>

        <p><a class="button--green" to="/">Back</a></p>
    </div>
</template>

<script>
export default {
    // data () {
    //     return {
    //         userName: null,
    //     }
    // },
    computed: {
        getSplitUser () {
            return this.$store.getters.__index.getSplitUser
        }
    },
    methods: {

        login: function() {
            // this.$store.commit('login', "test_user")
            this.$store.dispatch('__index/login',"test_user")
        },
        writeUser: function() {

            // 独自にcallbackを用いることも出来なくはないけど
            // this.$store.dispatch('writeUser', {
            //     name: "test_user",
            //     complete: (data) => console.log("complete", data)
            // })

            // Promise を使うのが良い
            // this.$store.dispatch('__index/writeUser', {
            //     name: "test_user"
            // }).then((data) => {
            //     console.log("complete", data)
            //     // this.userName = data;
            // })

        }
    },

    mounted: function() {
        this.$store.dispatch('__index/writeUser', {
            name: "test_user"
        }).then((data) => {
            console.log("complete", data)
            // this.userName = data;
        })
    },
    beforeUpdate: function() {
        console.log("beforeUpdate");
    },
    updated: function() {
        console.log("updated");
        // console.log(this.$store.state.home.searchResult);
    }
}
</script>

<!-- <template>
  <section class="container">
    <div>
        <h1 class="title">page one</h1>
        <p><router-link class="button--green" to="/">Back</router-link></p>
    </div>
  </section>
</template>

<script>
import AppLogo from '~/components/AppLogo.vue'

export default {
  components: {
    AppLogo
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style> -->
