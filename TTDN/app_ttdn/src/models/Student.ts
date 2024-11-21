import { ApiResponsePagination } from "@/models/Response.ts";
import { Topic } from "@/models/Topic.ts";
import { IAdvisor } from "@/models/Advisor.ts";
import { IDepartment } from "@/models/Department.ts";
import { ICompany } from "@/models/Company.ts";
import { ICouncil } from "@/models/Council.ts";

export interface IStudent {
  id?: number;
  code: string;
  name: string;
  address: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  class: string;
  course: string;
  departmentID?: number;
  department?: IDepartment;
  advisorID?: number;
  advisor?: IAdvisor;
  companyID?: number;
  company?: ICompany;
  topicID?: number;
  topic?: Topic;
  status: string;
  description: string;
  startDate: string;
  endDate: string;
  councilID?: number;
  council?: ICouncil;
  firstScore?: number;
  secondScore?: number;
  thirdScore?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiStudentResponse extends ApiResponsePagination<IStudent> {
  counts: { label: string; count: number }[];
}
