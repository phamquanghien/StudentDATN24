import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiStudentResponse, IStudent } from "@/models/Student.ts";
import {
  DeleteApiResponse,
  IAxiosErrorResponse,
  SuccessMessageResponse,
} from "@/models/Response.ts";
import { Paginator } from "@/models/Paginator.ts";
import { ICompany } from "@/models/Company.ts";
import { Topic } from "@/models/Topic.ts";
import { Score } from "@/models/Score.ts";

export interface StudentState {
  students: {
    data: ApiStudentResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  studentById: {
    data: IStudent | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  newStudent: {
    data: IStudent | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  updatedStudent: {
    data: IStudent | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  subscribeAdvisor: {
    data: SuccessMessageResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  subscribeCompany: {
    data: SuccessMessageResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  subscribeTopic: {
    data: SuccessMessageResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  scores: {
    data: SuccessMessageResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  deletedStudent: {
    data: DeleteApiResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
}

const initialState: StudentState = {
  students: {
    data: null,
    loading: false,
    error: null,
  },
  studentById: {
    data: null,
    loading: false,
    error: null,
  },
  newStudent: {
    data: null,
    loading: false,
    error: null,
  },
  updatedStudent: {
    data: null,
    loading: false,
    error: null,
  },
  subscribeAdvisor: {
    data: null,
    loading: false,
    error: null,
  },
  subscribeCompany: {
    data: null,
    loading: false,
    error: null,
  },
  subscribeTopic: {
    data: null,
    loading: false,
    error: null,
  },
  scores: {
    data: null,
    loading: false,
    error: null,
  },
  deletedStudent: {
    data: null,
    loading: false,
    error: null,
  },
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudentsRequest: (state, action: PayloadAction<Paginator>) => {
      state.students.loading = true;
    },
    getStudentsSuccess: (state, action: PayloadAction<ApiStudentResponse>) => {
      state.students.data = action.payload;
      state.students.loading = false;
    },
    getStudentsFailure: (state, action: PayloadAction<IAxiosErrorResponse>) => {
      state.students.error = action.payload;
      state.students.loading = false;
    },
    getStudentByIdRequest: (state, action: PayloadAction<number>) => {
      state.studentById.loading = true;
    },
    getStudentByIdSuccess: (state, action: PayloadAction<IStudent>) => {
      state.studentById.data = action.payload;
      state.studentById.loading = false;
    },
    getStudentByIdFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.studentById.error = action.payload;
      state.studentById.loading = false;
    },
    createStudentRequest: (state, action: PayloadAction<IStudent>) => {
      state.newStudent.loading = true;
    },
    createStudentSuccess: (state, action: PayloadAction<IStudent>) => {
      state.newStudent.data = action.payload;
      state.newStudent.loading = false;
    },
    createStudentFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.newStudent.error = action.payload;
      state.newStudent.loading = false;
    },
    updateStudentRequest: (
      state,
      action: PayloadAction<{ id: number; data: IStudent }>,
    ) => {
      state.updatedStudent.loading = true;
    },
    updateStudentSuccess: (state, action: PayloadAction<IStudent>) => {
      state.updatedStudent.data = action.payload;
      state.updatedStudent.loading = false;
    },
    updateStudentFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.updatedStudent.error = action.payload;
      state.updatedStudent.loading = false;
    },
    subscribeAdvisorRequest: (
      state,
      action: PayloadAction<{ id: number; advisorId: number }>,
    ) => {
      state.subscribeAdvisor.loading = true;
    },
    subscribeAdvisorSuccess: (
      state,
      action: PayloadAction<SuccessMessageResponse>,
    ) => {
      state.subscribeAdvisor.data = action.payload;
      state.subscribeAdvisor.loading = false;
    },
    subscribeAdvisorFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.subscribeAdvisor.error = action.payload;
      state.subscribeAdvisor.loading = false;
    },
    subscribeCompanyRequest: (
      state,
      action: PayloadAction<{ id: number; company: ICompany }>,
    ) => {
      state.subscribeCompany.loading = true;
    },
    subscribeCompanySuccess: (
      state,
      action: PayloadAction<SuccessMessageResponse>,
    ) => {
      state.subscribeCompany.data = action.payload;
      state.subscribeCompany.loading = false;
    },
    subscribeCompanyFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.subscribeCompany.error = action.payload;
      state.subscribeCompany.loading = false;
    },
    subscribeTopicRequest: (
      state,
      action: PayloadAction<{ id: number; topic: Topic }>,
    ) => {
      state.subscribeTopic.loading = true;
    },
    subscribeTopicSuccess: (
      state,
      action: PayloadAction<SuccessMessageResponse>,
    ) => {
      state.subscribeTopic.data = action.payload;
      state.subscribeTopic.loading = false;
    },
    subscribeTopicFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.subscribeTopic.error = action.payload;
      state.subscribeTopic.loading = false;
    },
    importScoreRequest: (
      state,
      action: PayloadAction<{ id: number; score: Score }>,
    ) => {
      state.scores.loading = true;
    },
    importScoreSuccess: (
      state,
      action: PayloadAction<SuccessMessageResponse>,
    ) => {
      state.scores.data = action.payload;
      state.scores.loading = false;
    },
    importScoreFailure: (state, action: PayloadAction<IAxiosErrorResponse>) => {
      state.scores.error = action.payload;
      state.scores.loading = false;
    },
    deleteStudentRequest: (state, action: PayloadAction<number>) => {
      state.deletedStudent.loading = true;
    },
    deleteStudentSuccess: (state, action: PayloadAction<DeleteApiResponse>) => {
      state.deletedStudent.data = action.payload;
      state.deletedStudent.loading = false;
    },
    deleteStudentFailure: (
      state,
      action: PayloadAction<IAxiosErrorResponse>,
    ) => {
      state.deletedStudent.error = action.payload;
      state.deletedStudent.loading = false;
    },
    clearStudentResponse: (state) => {
      state.newStudent.data = null;
      state.newStudent.error = null;
      state.updatedStudent.data = null;
      state.updatedStudent.error = null;
      state.deletedStudent.data = null;
      state.deletedStudent.error = null;
      state.subscribeAdvisor.data = null;
      state.subscribeAdvisor.error = null;
      state.subscribeCompany.data = null;
      state.subscribeCompany.error = null;
      state.subscribeTopic.data = null;
      state.subscribeTopic.error = null;
      state.scores.data = null;
      state.scores.error = null;
    },
  },
});

export const {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentByIdRequest,
  getStudentByIdSuccess,
  getStudentByIdFailure,
  createStudentRequest,
  createStudentSuccess,
  createStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure,
  subscribeAdvisorRequest,
  subscribeAdvisorSuccess,
  subscribeAdvisorFailure,
  subscribeCompanyRequest,
  subscribeCompanySuccess,
  subscribeCompanyFailure,
  subscribeTopicRequest,
  subscribeTopicSuccess,
  subscribeTopicFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  deleteStudentFailure,
  importScoreRequest,
  importScoreSuccess,
  importScoreFailure,
  clearStudentResponse,
} = studentSlice.actions;

export default studentSlice.reducer;
