function NLPText(text) {
	const doc = nlp(text);
	const parseRawText = (entityList) => {
		let parsedText = text;
		entityList.forEach(function(entity) {
			parsedText = parsedText.split(entity.text).join('');
		});
		return parsedText;
	}

	const entitiesToFlatArray = (entities) => {
		return entities.map((entity) => {
			return entity.normal;
		});
	}

	return {
		parseNamedEntities() {
			const namedEntities = doc.topics().data();
			const parsedText = parseRawText(namedEntities);
			return {
				parsedText,
				namedEntities: entitiesToFlatArray(namedEntities)
			}
		},
		parseNouns(rawText) {
			let subdoc = (rawText) ? nlp(rawText) : doc;
			const nouns = subdoc.nouns().data();
			return entitiesToFlatArray(nouns);
		}

	}
}



(async function() {
	const savedEntities = await chromeStorage.getItem('live-entities', {});

	const entityMap = EntityMap(savedEntities);
	const recommender = Recommender(savedEntities);
	
	let latestVideos = [];
	let fetchingVideos = false;
	let lastFetchTs = Date.now();
	async function processMessage(request, sender, sendResponse) {
		if (request.eventName === 'newEntity') {
			console.log('newEntity')
			const data = request.data;
			if (data.type === 'searchQuery' || data.type === 'videoTitle') {
				const textDoc = NLPText(data.rawText);
				const namedEntities = textDoc.parseNamedEntities();
				// use parsed text without named Entities for nouns
				const nouns = textDoc.parseNouns(namedEntities.parsedText);
				const entityList = namedEntities.namedEntities.concat(nouns);
				entityMap.addEntities(entityList);

				await chromeStorage.saveItem('live-entities', entityMap.getEntities());

				let recentEntities = await chromeStorage.getItem('recent-entities', []);
				recentEntities = entityMap.updateRecentEntities(recentEntities, entityList);
				await chromeStorage.saveItem('recent-entities', recentEntities);

				runRecommender();
				return {success: true};
			}
		} else if (request.eventName === 'getRecommended') {
			const data = request.data;
			if (data.origin == "youtube") {
				if (Date.now() - lastFetchTs < (1000 * 30)) {
					await runRecommender(true);
				}
				lastFetchTs = Date.now();
				const response = { videos: null };
				if (latestVideos) {
					response.videos = latestVideos
				}
				return response;
			}
			// What/s the link between Michael Brooks and Kyle Kulinski
			// How do I get the information that they;re similar and more similar than Ben Shapiro
			// cant use youtube search
			// 
		}
		return {};
	}

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		processMessage(request, sender, sendResponse).then((response) => {
			sendResponse(response);
		});
		return true;
	});


	async function runRecommender(isPromise, savedEntities) {
		// Don't run recommender if there are less than 7 entities
		// this should be better in the future
		if (!savedEntities || Object.keys(savedEntities).length < 7) return;

		let localRecommender;
		if (savedEntities) {
			localRecommender = Recommender(savedEntities);;
		} else {
			localRecommender = recommender;
		}

		if (fetchingVideos === true) return; // stop from spamming
		fetchingVideos = true;
		if (isPromise) {
			return new Promise(async (resolve, reject) => {
				latestVideos = [
					await localRecommender.fetchYoutubeVideos(),
					await localRecommender.fetchYoutubeVideos(),
					await localRecommender.fetchYoutubeVideos(),
					await localRecommender.fetchYoutubeVideos()
				];
				console.log(latestVideos);
				fetchingVideos = false;
				resolve(true);
			});
		} else {
			latestVideos = [
				await localRecommender.fetchYoutubeVideos(),
				await localRecommender.fetchYoutubeVideos(),
				await localRecommender.fetchYoutubeVideos(),
				await localRecommender.fetchYoutubeVideos()
			];
			fetchingVideos = false;
			console.log(latestVideos);
		}
		

	}

	(async function recommenderJob() {
		const savedEntities = await chromeStorage.getItem('live-entities', {});		
		console.log("current entities", savedEntities);
		runRecommender(false, savedEntities);

		setInterval(async function() {
			console.log('run recommender again');
			const savedEntities = await chromeStorage.getItem('live-entities', {});
			const newEntityMap = EntityMap(savedEntities);
			runRecommender(false, savedEntities);
		}, 1000 * 60 * 10);
	})();
})();

// reload if process open for 12 hours
setTimeout(function() {
	chrome.runtime.reload();
}, 1000 * 60 * 60 * 12);
