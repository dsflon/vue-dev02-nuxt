const AdjustTextAreaHeight = (target) => {

	SetHeight(target)
	target.addEventListener('input', SetHeight);

	function SetHeight(e) {
		e = e.currentTarget ? e.currentTarget : e;

		let maxHeight = parseFloat(getComputedStyle(e)["max-height"]);
			// minHeight = parseFloat(getComputedStyle(e)["min-height"]);

		if( e.scrollHeight < maxHeight ) {

			if(e.scrollHeight > e.offsetHeight){
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

	}

}

export default AdjustTextAreaHeight;
