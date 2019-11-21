import AjaxRequester from './requester/ajax';
import JsonpRequester from './requester/jsonp';
import { SocketRequester } from './requester/socket';

export const ajax = new AjaxRequester();
export const jsonp = new JsonpRequester();
export const socket = new SocketRequester();

export default {
    install(Vue) {
        Vue.prototype.$ajax = ajax;
        Vue.prototype.$jsonp = jsonp;
        Vue.prototype.$socket = socket;
    }
};