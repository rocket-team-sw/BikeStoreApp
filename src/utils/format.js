const format = function(amount, ds, ms) {
	if(isNaN(amount)) {
		return 'NaN'
	}
	if(ds && ms) {
		if(ds === ms) {
			return 'Symbol error'
		}
	}
	var first = amount < 0  ? '-' : ''
	ds = !ds ? ',' : ds
	ms = !ms ? '.' : ms
	var splits = (amount + '').split(ds)
	if(splits.length > 2) {
		return 'Format Error'
	}
	let result = ''
	let intPart = splits[0]
	for(let i = intPart.length - 1, count = 1; i >= 0; i--, count++) {
		result = intPart[i] + '' + result
		if(count % 3 === 0 && i > 0) {
			result = ms + result
		}
	}
	let formatted = first + result
	if(splits[1]) {
		formatted += ds + splits[1]
	}
	return formatted
}

module.exports = { format }