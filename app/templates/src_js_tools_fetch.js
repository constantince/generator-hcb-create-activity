import axios from 'axios';
import {getRequest} from  './tools';
import Tips from './../plugs/tips';

const params = ['phone', 'authtoken', 'authm', 'ver', 'key', 'platform'];

const getHttpRequestSessions = (name) => {
    if(!sessionStorage.getItem(name)) {
        const urlParams = getRequest();
        if(!urlParams[name]) {
            return console.log(`can not find params:%c ${name}`, 'font-size:14px;color:red; font-weight:bold;');
        }
        sessionStorage.setItem(name, urlParams[name]);
        return urlParams[name]
    } else {
        return sessionStorage.getItem(name);
    }
}

const tips = new Tips();

const unionParams = (p) => p.map(v => ({[v] : getHttpRequestSessions(v)}));

const setCookiesToData = (data = {}) => {
    return Object.assign({
        uid: getHttpRequestSessions('user'),
    }, ...unionParams(params), data);
}

const showBody = () => {
    const body = document.body;
    if(body.style.visibility === 'initial') return;
    setTimeout(function(){
        body.style.visibility = 'initial';
    }, 0)
    
}

const request = (url, params, data = {}, options) => new Promise((resolve, reject) => { 
        axios(url, {params, data, ...options}).then(res => {
            if(res.data.code === 'ok') {
                resolve(res.data);
            } else {
                reject(res.data.msg);
            }
            showBody();
        }).catch(ex => {
            tips.show('<*-*!>' + ex);
            showBody();
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