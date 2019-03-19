import axios from 'axios';
import {getRequest} from  './tools';

const getHttpRequestSessions = (name) => {
    if(!sessionStorage.getItem(name)) {
        const urlParams = getRequest();
        if(!urlParams[name]) {
            return alert(`can not find <${name}> in url and Cookie, please check your http address!`);
        }
        sessionStorage.setItem(name, urlParams[name]);
        return urlParams[name]
    } else {
        return sessionStorage.getItem(name);
    }
}

const setCookiesToData = (data = {}) => {
    return Object.assign(data, {uid: getHttpRequestSessions('user'), phone: getHttpRequestSessions('phone')})
}

const request = (url, params, data = {}, options) => new Promise((resolve, reject) => { 
        axios(url, {params, data, ...options}).then(res => {
            if(res.data.code === 'ok') {
                resolve(res.data);
            } else {
                reject(res.data.msg);
            }
            
        }).catch(ex => {
            alert(ex);
        });
    }
);

export const get = (url, params = {}, options) => {
    return request(url, setCookiesToData(params), undefined, {method: 'GET', ...options});
}

export const post = (url, data, options) => {
    return request(url, undefined, setCookiesToData(data), {method: 'POST', ...options});
}

export default request;