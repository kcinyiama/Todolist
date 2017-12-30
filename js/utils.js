let uniqueString = function() {
	let entropy = '';
	let randomness = 'qwertyuiopasdfghjklzxcvbnm1234567890QWERTYUIOPASDFGHJKLZXCVBNM';
	for(let i = 0; i < 20; i++) {
		entropy += randomness.charAt(Math.floor(Math.random() * randomness.length));
	}
	return entropy;
};