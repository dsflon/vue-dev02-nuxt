const AdjustSelect = (target) => {
	target = target.currentTarget ? target.currentTarget : target;
	target.parentNode.dataset.select = !target.value ? "選択してください" : "";
	if(!target.value) {
		target.parentNode.classList.add("is_placeholder")
	} else {
		target.parentNode.classList.remove("is_placeholder")
	}
}

export default AdjustSelect;
