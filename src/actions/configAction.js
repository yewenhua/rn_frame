'use strict';

import * as TYPES from './actionTypes';

export function update_base_url (value = '') {
    return {
        type    : TYPES.UPDATE_BASE_URL,
        payload : value
    }
}
export function update_map_key (value = '') {
    return {
        type    : TYPES.UPDATE_MAP_KEY,
        payload : value
    }
}