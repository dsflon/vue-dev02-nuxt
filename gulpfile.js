'use strict';

/**
**
** Setting
**
**/

const ROOT_PATH = './static/';

const SETTING = {

    'rootPath': ROOT_PATH,

    'sass': [
        {
            'browser': ['last 2 versions'], // autoprefix version
            'outputStyle': 'compressed',// compile style
            'path': [
                {
                    'src': './assets/scss/fonts_guideline.scss', // sass path
                    'dist': ROOT_PATH + 'fonts_guideline/' // css path
                }
                // 対象ディレクトリを増やす場合は、オブジェクトを追加する
            ]
        }
    ],

    'iconFont': [
        {
            'font': [
                {
                    'name': 'iconfont', // フォント名
                    'class': 'a-icon', // class名
                    'format': ['ttf', 'eot', 'woff', 'svg'], // フォーマット
                    'svg': './assets/images/icons/*.svg', // 元素材
                    'dist': ROOT_PATH + 'assets/fonts/', // フォント出力先
                }
            ],
            'sass': [
                {
                    'template': './assets/fonts/tmp/fontawesome-style.scss', // scssテンプレート
                    'dist': './assets/scss/0_atoms/', // scss出力先
                }
            ],
            'guideline': [
                {
                    'template': './assets/fonts/tmp/fontawesome-style.html', // guidelineテンプレート
                    'dist': ROOT_PATH + 'fonts_guideline/', // guidelineテンプレート出力先
                    'path': '/fonts_guideline/fonts_guideline.css', // guidelineテンプレート内で読み込むCSSファイル
                }
            ]
        }
        // 対象ディレクトリを増やす場合は、配列を追加する
    ]

}


/**
**
** Module Import
**
**/

const gulp = require("gulp");
const Iconfont = require("./gulp/iconfont");
const Sass = require("./gulp/sass");

/**
**
** Task
**
**/
gulp.task('sass', () => {
    Sass(SETTING);
});
gulp.task('iconfont', () => {
    Iconfont(SETTING);
});

/**
**
** Default Task
**
** コマンド'gulp'で実行される
**
**/

const taskList = [

    // 'sass',
    // 'iconfont',
    // 'sass', // gulp-sass
    // 'serve' // browser-sync

]
gulp.task('default', taskList);
