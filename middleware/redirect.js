// const OnetimePassword = (route, redirect, store) => {
//
//     if( window.prev !== "signup" || !store.state.user.signupData ) redirect("/sign/signup");
//
// }

const Edit = (route, redirect, store) => {

    // 編集画面への直接リンクは禁止する
    if(!store.state.detail.detailResult) redirect( location.pathname.split("/edit")[0] )

}
const Home = (route, redirect, store) => {

    // 検索条件が未設定の場合は検索ページへリダイレクト
    if( !localStorage.getItem(window.LSPost) ) redirect("/search");

}

export default ({ route, redirect, store }) => {

    // 現在のパスを取得
    const currentName = route.name

    console.log(currentName);

    switch (currentName) {

        case "index":
        return Home(route, redirect, store)

        case "user-userid-edit":
        return Edit(route, redirect, store)

        // case "sign-one-time-password":
        // return OnetimePassword(route, redirect, store)

    }

}
