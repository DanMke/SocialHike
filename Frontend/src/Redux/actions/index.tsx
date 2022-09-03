import { USER_DATA } from './actionType';

export function updateUser(payload: Object) {
    return {
        type: USER_DATA,
        payload: payload,
    };
}
