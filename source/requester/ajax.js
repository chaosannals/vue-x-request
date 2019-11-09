import axios from 'axios';
import qs from 'qs';
import lodash from 'lodash';

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
    get(url, query, config) {
        let path = url;
        let matches = url.match(/(.+?)(?:\?)(.+)/);
        if (lodash.isNil(query)) {
            query = {};
        }
        if (!lodash.isNull(matches)) {
            path = matches[1];
            query = {
                ...qs.parse(matches[2]),
                ...query,
            };
        }
        if (!lodash.isEmpty(query)) {
            url = path + '?' + qs.stringify(query);
        }
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