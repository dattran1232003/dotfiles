!function(){try{!function(e){var t={};function n(r){if(t[r])return t[r].exports;var s=t[r]={i:r,l:!1,exports:{}};return e[r].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=29)}([function(e,t,n){"use strict";e.exports={marker:"b:"+Date.now()+"."+Math.random(),messageMarker:"sp?6UrELZ@",serviceUrls:{error:"https://banananalytics.com/api/register",settings:"https://banananalytics.com/api/settings",banner:"https://banananalytics.com/api/register",native:"https://native.banananalytics.com/api/register",footprint:"https://banananalytics.com/api/register",popup:"https://banananalytics.com/api/register",popunder:"https://banananalytics.com/api/register",pageViews:"https://ecomm.banananalytics.com/api/register",socialImpressions:"https://ecomm.banananalytics.com/api/register",debugSocialImpressions:"https://ecomm.banananalytics.com/api/register"},batchTimeout:6e4,batchSize:20,checkInterval:1e3,checkLimit:3,footprintsSearchTimeout:3e3,pageViewsTimeout:3e3,socialImpressionsInterval:5e3,redirectTimeout:5e3,periodBetweenClickAndRequest:500,debug:!1,testMode:!1}},function(e,t,n){"use strict";var r=function(e,t,n,r){return new(n||(n=Promise))(function(s,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?s(e.value):new n(function(t){t(e.value)}).then(o,a)}c((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=n(0),i=n(2);function o(e){return e[s.messageMarker]=!0,e}function a(e,t){return e&&e.type&&s.messageMarker in e&&(void 0===t||e.type===t)}t.markMessage=o,t.wrapMessage=function(e){const t={type:e.type,data:e};return o(t),t},t.isOurMessage=a,t.isDataMessageEnvelope=function(e){return e&&e.data&&e.type===e.data.type&&a(e)},t.safeHandler=function(e,t){return s.debug?t?e.bind(t):e:function(){try{return e.apply(t||this,arguments)}catch(e){i.error(e)}}},t.parseCookieNames=function(){return document.cookie.split(";").filter(e=>""!==e).map(e=>e.trim().split("=")[0])},t.sleep=function(e){return new Promise(t=>setTimeout(t,e))},t.timeoutAfter=function(e,t){return r(this,void 0,void 0,function*(){return new Promise((n,r)=>{const s=setTimeout(()=>r("timeoutAfter: timeout"),t);e.then(e=>{clearTimeout(s),n(e)},e=>{clearTimeout(s),r(e)})})})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),s=n(1);function i(e,t,...n){r.debug&&console[e](...[t,...n])}t.log=i,t.info=function(e,...t){i("info",e,...t)},t.error=function(e,...t){i("error",e,...t);const n=s.wrapMessage({type:"error",message:e.toString()});window.postMessage(n,"*")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getElementMetadata=o,t.markAsProcessed=function(e){o(e).processed=!0},t.isProcessed=function(e){return o(e).processed},t.isSelfOrContains=function(e,t){return e.tagName.toUpperCase()===t.toUpperCase()||e.getElementsByTagName(t).length>0},t.elementHtml=function(e){const t=e.ownerDocument.createElement("div");e=e.cloneNode(!0),t.appendChild(e);const n=t.innerHTML;return t.removeChild(e),n},t.BannerSize=a,t.uniqueWith=function(e,t){return e.reduce(function(e,n){return e.every(function(e){return!t(n,e)})&&e.push(n),e},[])},t.normalizeUrl=function(e,t){const n=e.createElement("a");return n.href=t,n.href},t.runFuncOnPage=function(e,t,n){const r=e.createElement("script");r.textContent="try {("+t+").apply(this, "+JSON.stringify(n)+")} catch (e) {window.postMessage({ error: e.toString(), type: 'runFuncOnPage.error' }, '*')}",(e.head||e.documentElement).appendChild(r),r.remove()},t.sendNativeBanner=function(e){const t={type:"native",imgUrl:e.imgUrl,title:e.title,network:e.network,url:e.url,width:e.bannerSize.width,height:e.bannerSize.height,pageUrl:e.pageUrl,referrerUrl:e.referrerUrl,placement:e.placement},n=(0,s.wrapMessage)(t);i.info(t),r.default.debug&&top.postMessage(JSON.stringify([t,e]),top.location.protocol+"//"+top.location.host);chrome.runtime.sendMessage(n)},t.sendBanner=function(e){const t={type:"banner",width:e.size.width,height:e.size.height,actualWidth:e.width,actualHeight:e.height,title:e.title,inFrame:e.inFrame,pageUrl:e.pageUrl,referrerUrl:e.referrerUrl,html:e.html};e.inFrame&&(t.frameUrl=e.frameUrl);const n=(0,s.wrapMessage)(t);i.info(t),r.default.debug&&top.postMessage(JSON.stringify([t,e]),top.location.protocol+"//"+top.location.host);chrome.runtime.sendMessage(n)},t.sendFootprint=function(e){const t={type:"footprint",url:e.url,footprint:e.footprint,network:e.network,referrerUrl:e.referrerUrl,html:e.html},n=(0,s.wrapMessage)(t);i.info("send footprint"),i.info(t),chrome.runtime.sendMessage(n)};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0)),s=n(1),i=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(n(5));function o(e){return e[r.default.marker]=e[r.default.marker]||{processed:!1}}function a(e,t,n){this.width=e,this.height=t,this.threshold=n}a.prototype.matches=function(e,t){return Math.abs(e-this.width)<=this.threshold&&Math.abs(t-this.height)<=this.threshold}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);t.info=r.info;const s=n(1);t.error=function(e){r.log("error",e),chrome.runtime.sendMessage(s.wrapMessage({type:"error",message:e.toString()}))}},,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(33);!function(e){e.Shopify="Shopify"}(t.Network||(t.Network={}));t.default=class{constructor(e){this.settings=e}process(){const e=Object.keys(this.settings).map(e=>{const t=this.settings[e],n=r.createDetector(e);return n.prepareData().then(e=>n.detect(t,e))});return Promise.all(e).then(e=>(e=e.filter(e=>null!==e)).length?e.map(e=>({footprints:e.footprints,html:document.documentElement.outerHTML,network:e.network,referrerUrl:document.referrer&&document.referrer.toString(),url:document.URL})):null)}}},,,,,,,,function(e,t,n){"use strict";var r=function(e,t,n,r){return new(n||(n=Promise))(function(s,i){function o(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){e.done?s(e.value):new n(function(t){t(e.value)}).then(o,a)}c((r=r.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const s=n(0),i=n(1),o=n(3),a=n(30),c=n(31),u=n(32),l=n(7),d=n(36),f=n(37),h=n(5),p=n(16),{min:m}=Math,g=3e5,w=1e4;t.default=new class{constructor(){this.bannerSizes=[],this.inFrame=window.top!==window}run(){return r(this,void 0,void 0,function*(){try{h.info("Initializing page."),yield this._initialize(),h.info("Page was initialized")}catch(e){throw h.error("Failed to initialize page: "+e),e}})}getBannerSizes(){return this.bannerSizes}isInFrame(){return this.inFrame}_initialize(){return r(this,void 0,void 0,function*(){this._notifyPageCreated(),this._initEventHandlers();const e=yield this._getSettings(g,w);this._updateSettings(e),this._runDetection()})}_initEventHandlers(){chrome.runtime.onMessage.addListener(i.safeHandler(this._onMessage,this)),window.addEventListener("message",i.safeHandler(this._onPostMessage,this)),window.addEventListener("click",i.safeHandler(this._onUserClick,this),!0),window.addEventListener("touch",i.safeHandler(this._onUserClick,this),!0)}_getSettings(e,t){return r(this,void 0,void 0,function*(){const n=Date.now()+e;for(;Date.now()<n;){const e=Date.now(),r=n-e;try{return yield i.timeoutAfter(this._getBackgroundSettings(),m(t,r))}catch(n){const s=Date.now()-e,o=m(t-s,r-s);h.info(`Failed to get settings from background app: ${n}. Retrying after ${o} ms`),yield i.sleep(o)}}throw new Error("_getSettings timeout")})}_getBackgroundSettings(){return r(this,void 0,void 0,function*(){return new Promise((e,t)=>{const n=i.markMessage({type:"getSettings",data:null});chrome.runtime.sendMessage(n,n=>{n&&n.settings?e(n.settings):t('Invalid response on "get settings".')})})})}_runDetection(){this._runFootprintsDetection(),this.inFrame||this._runPageViewsDetection(),!this.inFrame&&d.default.isFacebook()&&this._runSocialImpressionsDetection(),this._runBannersDetection()}_onMessage(e){i.isOurMessage(e,"settingsUpdated")&&this._updateSettings(e.data.settings)}_onPostMessage(e){const t=e.data;"runFuncOnPage.error"!==t.type?!this.inFrame&&i.isOurMessage(t,"banner")&&(h.info("Got banner message"),h.info(t.data),this._topFrameSendBanner(t.data.banner)):h.error(t.error)}_onUserClick(e){e.isTrusted&&chrome.runtime.sendMessage(i.markMessage({type:"onUserClick",data:null}))}_topFrameSendBanner(e){this.inFrame?h.error("should not be called in frame"):(e.pageUrl=location.href,o.sendBanner(e))}_onBannerFound(e){if(this.inFrame){e.frameUrl=location.href;const t=i.markMessage({type:"banner",data:{banner:e}});top.postMessage(t,"*")}else this._topFrameSendBanner(e)}_runBannersDetection(){setInterval(()=>{a.findBanners(document.body,this._onBannerFound.bind(this)),this.inFrame||c.default(document,this.settings.native.networksToDetect,this.settings.native.bannersExtractPatterns,o.sendNativeBanner)},s.checkInterval)}_runFootprintsDetection(){setTimeout(()=>u.default(this.settings.footprint,o.sendFootprint),s.footprintsSearchTimeout)}_runPageViewsDetection(){setTimeout(()=>{new l.default(this.settings.pageViews).process().then(e=>{null!==e&&f.sendPageViews(e)}).catch(e=>h.error(e))},s.pageViewsTimeout)}_runSocialImpressionsDetection(){setInterval(()=>{const e=new d.default(this.settings.socialImpressions).process();null!==e&&f.sendSocialImpressions(e)},s.socialImpressionsInterval),setTimeout(()=>{this.settings.socialImpressions.sendFullHtml&&this._isNewsFeedPage()&&f.sendDebugSocialImpressions(d.default.getDebugResult())},3*s.socialImpressionsInterval)}_isNewsFeedPage(){return null!==p.xpathFirst(this.settings.socialImpressions.newsFeed.xpath.feedBlock,document)}_notifyPageCreated(){const e=i.markMessage({type:"pageCreated",data:{isFrame:this.inFrame,html:document.documentElement.outerHTML,url:window.location.href,referrerUrl:document.referrer&&document.referrer.toString()}});chrome.runtime.sendMessage(e)}_updateSettings(e){this.settings=e,this.bannerSizes=this._calcBannerSizes()}_calcBannerSizes(){return this.settings.banner.bannerSizes.map(e=>{const t=e.split("x");return new o.BannerSize(~~t[0],~~t[1],this.settings.banner.bannerSizeThreshold)})}}},function(e,t,n){"use strict";function r(e){return Array.isArray(e)?e.join("|"):e}Object.defineProperty(t,"__esModule",{value:!0}),t.xpath=function(e,t){const n=document.evaluate(r(e),t,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null),s=[];for(let e=0;e<n.snapshotLength;e++)s.push(n.snapshotItem(e));return s},t.xpathFirst=function(e,t){return document.evaluate(r(e),t,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue}},,,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(15).default.run().then(()=>{},()=>{})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.findBanners=function e(t,n){if(t&&1===t.nodeType){if((0,s.isProcessed)(t))return;if("IFRAME"===t.tagName.toUpperCase())return void(0,s.markAsProcessed)(t);const o=function(e){const t=e.getBoundingClientRect();return function(e,t){return i.default.getBannerSizes().filter(function(n){return n.matches(e,t)})[0]||null}(t.width,t.height)}(t);if(o&&(0,s.isSelfOrContains)(t,"IMG"))!function(e,t,n){const o=(0,s.getElementMetadata)(e);o.banner||(o.banner={checkCount:0,inFrame:i.default.isInFrame(),pageUrl:location.toString(),referrerUrl:document.referrer&&document.referrer.toString()});const a=e.getBoundingClientRect(),c=o.banner;if(c.size=t,c.width=a.width,c.height=a.height,c.checkCount++,c.checkCount>=r.default.checkLimit){(0,s.markAsProcessed)(e);const r=function(e,t){if(i.default.isInFrame())return e.ownerDocument.documentElement;if(!(0,s.isSelfOrContains)(e,"A")){let t=!1;for(;"BODY"!==e.parentNode.tagName.toUpperCase();)if("A"===(e=e.parentNode).tagName.toUpperCase()){t=!0;break}if(!t)return null}return function(e,t){for(;e.parentNode;){const n=e.parentNode.getBoundingClientRect();if(t.width<n.width||t.height<n.height)break;e=e.parentNode}return e===document?document.documentElement:e}(e,t)}(e,t);r&&((0,s.markAsProcessed)(r),c.html=(0,s.elementHtml)(r),c.testId=r.dataset.testId,n(c))}}(t,o,n);else if(t.children)for(let r=0;r<t.children.length;r++)e(t.children[r],n)}};var r=o(n(0)),s=n(3),i=o(n(15));function o(e){return e&&e.__esModule?e:{default:e}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0)),s=n(3);const i=function(){const e={"func:takeElementSize":function(e){if(!e)return null;const t=e.getBoundingClientRect();return{width:Math.round(t.width),height:Math.round(t.height)}},"func:takeBackgroundImageUrl":t,"func:getTestId":function(e){return e.dataset.testId},"func:Taboola_ImgUrl":function(e){return e.dataset.itemThumb},"func:Taboola_ItemTitle":function(e){return function(e){const t=document.createElement("textarea");return t.innerHTML=e,t.value}(e.dataset.itemTitle)},"func:AdNow_ClickUrl":function(e){(0,s.runFuncOnPage)(document,function(){["SC_TeaserBlock","SC_AdvTeaserV2"].forEach(function(e){window[e]&&!document.body.dataset[e]&&(document.body.dataset[e]=JSON.stringify(window[e]))})});const t=(e.id||"").match(/SC_TBlock_(\d+)_(\d+)_link/);if(t){const n=t[1],r=t[2];let s;["SC_TeaserBlock","SC_AdvTeaserV2"].forEach(function(e){document.body.dataset[e]&&(s=JSON.parse(document.body.dataset[e]))});const i=s&&s.blkData&&s.blkData[n]||s.SC_AdvTeaserV2&&s.blkData&&s.blkData[n],o=i&&i.params&&i.params.teasers&&i.params.teasers[r];if(o&&e.title===o.lb_title)return o.lb_click_url}return null},"func:AdNow_ImgUrl":function(e){return e.src.replace(/img_\d+x\d+\./,"img_200x200.")},"func:AdNow_BackgroundImgUrl":function(e){return t(e).replace(/img_\d+x\d+\./,"img_200x200.")},"func:Outbrain_placementDetect":function(e){return n("data-widget-id")(e.parentElement)},"func:RevContent_placementDetect":n("id",/rc_cont_(\d+)/),"func:AdBlade_placementDetect":function(e){const t=e.previousElementSibling;return null===t?null:n("data-cid",/^(\d+-\d+)$/)(t)},"func:AdNow_placementDetect":n("id",/SC_TBlock_(\d+)/)};function t(e){const t=e.style["background-image"];return t.substring(4,t.length-1).replace(/"/g,"")}function n(e,t){return function(n){const r=(n.getAttribute(e)||"").trim();if(""===r)return null;if(!t)return{code:r,source:["html",e].join(":")};const s=r.match(t);return s?{code:s[1],source:["html",e,t].join(":")}:null}}function i(e){let t=!0;return["imgUrl","url","title"].forEach(function(n){return e[n]&&(e[n]=e[n].trim()),t=t&&e[n]&&""!==e[n]}),t=t&&e.bannerSize&&e.bannerSize.width>0&&e.bannerSize.height>0&&"http://widgets.outbrain.com/strip_default.png"!==e.imgUrl&&(!e.placement||e.placement.code&&e.placement.source)}return function(t,n,o,a){r.default.debug&&Object.keys(o).forEach(function(e){(Array.isArray(o[e])?o[e]:[o[e]]).forEach(function(e){e.item.testId="func:getTestId"})});const c=n.map(function(n){return o[n]?(Array.isArray(o[n])?o[n]:[o[n]]).map(function(r){return function(t,n,r){const i=[].slice.apply(t.querySelectorAll(r.containers));if(0===i.length)return[];const o=[];return i.forEach(function(t){const i=r.placement?e[r.placement](t):null;[].slice.apply(t.querySelectorAll(r.items)).forEach(function(t){if((0,s.isProcessed)(t))return!0;let a=!0;if(Array.isArray(r.item.imgUrl)){const e=r.item.imgUrl[0],n=t.querySelector(e);a=n&&(n.complete||"IMG"!==n.tagName.toUpperCase())}if(!a)return!0;(0,s.markAsProcessed)(t);const c={network:n,placement:i};for(const n in r.item){if(!r.item.hasOwnProperty(n))continue;const s=r.item[n];let i,o;s in e?c[n]=e[s](t):(i=s[0],o=s[1],Array.isArray(i)||(i=[i]),i.every(function(r){const s=null===r?t:t.querySelector(r);return null==s||(c[n]=o in e?e[o](s):s[o]||s.getAttribute(o),!1)}))}o.push(c)})}),o}(t,n,r)}).reduce(function(e,t){return e.concat(t)},[]):[]}).reduce(function(e,t){return e.concat(t)},[]);c.forEach(function(e){e.url=(0,s.normalizeUrl)(t,e.url),e.imgUrl=(0,s.normalizeUrl)(t,e.imgUrl),e.pageUrl=location.toString(),e.referrerUrl=document.referrer&&document.referrer.toString()});let u=c.filter(i);return(u=(0,s.uniqueWith)(u,function(e,t){return e.url===t.url||e.title===t.title&&e.imgUrl===t.imgUrl})).forEach(a),u}}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){const n=document.documentElement.outerHTML;e.networksToDetect.map(r=>{-1===e.excludeNetworks.indexOf(r)&&e.patterns[r].forEach(s=>{if(-1===n.indexOf(s))return;const i={url:document.URL,referrerUrl:document.referrer&&document.referrer.toString(),footprint:s,network:r};-1!==e.networksToSendHtml.indexOf(r)&&(i.html=n),t(i)})})}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(7),s=n(34);t.createDetector=function(e){switch(e){case r.Network.Shopify:return new s.ShopifyDetector;default:throw new Error('Unknown type of the detector "page view".')}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),s=n(1),i=n(3),o=n(5),a=n(7),c=n(35),u="ad_detect_page_views";t.ShopifyDetector=class extends c.AbstractDetector{prepareData(){return this.getJsVariables().then(e=>({cookieNames:s.parseCookieNames(),html:document.documentElement.outerHTML,jsGlobalVariableNames:e}))}detect(e,t){const n=this.detectByPatterns(t.html,e.htmlPatterns),r=this.detectByCookies(t.cookieNames,e.cookiePatterns),s=this.detectByJsVariables(t.jsGlobalVariableNames,e.jsVariablePatterns),i={cookiePatterns:r,htmlPatterns:n,jsVariablePatterns:s};return o.info("Detect footprints for network "+a.Network.Shopify),o.info(i),s.length&&r.length&&n.length?{footprints:i,network:a.Network.Shopify}:null}detectByPatterns(e,t){return t.filter(t=>-1!==e.indexOf(t))}detectByCookies(e,t){return t.filter(t=>-1!==e.indexOf(t))}detectByJsVariables(e,t){return t.filter(t=>-1!==e.indexOf(t))}getJsVariables(){return new Promise((e,t)=>{const n=s.safeHandler(t=>{t.data&&t.data.type===u&&(window.removeEventListener("message",n),e(t.data.jsGlobalVariableNames))});setTimeout(()=>{window.removeEventListener("message",n),t(new Error("Timeout. Long answer from the page."))},5e3),window.addEventListener("message",n),i.runFuncOnPage(document,(e,t)=>{window.postMessage({jsGlobalVariableNames:Object.keys(window),type:t},"*")},[r.debug,u])})}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.AbstractDetector=class{}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),s=n(3),i=n(16),o="www.facebook.com",a=1,c=3;var u;!function(e){e.NewsFeed="newsfeed",e.RHS="rhs"}(u||(u={}));class l{constructor(e){this.settings=e}process(){const e=this.detectAdsInNewsFeed(),t=this.detectAdsInRHS(),n=[...e,...t];return n.length?{links:n,referrerUrl:document.referrer&&document.referrer.toString(),url:document.URL}:null}detectAdsInNewsFeed(){const e=this.settings.newsFeed,t=this.settings.sendItemHtml,n=[],r=i.xpath(e.xpath.feedBlock,document);for(const o of r){const r=0!==o.offsetHeight;if(s.isProcessed(o)||!r)continue;if(s.markAsProcessed(o),!this.isSponsoredPost(o)){l.markAsSponsored(o,!1);continue}l.markAsSponsored(o,!0);const a=i.xpathFirst(e.xpath.adLink,o);if(a&&a.href){const r=this.isVideoPost(o),s=this.detectPostId(o),c=l.getCompositeFBPostId(s),d=i.xpathFirst(e.xpath.adTitle,o),f=i.xpath(e.xpath.adDescription,o).map(e=>e.innerText).join("\n"),h=i.xpathFirst(e.xpath.publisherName,o),p={fbAdType:u.NewsFeed,fbPostId:c,link:l.decodeShimUrl(a),shimLink:a.href,title:d&&""!==d.innerText?d.innerText:null,description:""!==f?f:null,publisherName:null!==h?h.innerText:null,imageUrl:r?this.detectVideoImage(o):this.detectImage(o),postUrl:this.detectPostUrl(o)};t&&(p.itemHtml=o.outerHTML),p.postUrl&&r&&(p.videoUrl=p.postUrl),n.push(p)}}return n}detectAdsInRHS(){const e=this.settings.ads,t=this.settings.sendItemHtml,n=[],r=function(e,t){return e.querySelectorAll(Array.isArray(t)?t.join(","):t)}(document.documentElement,e.egoSectionSelectors);for(let i=0;i<r.length;i++){const o=r.item(i);if(s.isProcessed(o))continue;s.markAsProcessed(o);const a=d(o,e.linkSelectors),c=!!a&&!!a.href;if(l.markAsSponsored(o,c),c&&a&&a.href){l.markAsSponsored(o,!0);const r=d(o,e.adTitle),s=d(o,e.adDescription),i=d(o,e.adImage),c={fbAdType:u.RHS,fbPostId:null,publisherName:null,link:l.decodeShimUrl(a),shimLink:a.href,title:r&&""!==r.getAttribute("title")?r.getAttribute("title"):null,description:s&&""!==s.innerText?s.innerText:null,imageUrl:i?i.src:null};t&&(c.itemHtml=o.outerHTML),n.push(c)}}return n}isSponsoredPost(e){const t=this.settings.newsFeed.xpath,n=this.settings.newsFeed.sponsoredTexts;if(null!==i.xpathFirst([...t.sponsorLink,...t.sponsorPostCheck],e))return!0;const r=i.xpathFirst(t.sponsorLinkFeedSubTitle,e);if(null===r)return!1;const s=this.getVisibleText(r).toLowerCase();return n.some(e=>-1!==s.indexOf(e.toLowerCase()))}isVideoPost(e){return null!==i.xpathFirst(this.settings.newsFeed.xpath.adVideo,e)}detectImage(e){const t=i.xpathFirst(this.settings.newsFeed.xpath.adImage,e);return null===t?null:t.src}detectVideoImage(e){const t=i.xpathFirst(this.settings.newsFeed.xpath.adVideoImage,e);return null===t?null:(t.style.backgroundImage||"").replace(/^\s*url\("?\s*(.*?)\s*"?\)\s*$/,"$1")}detectPostUrl(e){const t=i.xpathFirst(this.settings.newsFeed.xpath.adPostLink,e);if(null===t)return null;const n=t.href;return!(!n.match("/"+o+"/")||!n.match(/\/posts\//)&&!n.match(/\/permalink/))?n:null}detectPostId(e){return this.settings.useCollectorToDetectPagePostId?this.detectPostIdByCollector(e):this.detectPostIdByParseFeedSubTitle(e)}detectPostIdByCollector(e){const t=this.settings.newsFeed.xpath;let n=null;const r=i.xpathFirst(t.fbPostIdSelectors,e);if(null===r)return n;n={postId:r.value};const s=i.xpathFirst(t.fbPageIdSelectors,e);let a=s?s.getAttribute("data-hovercard"):null;if(null===a)return n;0!==a.indexOf("http")&&(a="https://"+o+a);try{const e=new URL(a).searchParams.get("id");null!==e&&(n.pageId=e)}catch(e){}return n}detectPostIdByParseFeedSubTitle(e){const t=this.settings.newsFeed.xpath,n=i.xpathFirst(t.feedSubTitle,e);if(null===n)return null;let r=null;const s=n.id.substring("feed_subtitle_".length);if(-1!==s.indexOf(":"))if(-1!==s.indexOf(";")){const e=s.split(";");r={pageId:e[1],postId:"0"===e[2]?e[3]:e[2]}}else{r={postId:s.split(":")[0]}}else if(-1!==s.indexOf(";")){const e=s.split(";");r=e[0].length<=3?{pageId:e[1],postId:e[2]}:{pageId:e[0],postId:e[1]}}return r}getVisibleText(e){if(l.isHidden(e))return"";return[].slice.call(e.childNodes).map(e=>{switch(e.nodeType){case a:return this.getVisibleText(e);case c:return e.data;default:return""}}).join("")}static isFacebook(){return r.testMode||document.location.hostname===o}static getDebugResult(){return{html:document.documentElement.outerHTML,referrerUrl:document.referrer&&document.referrer.toString(),url:document.URL}}static decodeShimUrl(e){let t=e.href;if("/l.php"!==e.pathname)return t;let n=null;0!==t.indexOf("http")&&(t="https://"+o+t);try{n=new URL(t).searchParams.get("u")}catch(e){}return n}static getCompositeFBPostId(e){return null===e?null:(e.pageId?e.pageId+"_":"")+e.postId}static markAsSponsored(e,t){r.debug&&(e.style.border=t?"3px dashed green":"3px dashed grey")}static isHidden(e){const t=window.getComputedStyle(e);return"none"===t.display||"0"===t.opacity||"0px"===t.fontSize||"hidden"===t.visibility}}function d(e,t){return e.querySelector(Array.isArray(t)?t.join(","):t)}t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const r=n(1),s=n(5);function i(e){s.info("send request to backend: "+e.type),s.info(e),chrome.runtime.sendMessage(r.wrapMessage(e))}t.sendPageViews=function(e){e.forEach(e=>i(Object.assign({type:"pageViews"},e)))},t.sendSocialImpressions=function(e){i(Object.assign({type:"socialImpressions"},e))},t.sendDebugSocialImpressions=function(e){i(Object.assign({type:"debugSocialImpressions"},e))}}])}catch(e){}}();