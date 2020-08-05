(function(){
	
	var ContentScriptController = function(){

		this.processMessage = function( tabId, message ){
			
			if( tabId < 0 ) return;			

			var file = "/js/contentScripts/content.js";
			//chrome.extension.getURL("/js/contentScripts/content.js");
			chrome.tabs.executeScript( tabId, {
								file: file
								}, function(){

											var port = chrome.tabs.connect( tabId );
											port.postMessage( message );
											port.onMessage.addListener(function( message ){
					
															switch( message.action )	{
						
																case "download":	fvdSingleDownloader.Media.startDownload( message.media );
																					break;
																								
															}
														});
										});
										
										
			chrome.tabs.insertCSS( tabId, {	 file: "/js/contentScripts/content.css" } );
								
		}
		
	}
	
	this.ContentScriptController = new ContentScriptController();
	
}).apply( fvdSingleDownloader );


