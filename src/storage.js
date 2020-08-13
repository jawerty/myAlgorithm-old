const chromeStorage = {
	getItem(key, defaultValue) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, function(result) {
				if (!result || !result[key]) resolve(defaultValue)
	        	else resolve(result[key]);
	        });
		});
	},
	saveItem(key, value) {
		return new Promise((resolve, reject) => {
			const data = {};
			data[key] = value;
			chrome.storage.local.set(data, function() {
	            resolve(true);
	        });
		});
	},
	removeItem(key) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.remove(key, function() {
	            resolve(true);
	        });
		});
	}
}

if (typeof module !== "undefined") {
	module.exports = chromeStorage;
};
