const AdjustInputDate = (target) => {
	target = target.currentTarget ? target.currentTarget : target;
	target.parentNode.dataset.date = target.value ? target.value.replace(/-/g,".") : "YYYY / MM" + (target.type==="date"?" / DD":"")

	if(!target.value) {
		target.parentNode.classList.add("is_placeholder")
	} else {
		target.parentNode.classList.remove("is_placeholder")
	}
}

export default AdjustInputDate;
