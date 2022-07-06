import { USER } from './actionType';

export function updateUser(payload: Object) {
    return {
        type: USER,
        payload: payload,
    };
}
