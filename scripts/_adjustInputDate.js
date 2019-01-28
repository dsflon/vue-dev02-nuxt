const AdjustInputDate = (target) => {
	target = target.currentTarget ? target.currentTarget : target;
	target.parentNode.dataset.date = target.value ? target.value.replace(/-/g,".") : "YYYY / MM" + (target.type==="date"?" / DD":"")
}

export default AdjustInputDate;
