const userAgents = navigator.userAgent;

const Host = {
	//判断是否未安卓app客户端
	isAndriodApp: typeof window.HcbFunction !== 'undefined',
	//是否未微信客户端打开
	isWechat: typeof WeixinJSBridge !== 'undefined',
	//移动客户端打开
	//isMobile: !!userAgents.match(/AppleWebKit.*Mobile.*/),
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
	share ({link, title, imgUrl, desc, success, cancel} = {}) {
		const shareCallBack = success || function() {};
		if(this.isAndriodApp) {
			window.HcbFunction.jsShareToFriend( link, imgUrl, title, desc, 'shareCallBack');
		} else if(typeof wx !== 'undefined'){
			wx.onMenuShareAppMessage({link, title, imgUrl, desc, success, cancel});
		} else {
			console.warn('No host object');
		}
		
	}
}

export default Host;