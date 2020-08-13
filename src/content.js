function videoTemplate(video) {
	if (!video) return '';
	return `<ytd-grid-video-renderer class="style-scope ytd-grid-renderer" lockup="">
	   <div id="dismissable" class="style-scope ytd-grid-video-renderer">
	      <ytd-thumbnail use-hovered-property="" width="210" class="style-scope ytd-grid-video-renderer">
	         <a id="thumbnail" class="yt-simple-endpoint inline-block style-scope ytd-thumbnail" aria-hidden="true" tabindex="-1" rel="null" href="/watch?v=lE0liB60wag">
	            <yt-img-shadow class="style-scope ytd-thumbnail no-transition" style="background-color: transparent;" loaded=""><img id="img" class="style-scope yt-img-shadow" alt="" width="210" src="${video.thumbnail}"></yt-img-shadow>
	            <div id="overlays" class="style-scope ytd-thumbnail">
	               <ytd-thumbnail-overlay-time-status-renderer class="style-scope ytd-thumbnail" overlay-style="DEFAULT"><span class="style-scope ytd-thumbnail-overlay-time-status-renderer" aria-label="3 minutes, 56 seconds">
	                  3:56
	                  </span>
	               </ytd-thumbnail-overlay-time-status-renderer>
	               <ytd-thumbnail-overlay-now-playing-renderer class="style-scope ytd-thumbnail">
	                  <span class="style-scope ytd-thumbnail-overlay-now-playing-renderer">Now playing</span>
	               </ytd-thumbnail-overlay-now-playing-renderer>
	            </div>
	            <div id="mouseover-overlay" class="style-scope ytd-thumbnail"></div>
	            <div id="hover-overlays" class="style-scope ytd-thumbnail"></div>
	         </a>
	      </ytd-thumbnail>
	      <div id="details" class="style-scope ytd-grid-video-renderer">
	         <div id="meta" class="style-scope ytd-grid-video-renderer">
	            <h3 class="style-scope ytd-grid-video-renderer">
	               <ytd-badge-supported-renderer class="style-scope ytd-grid-video-renderer" hidden="" disable-upgrade="">
	                  <dom-repeat id="repeat" as="badge" class="style-scope ytd-badge-supported-renderer">
	                     <template is="dom-repeat"></template>
	                  </dom-repeat>
	               </ytd-badge-supported-renderer>
	               <a id="video-title" class="yt-simple-endpoint style-scope ytd-grid-video-renderer" aria-label="${video.title}" title="${video.title}" href="/watch?v=${video.videoId}">${video.title}</a>
	            </h3>
	            <div id="metadata-container" class="grid style-scope ytd-grid-video-renderer" meta-block="">
	               <div id="metadata" class="style-scope ytd-grid-video-renderer">
	                  <div id="byline-container" class="style-scope ytd-grid-video-renderer">
	                     <yt-formatted-string id="byline" ellipsis-truncate="" class="style-scope ytd-grid-video-renderer complex-string" title="${video.channelName}" has-link-only_=""><a class="yt-simple-endpoint style-scope yt-formatted-string" spellcheck="false" href="${video.channelUrl}">${video.channelName}</a></yt-formatted-string>
	                     <ytd-badge-supported-renderer class="style-scope ytd-grid-video-renderer" hidden="" disable-upgrade="">
	                        <dom-repeat id="repeat" as="badge" class="style-scope ytd-badge-supported-renderer">
	                           <template is="dom-repeat"></template>
	                        </dom-repeat>
	                     </ytd-badge-supported-renderer>
	                  </div>
	                  <div id="metadata-line" class="style-scope ytd-grid-video-renderer">
	                     <span class="style-scope ytd-grid-video-renderer">${video.viewsText}</span><span class="style-scope ytd-grid-video-renderer">${video.timeText}</span>
	                     <dom-repeat strip-whitespace="" class="style-scope ytd-grid-video-renderer">
	                        <template is="dom-repeat"></template>
	                     </dom-repeat>
	                  </div>
	               </div>
	               <div id="additional-metadata-line" class="style-scope ytd-grid-video-renderer">
	                  <dom-repeat strip-whitespace="" class="style-scope ytd-grid-video-renderer">
	                     <template is="dom-repeat"></template>
	                  </dom-repeat>
	               </div>
	            </div>
	         </div>
	         <ytd-badge-supported-renderer class="style-scope ytd-grid-video-renderer" hidden="" disable-upgrade="">
	            <dom-repeat id="repeat" as="badge" class="style-scope ytd-badge-supported-renderer">
	               <template is="dom-repeat"></template>
	            </dom-repeat>
	         </ytd-badge-supported-renderer>
	         <div id="menu" class="style-scope ytd-grid-video-renderer">
	            <ytd-menu-renderer class="style-scope ytd-grid-video-renderer">
	               <div id="top-level-buttons" class="style-scope ytd-menu-renderer"></div>
	               <yt-icon-button id="button" class="dropdown-trigger style-scope ytd-menu-renderer">
	                  <button id="button" class="style-scope yt-icon-button" aria-label="Action menu">
	                     <yt-icon class="style-scope ytd-menu-renderer">
	                        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" class="style-scope yt-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;">
	                           <g class="style-scope yt-icon">
	                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" class="style-scope yt-icon"></path>
	                           </g>
	                        </svg>
	                     </yt-icon>
	                  </button>
	               </yt-icon-button>
	            </ytd-menu-renderer>
	         </div>
	      </div>
	      <div id="buttons" class="style-scope ytd-grid-video-renderer"></div>
	   </div>
	   <div id="dismissed" class="style-scope ytd-grid-video-renderer">
	      <div id="dismissed-content" class="style-scope ytd-grid-video-renderer"></div>
	   </div>
	</ytd-grid-video-renderer>`;
}

