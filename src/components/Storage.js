import React, {
    AsyncStorage
}from 'react-native';

var Storage = {
    /**
     * 获取
     * @param key
     * @returns {Promise<T>|*|Promise.<TResult>}
     */

    get: async (key) =>{
        try {
            var value = await AsyncStorage.getItem(key);
            var jsonValue = JSON.parse(value);
            return jsonValue;
        }
        catch (error){
            return null;
        }
    },


    /**
     * 保存
     * @param key
     * @param value
     * @returns {*}
     */
    save: async (key, value) =>{
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        catch (error){
            return false;
        }
    },


    /**
     * 更新
     * @param key
     * @param value
     * @returns {Promise<T>|Promise.<TResult>}
     */
    update: async (key, value) =>{
        try {
            var item = await AsyncStorage.getItem(key);
            value = typeof value === 'string' ? value : Object.assign({}, item, value);
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        catch (error){
            return false;
        }
    },


    /**
     * 更新
     * @param key
     * @returns {*}
     */
    delete: async (key) =>{
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (error){
            return false;
        }
    }
}

export default Storage;