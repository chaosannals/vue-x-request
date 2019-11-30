import AjaxRequester from './requester/ajax';
import JsonpRequester from './requester/jsonp';
import ScriptRequester from './requester/script';
import { SocketRequester } from './requester/socket';

export const ajax = new AjaxRequester();
export const jsonp = new JsonpRequester();
export const script = new ScriptRequester();
export const socket = new SocketRequester();

export default {
    install(Vue) {
        Vue.prototype.$ajax = ajax;
        Vue.prototype.$jsonp = jsonp;
        Vue.prototype.$script = script;
        Vue.prototype.$socket = socket;
    }
};