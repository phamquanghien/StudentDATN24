import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper";
import { AuthType } from "@/models/Auth";
import { IDepartment } from "@/models/Department.ts";
import { IAdvisor } from "@/models/Advisor.ts";
import { IStudent } from "@/models/Student.ts";
import { Paginator } from "@/models/Paginator.ts";
import { ICompany } from "@/models/Company.ts";
import { Topic } from "@/models/Topic.ts";
import { ICouncil, PayloadCouncil } from "@/models/Council.ts";
import { Score } from "@/models/Score.ts";

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
export const getAdvisors = (query: Paginator) =>
  get(url.ADVISOR, {
    params: query,
    ...config,
  });
export const createAdvisor = (data: IAdvisor) =>
  post(url.ADVISOR, data, authenticator);
export const updateAdvisor = (id: number, data: IAdvisor) =>
  put(`${url.ADVISOR}/${id}`, data, authenticator);
export const deleteAdvisor = (id: number) =>
  del(`${url.ADVISOR}/${id}`, authenticator);

//Sinh viên
export const getStudents = (query: Paginator) =>
  get(url.STUDENT, {
    params: query,
    ...config,
  });
export const getStudentById = (id: number) =>
  get(`${url.STUDENT}/${id}`, authenticator);
export const createStudent = (data: IStudent) =>
  post(url.STUDENT, data, authenticator);
export const updateStudent = (id: number, data: IStudent) =>
  put(`${url.STUDENT}/${id}`, data, authenticator);
export const subscribeAdvisor = (id: number, advisorId: number) =>
  put(`${url.STUDENT}/${id}/advisor?advisorId=${advisorId}`, config);
export const subscribeCompany = (id: number, company: ICompany) =>
  put(`${url.STUDENT}/${id}/company`, company, config);
export const subscribeTopic = (id: number, topic: Topic) =>
  put(`${url.STUDENT}/${id}/topic`, topic, config);

export const importScore = (id: number, score: Score) =>
  put(`${url.STUDENT}/${id}/score`, score, config);

export const deleteStudent = (id: number) =>
  del(`${url.STUDENT}/${id}`, authenticator);

// Hội đồng
export const getCouncils = () => get(url.COUNCIL, authenticator);
export const getCouncilsByDepartmentId = (departmentId: number) =>
  get(`${url.COUNCIL}/department/${departmentId}`, authenticator);

export const createCouncil = (data: PayloadCouncil) =>
  post(url.COUNCIL, data, authenticator);

export const updateCouncil = (id: number, data: ICouncil) =>
  put(`${url.COUNCIL}/${id}`, data, authenticator);

export const deleteCouncil = (id: number) =>
  del(`${url.COUNCIL}/${id}`, authenticator);

//Thống kê
export const getDashboard = (query: any) =>
  get(url.DASHBOARD, {
    params: query,
    ...config,
  });

export const getRatio = (query: any) =>
  get(url.RATIO, {
    params: query,
    ...config,
  });

export const getColumns = (query: any) =>
  get(url.COLUMNS, {
    params: query,
    ...config,
  });
