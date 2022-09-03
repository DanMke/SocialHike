import { USER_DATA } from "../actions/actionType";

interface Action {
    type: String,
    payload: any
}

const initialState = {
    user: null
};

export function userReducer(state = initialState, action: Action) {
    switch(action.type) {
        case USER_DATA:
            return {
                ...state, user: action.payload
            };
        default:
            return state;
    };
};
