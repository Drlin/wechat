function html_encode(str) {
	if (!str) {
		return str;
	}
 	return str.replace(/[<>&"]/g, (all) => {
 		return {
 			'<': '&lt;',
 			'>': '&gt;',
 			'&': '&amp;',
 			'"': '&quot;'
 		}[all]
 	});
}


module.exports = {
	html_encode
}