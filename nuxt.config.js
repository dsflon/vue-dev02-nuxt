module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'Step Lack',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Step Lack' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    router: {
        // base: '~/public/'
    },
    css: [
        // node モジュールを直接ロードする (ここでは SASS ファイル)
        // 'bulma',
        // プロジェクト内の CSS ファイル
        // '@/assets/css/main.css',
        // プロジェクト内の SCSS ファイル
        '@/assets/scss/style.scss'
    ],
    plugins: ['~/plugins/','~/plugins/vue-components.js'],
    // srcDir: 'public/',
    mode:'spa',
    server: {
        port: 5003, // デフォルト: 3000
        host: '0.0.0.0', // デフォルト: localhost
      },
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
