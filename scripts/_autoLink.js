const AutoLink = (str) => {
	let regexp_url = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g; // ']))/;
	let regexp_makeLink = function(all, url, h, href) {
		return `<a href="h${href}" target="_blank">${url}</a>`;
	}
	return str.replace(regexp_url, regexp_makeLink);
}

export default AutoLink;
