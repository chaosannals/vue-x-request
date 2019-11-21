import lodash from 'lodash';
import uuidv4 from 'uuid/v4';

/**
 * 套接字
 * 
 */
export default class Socket {
    /**
     * 初始化。
     * 
     * @param {*}} retryMaxTimes 
     */
    constructor(retryMaxTimes) {
        this.messages = [];
        this.callbacks = {};
        this.retryTimes = 0;
        this.retryMaxTimes = retryMaxTimes;
    }

    /**
     * 连接。
     * 
     * @param {*} url
     * @param {*} outtime 
     */
    connect(url, outtime) {
        if (!url || lodash.isNumber(url)) {
            let pattern = /(https?):\/\/(.+?)(:\d+)?\/.*/;
            let replacement = `ws://$2:${url || 21214}/`;
            url = window.location.href.replace(pattern, replacement);
        }
        this.handler = new WebSocket(url);
        let onOpen = () => {
            for (let message of this.messages) {
                this.handler.send(message);
            }
        };
        let onError = () => {
            this.handler.removeEventListener('error', onError);
            if (this.retryMax > this.retryCount++) {
                setTimeout(() => this.connect(url, outtime), outtime || 2000);
            }
        };
        let onClose = () => {
            for (let id in this.callbacks) {
                this.detach(id);
            }
            this.handler.removeEventListener('open', onOpen);
            this.handler.removeEventListener('error', onError);
            this.handler.removeEventListener('close', onClose);
        };
        this.handler.addEventListener('open', onOpen);
        this.handler.addEventListener('close', onClose);
        this.handler.addEventListener('error', onError);
    }

    /**
     * 发送信息。
     * 
     * @param {*} message 
     */
    send(message) {
        if (this.handler.readyState == WebSocket.OPEN) {
            this.handler.send(message);
        } else {
            this.messages.push(message);
        }
    }

    /**
     * 关闭。
     * 
     */
    close() {
        this.handler.close();
    }

    /**
     * 添加监听事件。
     * 
     * @param {*} callback 
     */
    attach(callback) {
        let id = uuidv4();
        this.callbacks[id] = callback;
        this.handler.addEventListener('message', callback);
        return id;
    }

    /**
     * 删除监听事件。
     * 
     * @param {*} id 
     */
    detach(id) {
        let callback = this.callbacks[id];
        this.handler.removeEventListener('message', callback);
        delete this.callbacks[id];
        return callback;
    }
}

/**
 * 
 */
export class SocketRequester {
    constructor() {
        this.all = {};
    }

    /**
     * 连接
     * 
     * @param {*} name 
     * @param {*} url 
     * @param {*} outtime 
     */
    connect(name, url, outtime) {
        let socket = new Socket;
        this.all[name] = socket;
        socket.connect(url, outtime);
    }

    /**
     * 发送。
     * 
     * @param {*} name 
     * @param {*} message 
     */
    send(name, message) {
        let socket = this.all[name];
        return socket.send(message);
    }
}