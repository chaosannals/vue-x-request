import qs from 'qs';

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
        return new Promise((resolve, reject) => {
            let element = document.createElement('script');
            element.src = url + '?' + qs.stringify(param);
            element.charset = 'utf-8';
            element.onload = () => {
                resolve();
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