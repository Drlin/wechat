function html_encode(str) {
	if (!str) {
		return str;
	}
 	return str.replace(/[<>&"]/g, (c) => {
 		return {
 			'<': '&lt;',
 			'>': '&gt;',
 			'&': '&amp;',
 			'"': '&quot;'
 		}[c]
 	});
}

module.exports = {
	html_encode
}