function getAppContainer() {
	const myAlgoContainer = document.createElement('div');
	myAlgoContainer.style.textAlign = "center";
	myAlgoContainer.style.width = "100%";
	myAlgoContainer.style.backgroundColor = "white";
	myAlgoContainer.style.paddingBottom = "32px";
	myAlgoContainer.style.paddingTop = "10px";
	myAlgoContainer.style.borderBottom = "1px solid #e5e5e5";
	myAlgoContainer.setAttribute('data-myalgo-container', 'true');
	return myAlgoContainer;
}

function getAppHeader() {
	const myContentHeader = document.createElement('span');
	myContentHeader.innerText = "myAlgorithm";
	myContentHeader.style.color = "var(--yt-spec-text-primary)";
    myContentHeader.style.fontSize = "2rem";
    myContentHeader.style.fontWeight = "500";
    myContentHeader.style.lineHeight = "2.4rem";
    myContentHeader.style.margin = "15px 0px 15px 0px";
    myContentHeader.style.display = "block";
	myContentHeader.setAttribute('data-myalgo-title', 'true');
	return myContentHeader;
}

window.addEventListener('DOMContentLoaded', function(event) {
 	if (window.location.hostname === "www.youtube.com") {
 		console.log("myAlgorithm loaded");
		function isHomepage() {
			const home = document.querySelector('[page-subtype="home"]');
			return home && home.getAttribute('role') == "main";
		}

		function isVideo() {
			const video = document.querySelector('ytd-video-primary-info-renderer');
			return !!video;
		}

		function homepageContentLoaded() {
			const content = document.querySelector('#overlays.ytd-thumbnail');
			return !!content;
		}

		function getSearchBox() {
			let searchBoxes = document.querySelectorAll('.ytd-searchbox')[0];
			if (searchBoxes && searchBoxes.length > 0) {
				return searchBoxes[0];
			} else { return null }
		}

		let getSearchText, searchBox;

		const searchBoxInterval = setInterval(function() {
			searchBox = getSearchBox();
			if (searchBox) {
				getSearchText = function() {
					let searchBox = getSearchBox();
					return searchBox.value;
				}
				searchBox.addEventListener("keyup", function(e) {
					if(e.key === 'Enter') {
						sendEntity(getSearchText(), "searchQuery");
				    }
				}, {passive: true});
				clearInterval(searchBoxInterval);
			}
		}, 100);

		
		const searchBtnInterval = setInterval(function() {
			const searchBtn = document.querySelector('#search-icon-legacy');
			if (searchBtn && getSearchText) {
				searchBtn.addEventListener("click", function(e) {
					sendEntity(getSearchText(), "searchQuery");
				}, {passive: true});	
				clearInterval(searchBtnInterval);
			}
		}, 100);

		function sendEntity(rawText, type) {
			if (rawText && rawText.length > 0) {
				console.log(rawText)
				chrome.runtime.sendMessage({
					eventName: "newEntity",
					data: {
						type,
						origin: "youtube",
						rawText	
					}
				}, (response) => {
					console.log(response);
				})
			}
		}

		function waitForHomepage() {
			return new Promise(function(resolve, reject) {
				const interval = 100;
				let timeout = 0;
				const homepageWait = setInterval(function() {
					timeout+=interval;
					console.log(isHomepage() == true);
					if (isHomepage() == true && homepageContentLoaded() == true) {
						clearInterval(homepageWait);
						resolve(true)
					} else if (timeout > 5000) { // stop after a while
						reject();
					}
				}, interval);

			});
		}

		function waitForVideo() {
			return new Promise(function(resolve, reject) {
				const interval = 100;
				let timeout = 0;
				const videoWait = setInterval(function() {
					timeout+=interval;
					console.log(isVideo() == true);
					if (isVideo() == true) {
						clearInterval(videoWait);
						resolve(true);
					} else if (timeout > 5000) { // stop after a while
						reject();
					}
				}, interval);

			});
		}

		(async function main(pageToWaitFor) {
			if (pageToWaitFor == "home") {
				await waitForHomepage();
			} else if (pageToWaitFor == "video") {
				await waitForVideo();
			}
			if (window.location.pathname.indexOf('/watch') > -1) {
				// is video url
				const videoTitle = document.title.split(" - YouTube")[0];
				console.log(document.title, videoTitle);
				sendEntity(videoTitle, "videoTitle");
			} else if (isHomepage()) {
				function renderContent() {
					return new Promise((resolve, reject) => {
						chrome.runtime.sendMessage({
							eventName: "getRecommended",
							data: {
								origin: "youtube",
							}
						}, (response) => {
							const currentMyAlgo = document.querySelector('[data-myalgo-container]');
							if (currentMyAlgo) {
								currentMyAlgo.parentNode.removeChild(currentMyAlgo);
							}

							// to do copy whole video object from background.js and re set ytInitialData
							console.log(response)
							const videos = response.videos;
							if (!videos || videos.length == 0) return;

							// find the element to put the app container on top of
							let contentHeader = document.querySelector("#grid-title.ytd-rich-grid-renderer");
							if (!contentHeader) {
							 	contentHeader = document.querySelector("ytd-shelf-renderer .grid-subheader");
							}
							if (!contentHeader) {
								contentHeader = document.querySelector("ytd-two-column-browse-results-renderer");
							}
							
							if (!contentHeader) {
								return;
							}

							const myContentHeader = getAppHeader();
							const myAlgoContainer = getAppContainer();
							myAlgoContainer.appendChild(myContentHeader);
							
							const contentWrapper = document.createElement("div");
							contentWrapper.setAttribute('data-myalgo', 'true');
							console.log(videos);
							videos.forEach(function(video, i) {
								if (!video) return;
								const videoWrapper = document.createElement('div');
								videoWrapper.style.display = "inline-block";
								videoWrapper.innerHTML = videoTemplate(video);
								if (i !== videos.length-1)
									videoWrapper.firstChild.style.marginRight = "15px";
								contentWrapper.appendChild(videoWrapper.firstChild);
							});

							myAlgoContainer.appendChild(contentWrapper);

							contentHeader.parentNode.insertBefore(myAlgoContainer, contentHeader);

							videos.forEach(function(video, i) {
								if (!video) return;
								const videoRenderers = document.querySelectorAll('[data-myalgo] ytd-grid-video-renderer');
								// console.log(videoRenderers);
								const videoRenderer = videoRenderers[i];
								if (!videoRenderer) return;

								const videoUrl = `/watch?v=${video.videoId}`;
								// add thumbnail
								const thumbnailTag = videoRenderer.querySelector("yt-img-shadow img")
								const thumbnailCopy = thumbnailTag.cloneNode(true);
								thumbnailTag.remove();
								thumbnailCopy.onClick = function() {window.location.href = `/watch?v=${video.videoId}`};
								thumbnailCopy.src = video.thumbnail;
								thumbnailCopy.style.visibility = "visible";
								const imgContainer = videoRenderer.querySelector("yt-img-shadow");
								imgContainer.prepend(thumbnailCopy);
								imgContainer.parentNode.href = videoUrl;
								
								// add title
								const videoTitleTag = videoRenderer.querySelector("#video-title");
								const videoTitleTagParent = videoTitleTag.parentNode;
								const videoTitleCopy = videoTitleTag.cloneNode(true);
								videoTitleTag.remove();
								videoTitleCopy.innerText = video.title;
								videoTitleCopy.href = videoUrl;
								videoTitleTagParent.prepend(videoTitleCopy);
							});

							resolve();
						});
					});
				}

				await renderContent();
				
			}

			// find wordaround for this
			var lastLocation = window.location.href;
			var state = false;
			(function checkLocationChange() { // not using a setInterval because it's easier to control flow here with recursion
				return setTimeout(function() {
					if (!state && window.location.href != lastLocation) {
						lastLocation = window.location.href;
						state = true;
						console.log('cleared');
						setTimeout(function() {
							if (window.location.pathname === '/') {
								main("home");
								console.log('isHome');
							} else if (window.location.pathname.indexOf('/watch') > -1) {
								main("video");
								console.log('isVideo');
							}
							console.log('rerun recursion');
							checkLocationChange();
						}, 1000);
					} else {
						checkLocationChange();
					}
				}, 100);
			})();
		})();
		
	}	;
}, { passive: true });

