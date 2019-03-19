import host from './host';
import { getUrl } from './tools';
import {get} from './fetch';
const wechat = {
	//初始化微信配置
	init (url = '/php/wechat/get_js_api_config.php', ...menu) {
		get(url).then(res => {
			wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appid, // 必填，公众号的唯一标识
                timestamp: res.time, // 必填，生成签名的时间戳
                nonceStr: res.noncestr, // 必填，生成签名的随机串
                signature: res.sig,// 必填，签名
                jsApiList: [menu] // 必填，需要使用的JS接口列表
            });
		})
	},

	//授权认证
	authorization (url) {
		const search_data = getUrl('search');
		//
		if(search_data.from === 'singlemessage' && search_data.openid) return;

		if(host.isWechat) {
			const main_url = getUrl('domain');
			window.location.href=`${main_url}/api/index.php?s=/activity/wxAuth/wxLoginAuth&url=${main_url}/${url}&serilize=${search_data.serilize}`
		}
	}
}

export default wechat;