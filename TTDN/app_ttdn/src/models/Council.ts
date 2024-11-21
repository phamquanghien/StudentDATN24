export interface ICouncil {
  id: number;
  name: string;
  description: string;
  reviewTime: string; // ISO 8601 date string
  location: string;
  departmentID: number;
  department: {
    id: number;
    name: string;
    code: string;
  };
  students: Array<{
    id: number;
    name: string;
    code: string;
  }>;
  advisors: Array<{
    id: number;
    name: string;
    code: string;
  }>;
}

export interface PayloadCouncil {
  name: string;
  reviewTime: string;
  location: string;
  departmentID: number;
  studentIds: number[];
  advisorIds: number[];
}
