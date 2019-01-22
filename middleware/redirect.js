const Sign = (route, redirect, stuser) => {

    if( stuser && Object.values(stuser)[0] ) {
        redirect('/');
    }

}
const Home = (route, redirect, stuser) => {

    let query = route.query.rental;

    if( !stuser ) {
        // アカウント無し時
        // 貸し借り画面を直接開こうとした場合はパラメータにデバイスIDを付与して
        // リダイレクトする
        redirect( '/signup' + (query ? '?rental=' + query : "") );
    } else if( stuser && !Object.values(stuser)[0] ) {
        // サインアウト時
        redirect( '/signin' + (query ? '?rental=' + query : "") );
    }

}

export default ({ route, redirect, store }) => {

    // ログイン情報を取得
    let stuser = localStorage.getItem(window.LSUser);
        stuser = stuser ? JSON.parse(stuser) : null;

    // 現在のパスを取得
    const currentPath = route.path

    switch (currentPath) {

        case "/":
        return Home(route, redirect, stuser)

        case "/signin":
        case "/signup":
        return Sign(route, redirect, stuser)

    }

}
