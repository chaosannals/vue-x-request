import AjaxRequester from './requester/ajax';
import JsonpRequester from './requester/jsonp';

export const ajax = new AjaxRequester();
export const jsonp = new JsonpRequester();

export default {
    install(Vue) {
        Vue.prototype.$ajax = ajax;
        Vue.prototype.$jsonp = jsonp;
    }
};