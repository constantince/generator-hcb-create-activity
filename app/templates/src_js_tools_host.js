const userAgents = window.navigator.userAgent.toLowerCase();

const Host = {
	//安卓app客户端
	isAndriodApp: () => typeof window.HcbFunction !== 'undefined',
	//微信客户端
	isWechat: () => userAgents.indexOf('micromessenger') > -1,
	//IOS客户端打开
	isIosApp: () => typeof window.WebViewJavascriptBridge !== 'undefined',
	//是否再app内打开
	isInApp () {
		return	this.isAndriodApp() || this.isIosApp()
	},
	//分享出去
	/* config: 
		{
	            title: conf.title,
	            desc: conf.desc,
	            link: shareUrlWechat,
	            imgUrl: conf.imgUrl,
	            type: "link",
	            success: function () {
	                alert('分享成功！')
	            },
	            cancel: function () {
	            }
	        }
	*/
	share ({link, title, imgUrl, desc, success, cancel, type} = {}, banWxCallback) {
		if(this.isAndriodApp()) {
			window.HcbFunction.jsShareToFriend( link, imgUrl, title, desc, 'shareCallback');
		} else if(typeof wx !== 'undefined' && this.isWechat()){
			//如果微信中不需要分享
			if(banWxCallback) {
				return banWxCallback();
			}
			imgUrl = encodeURICompoenent(imgUrl);
			wx.onMenuShareAppMessage({link, title, imgUrl, type, desc, success, cancel});
		} else if(this.isIosApp()){
			WebViewJavascriptBridge.callHandler('jsShareToFriend', `link:${link};imgUrl:${imgUrl};title:${title};desc:${desc}`, function(response) {});

		}  else {
			alert('未知宿主环境，请确认打开的环境！\n目前支持打开的环境: 货车宝APP、微信');
		}
}
		
}
export default Host;