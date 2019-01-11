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

/*
** Redirect
*/
// if ( navigator.standalone || (screen.height - window.innerHeight < 120) ) {
if ( navigator.standalone ) { // ios only
    console.log("standalone");
    let lastPage = localStorage.getItem('steplack_lastpage');
        lastPage = lastPage ? JSON.parse(lastPage) : null;

    if(lastPage) {
        let limit = new Date().getTime() - lastPage.time;
            limit = limit / (1000 * 60 * 60); // hour

        // 離脱して24時間以内はリダイレクト
        if(
            location.pathname !== lastPage.page
            && Math.floor(limit) <= 24
        ) {
            location.replace(lastPage.page);
        }
    }
}
