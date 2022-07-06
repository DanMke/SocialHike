import { USER } from "../actions/actionType";

interface Action {
    type: String,
    payload: any
}

const initialState = {
    user: {name: "teste"}
};

export function userReducer(state = initialState, action: Action) {
    switch(action.type) {
        case USER:
            return {
                ...state, user: action.payload
            };
        default:
            return state;
    };
};
