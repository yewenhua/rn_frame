import * as types from '../actions/actionTypes';

const initialState = {
    baseurl: 'https://wl.voc.so',
    mapkey: '2XKBZ-UFYH6-JE5SC-MY3VY-AWUBT-ODFAB'
};

export default function configState(state=initialState, action){
    switch (action.type){
        case types.UPDATE_BASE_URL:
            return Object.assign({}, state, {
                baseurl: action.payload
            });
        case types.UPDATE_MAP_KEY:
            return Object.assign({}, state, {
                mapkey: action.payload
            });

        default:
            return state;
    }
}
