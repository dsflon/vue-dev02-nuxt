import mgnUa from 'mgn-ua';

const HTML = document.getElementsByTagName('html')[0];

/*
** UA
*/
const UA = new mgnUa();
if( UA.isIphone || UA.isIpod || UA.isIpad ) {
    HTML.classList.add("is_ios");
    window.ios = true;
} else if( UA.isAndroid || UA.isAndroidTab ) {
    HTML.classList.add("is_android");
    window.android = true;
}
