import api from '../../api/options';
import {post} from './fetch';



export const getRequest = () => {
		  const url = document.location.search; //获取url中"?"符后的字串 
		  const theRequest = {};
		  if(url.indexOf("?") != -1) {
		    const str = url.substr(1);
		    const strs = str.split("&");
		    for(let i = 0; i < strs.length; i++) {
		      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
		    }
		  }
		  return theRequest;
	}
//打点
export const clickEventCollection = (act, name, client) => {
	post(api.add_point, {flag:'click',act:act,page:`${client}${name}`},function (res) {});
}

export const getUrl = (type = 'all') => {// domain all search
	if(type === 'domain') {
		return document.location.protocol + '//' + document.domain;
	} else if(type === 'all'){
		return document.href;
	} else if(type === 'search') {
		return getRequest();
	}
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

