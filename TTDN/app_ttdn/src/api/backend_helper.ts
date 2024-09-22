import { Paginator } from '../models/Paginator';
import { get, post, put, del, getAddress } from './api_helper';
import * as url from './url_helper';
import { AuthType } from '../models/Auth';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const config_upload_file = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const authenticator = {
  withCredentials: true,
};

//-------------------------------------------------------------------------------------------------------->

export const login = (data: AuthType) => post(url.LOGIN, data, authenticator);
