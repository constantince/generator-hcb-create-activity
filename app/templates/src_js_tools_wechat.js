import Host from './host';
import axios from 'axios';
import qs from 'qs';
const prefix = process.env.NODE_ENV === 'production' ? '' : '<%=prefix%>';
const wechat = {
	//初始化微信配置
	init (shareInfo, url = `${prefix}/php2/wechat/get_js_api_config.php`, authorizationUrl, ...menu) {
		if(!Host.isWechat()) return new Promise((resolve, reject) => { reject('failed') }).catch(ex => console.error('not in the right host env'));
		//检测界面是否授权
			return axios.post(url, qs.stringify({url: window.location.href})).then(res => {
				const {data} = res;
				wx.config({
					debug: process.env.NODE_ENV === 'development', // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.appid, // 必填，公众号的唯一标识
					timestamp: data.time, // 必填，生成签名的时间戳
					nonceStr: data.noncestr, // 必填，生成签名的随机串
					signature: data.sig,// 必填，签名
					jsApiList: ['onMenuShareAppMessage', ...menu] // 必填，需要使用的JS接口列表
					/*
					onMenuShareTimeline: "menu:share:timeline",
					onMenuShareAppMessage: "menu:share:appmessage",
					onMenuShareQQ: "menu:share:qq",
					onMenuShareWeibo: "menu:share:weiboApp",
					onMenuShareQZone: "menu:share:QZone",
					*/
				});
				
				wx.ready(() => {
					this.share(shareInfo);
				});

				wx.error(function(ex) {
					alert(JSON.stringify(ex));
				});
			});
	},
	/*
	//授权认证
	authorization (search_data) {
		const search_data = getUrl('search');
		//
		if(search_data.from === 'singlemessage' && search_data.openid) return;
		url = url || window.location.href.split('#')[0];
		if(Host.isWechat()) {
			const main_url = getUrl('domain');
			window.location.href=`${main_url}/api/index.php?s=/activity/wxAuth/wxLoginAuth&url=${url}&serilize=${search_data.serilize}`
		}
	},
*/
	//初始化分享
	share({link, title, imgUrl, desc, success, cancel, type} =  {}) {
		imgUrl = encodeURIComponent(imgUrl); 
		wx.onMenuShareAppMessage( {link, title, imgUrl, type, desc, success, cancel}); 
	}
}

export default wechat;