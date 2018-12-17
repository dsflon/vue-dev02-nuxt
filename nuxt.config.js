module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-dev02-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  router: {
      // base: '/app/'
  },
  css: [
    // node モジュールを直接ロードする (ここでは SASS ファイル)
    // 'bulma',
    // プロジェクト内の CSS ファイル
    // '@/assets/css/main.css',
    // プロジェクト内の SCSS ファイル
    '@/assets/css/main.scss'
],
  // srcDir: 'public/',
  mode:'spa',
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
