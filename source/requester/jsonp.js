import qs from 'qs';
import uuidv4 from 'uuid/v4';

/**
 * Jsonp 封装
 * 
 */
export default class JsonpRequester {
    /**
     * 
     * @param {*} url 
     * @param {*} param 
     */
    request(url, param) {
        if (!param) {
            param = {};
        }
        if (!param.callback) {
            let uuid = uuidv4().replace(/-/g, '');
            param.callback = `vueXRequestJsonp${uuid}`;
        }
        return new Promise((resolve, reject) => {
            let element = document.createElement('script');
            element.src = url + '?' + qs.stringify(param);
            element.charset = 'utf-8';
            window[param.callback] = data => {
                resolve(data);
                delete window[param.callback];
            };
            element.onload = () => {
                element.remove();
            };
            element.onerror = e => {
                reject(e);
                element.remove();
            }
            document.body.appendChild(element);
        });
    }
}