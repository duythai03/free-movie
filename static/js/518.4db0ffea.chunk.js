"use strict";(self.webpackChunkfree_movie=self.webpackChunkfree_movie||[]).push([[518,295],{518:(t,e,i)=>{i.r(e),i.d(e,{YouTubeProvider:()=>b});var s=i(607),n=i(108),o=i(326),a=i(295);i(43);const r=-1,c=0,h=1,u=2,l=3,d=5;class b extends o.h{constructor(t,e){super(t),this.b=e,this.$$PROVIDER_TYPE="YOUTUBE",this.scope=(0,s.createScope)(),this.ia=(0,s.signal)(""),this.Aa=-1,this.nd=-1,this.wc=!1,this.L=null,this.J=null,this.S=null,this.language="en",this.color="red",this.cookies=!1}get c(){return this.b.delegate.c}get currentSrc(){return this.L}get type(){return"youtube"}get videoId(){return this.ia()}preconnect(){(0,n.TB)(this.Ob())}setup(){super.setup(),(0,s.effect)(this.xe.bind(this)),this.c("provider-setup",this)}async play(){const{paused:t}=this.b.$state;return this.J||(this.J=(0,o.H)((()=>{if(this.J=null,t())return"Timed out."})),this.u("playVideo")),this.J.promise}On(t){var e;null===(e=this.J)||void 0===e||e.reject(t),this.J=null}async pause(){const{paused:t}=this.b.$state;return this.S||(this.S=(0,o.H)((()=>{this.S=null,t()})),this.u("pauseVideo")),this.S.promise}Pn(t){var e;null===(e=this.S)||void 0===e||e.reject(t),this.S=null}setMuted(t){t?this.u("mute"):this.u("unMute")}setCurrentTime(t){this.wc=this.b.$state.paused(),this.u("seekTo",t),this.c("seeking",t)}setVolume(t){this.u("setVolume",100*t)}setPlaybackRate(t){this.u("setPlaybackRate",t)}async loadSource(t){if(!(0,s.isString)(t.src))return this.L=null,void this.ia.set("");const e=(0,a.resolveYouTubeVideoId)(t.src);this.ia.set(null!==e&&void 0!==e?e:""),this.L=t}Ob(){return this.cookies?"https://www.youtube.com":"https://www.youtube-nocookie.com"}xe(){this.A();const t=this.ia();t?(this.tc.set("".concat(this.Ob(),"/embed/").concat(t)),this.c("load-start")):this.tc.set("")}ng(){const{keyDisabled:t}=this.b.$props,{muted:e,playsInline:i,nativeControls:s}=this.b.$state,n=s();return{autoplay:0,cc_lang_pref:this.language,cc_load_policy:n?1:void 0,color:this.color,controls:n?1:0,disablekb:!n||t()?1:0,enablejsapi:1,fs:1,hl:this.language,iv_load_policy:n?1:3,mute:e()?1:0,playsinline:i()?1:0}}u(t,e){this.te({event:"command",func:t,args:e?[e]:void 0})}hd(){window.setTimeout((()=>this.te({event:"listening"})),100)}ld(t){this.c("loaded-metadata"),this.c("loaded-data"),this.b.delegate.Ha(void 0,t)}jb(t){var e;null===(e=this.S)||void 0===e||e.resolve(),this.S=null,this.c("pause",void 0,t)}nc(t,e){const{duration:i,realCurrentTime:s}=this.b.$state,n=this.Aa===c,o=n?i():t;this.c("time-change",o,e),!n&&Math.abs(o-s())>1&&this.c("seeking",o,e)}ob(t,e,i){const s={buffered:new n.zJ(0,t),seekable:e};this.c("progress",s,i);const{seeking:o,realCurrentTime:a}=this.b.$state;o()&&t>a()&&this.pb(i)}pb(t){const{paused:e,realCurrentTime:i}=this.b.$state;window.clearTimeout(this.nd),this.nd=window.setTimeout((()=>{this.c("seeked",i(),t),this.nd=-1}),e()?100:0),this.wc=!1}mc(t){const{seeking:e}=this.b.$state;e()&&this.pb(t),this.c("pause",void 0,t),this.c("end",void 0,t)}je(t,e){const{started:i,paused:s,seeking:n}=this.b.$state,o=t===h,a=t===l,b=(s()||this.J)&&(a||o);if(a&&this.c("waiting",void 0,e),n()&&o&&this.pb(e),!i()&&b&&this.wc)return this.On("invalid internal play operation"),void(o&&(this.pause(),this.wc=!1));var p;b&&(null===(p=this.J)||void 0===p||p.resolve(),this.J=null,this.c("play",void 0,e));switch(t){case r:this.On("provider rejected"),this.Pn("provider rejected"),this.c("pause",void 0,e);break;case d:this.ld(e);break;case h:this.c("playing",void 0,e);break;case u:this.jb(e);break;case c:this.mc(e)}this.Aa=t}ue(t,e){let{info:i}=t;if(!i)return;const{title:o,intrinsicDuration:a,playbackRate:r}=this.b.$state;if((0,s.isObject)(i.videoData)&&i.videoData.title!==o()&&this.c("title-change",i.videoData.title,e),(0,s.isNumber)(i.duration)&&i.duration!==a()){if((0,s.isNumber)(i.videoLoadedFraction)){var c,h;const t=null!==(c=null===(h=i.progressState)||void 0===h?void 0:h.loaded)&&void 0!==c?c:i.videoLoadedFraction*i.duration,s=new n.zJ(0,i.duration);this.ob(t,s,e)}this.c("duration-change",i.duration,e)}if((0,s.isNumber)(i.playbackRate)&&i.playbackRate!==r()&&this.c("rate-change",i.playbackRate,e),i.progressState){const{current:t,seekableStart:s,seekableEnd:o,loaded:r,duration:c}=i.progressState;this.nc(t,e),this.ob(r,new n.zJ(s,o),e),c!==a()&&this.c("duration-change",c,e)}if((0,s.isNumber)(i.volume)&&(0,s.isBoolean)(i.muted)){const t={muted:i.muted,volume:i.volume/100};this.c("volume-change",t,e)}(0,s.isNumber)(i.playerState)&&i.playerState!==this.Aa&&this.je(i.playerState,e)}A(){this.Aa=-1,this.nd=-1,this.J=null,this.S=null,this.wc=!1}}},326:(t,e,i)=>{i.d(e,{H:()=>o,h:()=>a});var s=i(607),n=i(108);function o(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:3e3;const i=(0,s.deferredPromise)();return setTimeout((()=>{const e=t();e&&i.reject(e)}),e),i}class a{constructor(t){this.Mb=t,this.tc=(0,s.signal)(""),this.referrerPolicy=null,t.setAttribute("frameBorder","0"),t.setAttribute("aria-hidden","true"),t.setAttribute("allow","autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope"),null!==this.referrerPolicy&&t.setAttribute("referrerpolicy",this.referrerPolicy)}get iframe(){return this.Mb}setup(){(0,s.listenEvent)(window,"message",this.Yi.bind(this)),(0,s.listenEvent)(this.Mb,"load",this.hd.bind(this)),(0,s.effect)(this.Nb.bind(this))}Nb(){const t=this.tc();if(!t.length)return void this.Mb.setAttribute("src","");const e=(0,s.peek)((()=>this.ng()));this.Mb.setAttribute("src",(0,n.xF)(t,e))}te(t,e){var i;n.op||null===(i=this.Mb.contentWindow)||void 0===i||i.postMessage(JSON.stringify(t),null!==e&&void 0!==e?e:"*")}Yi(t){var e;const i=this.Ob();if((null===t.source||t.source===(null===(e=this.Mb)||void 0===e?void 0:e.contentWindow))&&(!(0,s.isString)(i)||i===t.origin)){try{const e=JSON.parse(t.data);return void(e&&this.ue(e,t))}catch(n){}t.data&&this.ue(t.data,t)}}}},295:(t,e,i)=>{i.d(e,{findYouTubePoster:()=>r,resolveYouTubeVideoId:()=>a});const s=/(?:youtu\.be|youtube|youtube\.com|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|)((?:\w|-){11})/,n=new Map,o=new Map;function a(t){var e;return null===(e=t.match(s))||void 0===e?void 0:e[1]}async function r(t,e){if(n.has(t))return n.get(t);if(o.has(t))return o.get(t);const i=new Promise((async i=>{const s=["maxresdefault","sddefault","hqdefault"];for(const o of s)for(const s of[!0,!1]){const a=c(t,o,s);if((await fetch(a,{mode:"no-cors",signal:e.signal})).status<400)return n.set(t,a),void i(a)}})).catch((()=>"")).finally((()=>o.delete(t)));return o.set(t,i),i}function c(t,e,i){const s=i?"webp":"jpg";return"https://i.ytimg.com/".concat(i?"vi_webp":"vi","/").concat(t,"/").concat(e,".").concat(s)}}}]);
//# sourceMappingURL=518.4db0ffea.chunk.js.map