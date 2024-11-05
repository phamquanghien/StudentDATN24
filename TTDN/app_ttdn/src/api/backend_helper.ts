import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";
import { AuthType } from "../models/Auth";
import { IDepartment } from "@/models/Department.ts";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const config_upload_file = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

export const authenticator = {
  withCredentials: true,
};

//-------------------------------------------------------------------------------------------------------->

export const login = (data: AuthType) => post(url.LOGIN, data, authenticator);

//Bộ môn
export const getDepartments = () => get(url.DEPARTMENT, authenticator);
export const createDepartment = (data: IDepartment) =>
  post(url.DEPARTMENT, data, authenticator);
export const updateDepartment = (id: number, data: IDepartment) =>
  put(`${url.DEPARTMENT}/${id}`, data, authenticator);
export const deleteDepartment = (id: number) =>
  del(`${url.DEPARTMENT}/${id}`, authenticator);

//Giảng viên hướng dẫn
export const getAdvisors = () => get(url.ADVISOR, authenticator);
