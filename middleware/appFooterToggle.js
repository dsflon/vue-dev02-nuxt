
export default ({ route, redirect, store }) => {

    // 現在のパスを取得
    const currentName = route.name;
    const footer = document.getElementById('footer');

    if(!footer) return false;

    switch (currentName) {

        case "index":
        case "message":
        case "timeline":
        case "notification":
        footer.classList.remove("is_hide")
        break;

        default:
        footer.classList.add("is_hide")

    }

}
