import qs from 'qs';
import uuidv1 from 'uuid/v1';

export default class ScriptRequester {
    /**
     * 
     */
    constructor() {
        this.scripts = {};
    }

    /**
     * 
     */
    request(url, param) {
        return new Promise((resolve, reject) => {
            let uuid = uuidv1();
            let element = document.createElement('script');
            element.src = url + '?' + qs.stringify(param);
            element.charset = 'utf-8';
            element.onload = () => {
                resolve();
                delete this.scripts[uuid];
                document.body.removeChild(element);
            };
            element.onerror = e => {
                reject(e);
                delete this.scripts[uuid];
                document.body.removeChild(element);
            }
            document.body.appendChild(element);
            this.scripts[uuid] = element;
        });
    }
}