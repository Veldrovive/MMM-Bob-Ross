Module.register("MMM-Bob-Ross", {
	defaults: {
		imgHeight: "30vh",
		videoHeight: "30vh",
		autoPlay: true,
	},

	getStyles: function(){
		return ["MMM-Bob-Ross.css"];
	},

	getScripts: function(){
		return [this.file("rossList.js")]
	},

	start: function(){
		this.episodes = episodes;
		this.currentEpisode;
		this.selectEpisode();
		this.showingVideo = false;

		this.videoRef;
		this.imageRef;
	},

	selectEpisode(info){
		const self = this;

		if(typeof info === "object"){
			self.episodes.forEach(episode => {
				if(episode.season === info.season && episode.episode === info.episode){
					self.currentEpisode = episode;
				}
			})
		}else if(typeof info === "number"){
			self.currentEpisode = self.episodes[info];
		}else{
			self.currentEpisode = self.episodes[Math.floor(Math.random() * self.episodes.length)];
			console.log(self.currentEpisode)
		}

		this.updateDom();
	},

	switchToPicture(){
		this.showingVideo = false;
		this.updateDom();
	},

	switchToVideo(){
		this.showingVideo = true;
		this.updateDom();
	},

	playVideo(){
		if(this.videoRef){
			console.log("Playing")
			this.videoRef.contentWindow.postMessage('{"event":"command","func":"' + 'playVideo' + '","args":""}', '*');
		}
	},

	pauseVideo(){
		if(this.videoRef){
			this.videoRef.contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');
		}
	},

	getDom: function(){
		const container = document.createElement("div");
		container.classList.add("bob-ross-container");

		if(this.showingVideo){
			const video = document.createElement("iframe");
			video.src = this.currentEpisode.videoLink+"?modestbranding=1&controls=0&enablejsapi=1&iv_load_policy=3&showinfo=0"+(this.config.autoPlay ? "&autoplay=1" : "")
			console.log("Playing:",video.src)
			video.setAttribute("frameborder", "0");
			video.setAttribute("allow", "autoplay");
			video.style.height = this.config.videoHeight;
			video.classList.add("bob-ross-video");
			this.videoRef = video;
			this.imageRef = false;

			container.appendChild(video);
		}else{
			//Put in picture
			const title = document.createElement("h5");
			title.innerHTML = `${this.currentEpisode.title}<span class="subtitle"> - S${this.currentEpisode.season}E${this.currentEpisode.episode}</span>`;

			const spacer = document.createElement("hr");

			const image = document.createElement("img");
			image.src = this.currentEpisode.imgLink;
			image.style.height = this.config.imgHeight;
			image.classList.add("bob-ross-image");
			this.imageRef = image;
			this.videoRef = false;

			container.appendChild(title);
			container.appendChild(spacer);
			container.appendChild(image);
		}

		return container;
	},

	notificationReceived: function(notification, payload){
		if(notification === "ROSS_PLAY_VIDEO"){
			this.switchToVideo();
		}else if(notification === "ROSS_SHOW_IMAGE"){
			this.switchToPicture();
		}else if(notification === "ROSS_PAUSE_VIDEO"){
			this.pauseVideo();
		}else if(notification === "ROSS_UNPAUSE_VIDEO"){
			this.playVideo();
		}else if(notification === "ROSS_NEW_IMAGE"){
			this.selectEpisode(payload);
		}
	}
})