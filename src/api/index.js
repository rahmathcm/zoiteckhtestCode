import {get, post, put, _del} from './networkUtils';

export const login = PAYLOAD => post('', PAYLOAD, false);
