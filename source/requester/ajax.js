import axios from 'axios';

/**
 * ajax 封装
 * 
 */
export default class AjaxRequester {
    /**
     * 
     */
    constructor() {
        this.axios = axios.create({
            timeout: 30000,
        });
    }

    /**
     * 
     * @param {*} url 
     * @param {*} config 
     */
    get(url, config) {
        return this.axios.get(url, config);
    }

    /**
     * 
     * @param {*} url 
     * @param {*} data 
     * @param {*} config 
     */
    post(url, data, config) {
        return this.axios.post(url, data, config);
    }

    /**
     * 
     * @param {*} url 
     * @param {*} data 
     * @param {*} config 
     */
    upload(url, data, config) {
        let sheet = new FormData();
        for (let key in data) {
            sheet.append(key, data[key]);
        }
        return this.axios.post(url, sheet, config);
    }

    /**
     * 
     * @param {} config 
     */
    request(config) {
        return this.request(config);
    }
}