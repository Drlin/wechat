function html_encode(str) {
	if (!str) {
		return str;
	}
	str = str.replace(/&/g, '&gt;');
	str = str.replace(/</g, '&lt;');
	str = str.replace(/>/g, '&gt;');
	str = str.replace(/\s/g, '&nbsp;');
	str = str.replace(/\'/g, '&#39;');
	str = str.replace(/\"/g, '&#quot;');
	str = str.replace(/\n/g, '<br>;');
	return str;
}

module.exports = {
	html_encode
}