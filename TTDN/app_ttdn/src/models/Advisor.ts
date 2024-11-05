import { IDepartment } from "@/models/Department.ts";

export interface IAdvisor {
  id: number;
  code: string;
  name: string;
  address: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  departmentID: number;
  department: IDepartment;
}
