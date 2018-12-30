import mgnUa from 'mgn-ua';

const HTML = document.getElementsByTagName('html')[0];

/*
** Window Object
*/
window.LSPost = "steplack_postData";
window.LSJob = "steplack_selectJob";
window.LSResult = "steplack_result";
window.LSUser = "steplack_user";
window.Loading = {
    Show: (delay = 0) => { setTimeout( () => { document.body.classList.add("loading") }, delay) },
    Hide: (delay = 0) => { setTimeout( () => { document.body.classList.remove("loading") }, delay) }
};

/*
** UA
*/
const UA = new mgnUa();
if( UA.isIphone || UA.isIpod || UA.isIpad ) {
    HTML.classList.add("is_ios");
    window.os = "ios";
} else if( UA.isAndroid || UA.isAndroidTab ) {
    HTML.classList.add("is_android");
    window.os = "android";
}



let lastPage = localStorage.getItem('steplack_lastpage');
if(lastPage && location.pathname !== lastPage) location.replace(lastPage);
