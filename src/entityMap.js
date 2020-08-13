function EntityMap(entities) {
	entities = (entities) ? entities : {};
	return {
		addEntities(entityList) {
			entityList.forEach((entity) => {
				if (entity in entities) {
					entities[entity]++;
				} else {
					entities[entity] = 1;
				}
			});
			return true;
		},
		getEntities() {
			return entities;
		},
		// maintain queue of last 20 entities for recommender relevance
		updateRecentEntities(recentEntites, newEntities) {
			const queueSize = 20;
			const combinedEntitiesLength = recentEntites.length + newEntities.length;
			if (combinedEntitiesLength > queueSize) {
				const queueOffset = combinedEntitiesLength - queueSize;
				for (let i = 0; i < queueOffset; i++) {
					recentEntites.shift();
				}
			}
			return recentEntites.concat(newEntities);
		}
	}
}

if (typeof module !== "undefined") {
	module.exports = EntityMap;
}