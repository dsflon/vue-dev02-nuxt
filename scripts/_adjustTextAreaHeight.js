const AdjustTextAreaHeight = (target) => {

	let maxHeight = parseFloat(getComputedStyle(target)["max-height"]),
		minHeight = parseFloat(getComputedStyle(target)["min-height"]),
		pt = parseFloat(getComputedStyle(target)["padding-top"]),
		pb = parseFloat(getComputedStyle(target)["padding-bottom"]);

	target.style.minHeight = "inherit";


	SetHeight(target)
	target.addEventListener('input', SetHeight);

	function SetHeight(e) {
		e = e.currentTarget ? e.currentTarget : e;

		// if( minHeight <= e.scrollHeight && e.scrollHeight < maxHeight ) { // AdjustTextAreaHeightの可動域
		if( minHeight <= e.scrollHeight ) { // AdjustTextAreaHeightの可動域

			if( e.scrollHeight > e.offsetHeight ){
				e.style.height = e.scrollHeight + "px";
			} else {
				while (true){
					let height = parseFloat(getComputedStyle(e)["height"]),
						lineHeight = parseFloat(getComputedStyle(e)["line-height"]);
						e.style.height = height - lineHeight + "px";
					if(e.scrollHeight > e.offsetHeight){
						e.style.height = e.scrollHeight + "px";
						break;
					}
				}
			}

		}
		// else if( maxHeight <= e.scrollHeight ) {
		// 	console.log(e.scrollHeight);
		// 	// e.style.height = maxHeight + "px";
		// }

		if(!e.value) {
			e.style.height = minHeight - pt - pb + "px";
		}

	}

}

export default AdjustTextAreaHeight;
