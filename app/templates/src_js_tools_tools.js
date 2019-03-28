import api from '../../api/options';
import {post} from './fetch';

export const getRequest = () => {
	const url = document.location.search; //获取url中"?"符后的字串 
	let theRequest = {};
	let theUrl = {};
	if(url.indexOf("?") != -1) {
		const str = url.substr(1);
		const strs = str.split("&");
		for(let i = 0; i < strs.length; i++) {
			theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
		}
	}

	//判断是否又微信跳转前存起来的到sessionStorage里面的参数
	const wxSearch = sessionStorage.getItem('_wxDirectorSearch')
	if(wxSearch) {
		const search = wxSearch.split("&");
		for(let i = 0; i < search.length; i++) {
			theUrl[search[i].split("=")[0]] = search[i].split("=")[1];
		}
	}

	return Object.assign(theUrl, theRequest);
	
}
//打点
export const clickEventCollection = (act, page, callback) => {
	post(api.add_point, {flag:'click', act, page}).then(res => {
		callback && callback();
	});
}

export const getUrl = (type = 'all', page, ...rest) => {// domain all search withsession, 
	if(type === 'domain') {
		return document.location.protocol + '//' + document.domain;
	} else if(type === 'all'){
		return document.href;
	} else if(type === 'search') {
		return getRequest();
	} else if(type ==='withsession') {
		return getUrl('domain') + `/${page}?` + getInitialParams(...rest);
	}
}
//获取地址栏或者sesseion里面的参数

export const getInitialParams = (...rest) => {
	const searchs = getRequest();
	const result = rest.map(v => {
		let value = searchs[v] || sessionStorage.getItem(v);
		if(value) {
			return `${v}=${value}`;
		} else {
			return `${v}=`;
		}
	});

	return result.join('&');
}

//截流函数
export function throttle (func, delay = 300) {
	var timer = null;
	var callStack = [func];
	return function back(arg) {
		if(timer === null) {
			timer = setTimeout(function() {
				callStack[callStack.length - 1].call(this, arg);
				clearTimeout(timer);
				timer = null;
				callStack = [func];
			}, delay);
		} else {
			callStack.push(func);
		}
	}
}

//延迟执行函数
export function delay (func, delay) {

}

