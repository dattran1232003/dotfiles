(function(){
	
	if(window.__fvdSingleDownloaderContentScriptInserted)	return;
	window.__fvdSingleDownloaderContentScriptInserted = true;

	// ======================  DOWNLOAD  ==============================================================
	function startDownload( media ){

		chrome.extension.sendRequest( 
			{
				command:"startDownload",
				media: media
			},	function(  ) { 		
		});
	
	}
	
	function downloadMediaItem( media ){
	
		var a = document.createElement("a");
		
		a.setAttribute( "download", media.downloadName );
		a.setAttribute( "href", media.url );			
		//a.setAttribute( "target", "_blank" );	
		document.body.appendChild( a );

		var theEvent = document.createEvent("MouseEvent");
		
		theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		
		a.dispatchEvent(theEvent);
				
		document.body.removeChild( a );
	}
	
	
	// ======================  FaceBook Video ==============================================================
	function iconFaceBook( media, port ) {

		// console.log("iconFaceBook", media);
		
		if (media == null) return;

		if (media && media.length > 0) {
			for (var i=0; i<media.length; i++)		{
				var cont_id = "download_" + media[i].videoId;
				if ( media[i].videoId && !document.getElementById( cont_id ) ) {
					findBlock( media[i], cont_id );
				}
			}	
		}	
		
		// ------------------------------
		function findBlock( media, cont_id ) {
			var videos = document.querySelectorAll('video');
			videos.forEach(function(video, index){
				var videoContainer = video.closest('[data-testid="fbfeed_story"], [role="article"], [data-bt], ._5asm, ._5-yb._5_63, ._4-u2.mbm._4mrt._5jmm, ._5-yb._5_63, ._wyj');
				var videoId = getVideoIdByHtml(videoContainer);
				// get_title(videoContainer, media.tabId, media.videoId);	
				if(videoId == media.videoId) {
					add_facebook_download_button(video, media);
				}
			});
		}
		
		function getVideoIdByHtml(a) {
			if (!a) return console.warn('No parent target selector.');
			const b = a.outerHTML,
				c = /\/videos\/(\d+)[^\/?]?/g.exec(b);
			if (c && c[1]) return c[1];
			const d = /\/videos\/[a-z]{2,3}\.\d+\/(\d+)\/?/g.exec(b);
			if (d && d[1]) return d[1];
			const e = /mf_story_key&quot;:&quot;(\d+)&quot;/g.exec(b);
			if (e && e[1]) return e[1];
			const f = /ajaxify="\/ajax\/sharer\/\?s=\d+&amp;appid=\d+&amp;id=(\d+)&/g.exec(b);
			if (f && f[1]) return f[1];
			const g = /;mf_story_key&quot;:&quot;(\d+)&/g.exec(b);
			return g && g[1] && g[1]
		}	
		
		function add_facebook_download_button(video, media) {
			video.parentElement.style.position = 'relative';
			var id = "download_" + media.videoId;
			if ( document.getElementById( id ) ) {
				return;
			}

			var downloadButton = document.createElement('a');
			downloadButton.setAttribute("id", id);
			downloadButton.setAttribute( "href", "http://fbdown.net/downloader.php?id=" + btoa( media.url ).split("").reverse().join("") );
			downloadButton.setAttribute( "target", "_blank" );
			downloadButton.classList.add("fb-download-btn");

			var downloadButtonIcon = document.createElement('img');
			downloadButtonIcon.setAttribute("src", chrome.runtime.getURL("images/content-icon.png"));
			downloadButtonIcon.classList.add("fb-download-icon");
			downloadButton.appendChild(downloadButtonIcon);
			
			var downloadButtonText = document.createElement('span');
			downloadButtonText.innerHTML = "Download";
			downloadButton.appendChild(downloadButtonText);


			video.parentElement.appendChild(downloadButton);

		}
		
		function get_title(eee, tabId, videoId) {
			var e = eee.querySelector('h5') || eee.querySelector('h6');
			var title = e.innerHTML;
			title = title.replace(/<span aria-hidden="true">(.?)<\/span>/gm,'' )
						 .replace(/<[^>]*>/gm,'')
						 .replace(/&nbsp;/gm,' ')
						 .replace(/&(.+?);/gm,'');
				
			if (title) {  
				chrome.extension.sendRequest({	akce:"set_FaceBook_Media_title",  
												tabId: tabId,	
												videoId: videoId,	
												title: title  },	
										function( response ){  });
			}

		}
	}
	
	// ====================================================================================
	
	chrome.extension.onConnect.addListener(function( port ){				
		
		var pendingRequestLastId = 0;
		var pendingRequests = {};
		
		// --------------------
		function addRequest( message, callback ){
			var requestId = pendingRequestLastId;
			pendingRequestLastId++;
			
			message.requestId = requestId;
			
			pendingRequests[ requestId ] = callback;
						
			port.postMessage( message );
		}
		
		// --------------------
		function downloadMediaItemRequest( media ){
			
			port.postMessage( {
						action: "download",
						media: media
					} );
			
		}
		
		// --------------------
		function getOffset( obj ) {
			var curleft = curtop = 0;
			if (obj.offsetParent) 
			{
				do 
				{
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
				}
				while(obj = obj.offsetParent);
			}
			return {	"left": curleft,	"top": curtop	};
		}
		// --------------------
	
	
		port.onMessage.addListener( function( message ){
	
			switch( message.action ){
								
				// ====================================================================================
				case "answer":
				
					var requestId = message.requestId;
					if( pendingRequests[ requestId ] )
					{
						pendingRequests[ requestId ]( message );
						delete pendingRequests[ requestId ];
					}
					else
					{
						console.log( "Undefined answer", message );
					}					
				
				break;
				
				// ====================================================================================
				case "startDownload":
					
					var media = message.media;
					
					console.log( 'startDownload', media.url );
					
					downloadMediaItem( media );

				break;

				// ====================================================================================
				case "insertFaceBook_VideoButton":
				
					var media = message.media;
					
					iconFaceBook( media, port );
				
				break;

				// ====================================================================================

			}
			
		} );

		
	});
	
})();

