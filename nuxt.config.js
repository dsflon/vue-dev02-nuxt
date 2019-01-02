module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'Step Lack',
        meta: [
            { charset: 'utf-8' },
            // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover' },
            { hid: 'description', name: 'description', content: 'Step Lack' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#4C85B7' },
            { name: 'apple-mobile-web-app-title', content: 'Step Lack' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'apple-touch-icon-precomposed', href: '/assets/images/icons/icon-256x256_ios.png' }
        ]
    },
    router: {
        // base: '~/public/'
    },
    css: [
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
