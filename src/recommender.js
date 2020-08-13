function Recommender(entities) {
	const sortEntities = function(entities) {
		const sortedEntities = [];	
		Object.keys(entities).forEach((entity) => {
			const score = entities[entity];
			if (sortedEntities.length == 0){
				sortedEntities.push(entity);
				return;
			}

			for (const [index, sortedEntity] of sortedEntities.entries()) {
				if (score > entities[sortedEntity]) {
					sortedEntities.splice(index, 0, entity);	
					return;
				}
			}
			// if smallest in list
			sortedEntities.push(entity);
		});
		return sortedEntities;
	}

	const randomTopEntity = function(omittedIndex) {
		const sortedEntities = sortEntities(entities);
		const topEntities = sortedEntities.slice(0, 20);
		if (omittedIndex) {
			topEntities.splice(omittedIndex, 1);
		}
		const topEntity = topEntities[Math.floor(Math.random()*topEntities.length)];
		return [topEntity, topEntities.indexOf(topEntity)];
	}

	const randomRecentEntity = function(recentEntities, omittedIndex) {
		if (omittedIndex) {
			recentEntities.splice(omittedIndex, 1);
		}
		const recentEntity = recentEntities[Math.floor(Math.random()*recentEntities.length)];
		return [recentEntity, recentEntities.indexOf(recentEntity)];
	}

	// build search query with random top/recent entities
	const buildSearchQuery = async function(){
		let searchEntity1, searchEntity2, searchEntity1Index, searchEntity2Index;
		if (Math.random() < 0.5) { // coin flip get two top entities or a recent entity and a top entity
			[searchEntity1, searchEntity1Index] = randomTopEntity();
			[searchEntity2, searchEntity2Index] = randomTopEntity(searchEntity1Index);
		} else {
			const recentEntities = await chromeStorage.getItem('recent-entities', []);
			console.log(recentEntities, "recent");
			if (recentEntities.length > 0) {
				[searchEntity1, searchEntity1Index] = randomRecentEntity(recentEntities);
				[searchEntity2, searchEntity2Index] = randomTopEntity();
			} else {
				[searchEntity1, searchEntity1Index] = randomTopEntity();
				[searchEntity2, searchEntity2Index] = randomTopEntity(searchEntity1Index);
			}
		}
		const searchQuery = `${searchEntity1}+${searchEntity2}`;
		return searchQuery;
	}

	return {
		fetchYoutubeVideos() {
			return new Promise(async (resolve, reject) => {
				const searchQuery = await buildSearchQuery();
				console.log(searchQuery);
				const url = `https://www.youtube.com/results?search_query=${searchQuery}&page=1`;
				const headers = new Headers({
				    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36"
				});

				fetch(url, {
				    method: 'POST', 
				    credentials: "omit",
				    headers
				}).then(function(response) {
				  	// console.log(response.body())
				    return response.text();
				}).then(function(text) {
					const doc = document.implementation.createHTMLDocument('');
					doc.open();
					doc.write(text);
					doc.close();
					console.log(doc);
					const results = [];
					const scripts = doc.evaluate("//script[contains(text(),\"ytInitialData\")]", doc.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				    console.log(scripts);
					for (let i = 0, length = scripts.snapshotLength; i < length; ++i) {
				        results.push(scripts.snapshotItem(i));
				    }
				    // console.log(results[0].innerText);
				    try {
						const unparsedJSON = results[0].innerText.split("window[\"ytInitialData\"] = ")[1].split("window[\"ytInitialPlayerResponse\"]")[0].trim();
				    	const ytData = JSON.parse(unparsedJSON.substring(0, unparsedJSON.length - 1));
				    	const videos = ytData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
				    	console.log(videos);
				    	for (let i = 0; i < videos.length; i++) {
				    		const videoObject = videos[i];
				    		if (videoObject.videoRenderer) {
				    			console.log(videoObject.videoRenderer);
				    			const video = videoObject.videoRenderer;
				    			return resolve({
				    			 	videoId: video.videoId,
				    			 	thumbnail: video.thumbnail.thumbnails[0].url,
				    			 	title: video.title.runs[0].text,
				    			 	viewsTexts: video.viewCountText.simpleText,
				    			 	timeText: video.publishedTimeText.simpleText,
				    			 	channelName: video.ownerText.runs[0].text
				    			});
				    		}
				    	}
				    	resolve(null)
				    } catch (e) {
				    	console.log("JSON PARSING ERROR:", e);
				    	reject();
				    }
				});
			});
			
		}
	}
}

if (typeof module !== "undefined") {
	module.exports = Recommender;
};

// algorithm

// entity_list 1,2,3,4,5,6,7,8,9,10
// search query rand(entity_list), rand(entity_list-1) -> first video in feed