const GetOffset = (el) => {

   const BOX = el.getBoundingClientRect();

   return {
       top: BOX.top + window.pageYOffset - document.documentElement.clientTop,
       left: BOX.left + window.pageXOffset - document.documentElement.clientLeft
   }

}

const DelayLoader = (target) => {

    if( !target || target.length < 0 ) return false;

    loadingImage();
    window.removeEventListener("scroll", loadingImage);
    window.addEventListener("scroll", loadingImage);

    function loadingImage() {

        let scrollVal = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
            scrollVal = scrollVal + window.innerHeight;

        for (var i = 0; i < target.length; i++) {

            let item = target[i],
                position = GetOffset( item ).top;

            if( scrollVal > position - 100 && item.dataset.src ) {
                let src = item.dataset.src;
                item.style.backgroundImage = "url("+src+")";
                item.removeAttribute("data-src")
            }

        }
    }

}

export default DelayLoader;
