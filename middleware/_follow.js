const Follow = (_this) => {

    let userId = _this.$store.state.user.myData ? _this.$store.state.user.myData.user_id : null;

    if( userId ) {

        _this.$store.dispatch('detail/SetFollowed',{
            "search_user_id": !_this.$route.params.userid ? _this.$route.params.userid :  null,
            "user_id": !_this.$store.state.detail.followed ? userId :  null,
            "language_flg": "ja"
        })
        .then((data) => {
            // console.log("complete", data)
        }).catch((error,txt)=>{
            console.error(error);
            alert(txt)
        })

    } else {

        alert(`ユーザー登録が必要です。`)

    }

}

export default Follow;
