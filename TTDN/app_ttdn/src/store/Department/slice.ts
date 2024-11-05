import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDepartment } from "@/models/Department.ts";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";

export interface DepartmentState {
  departments: {
    data: IDepartment[] | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  newDepartment: {
    data: IDepartment | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  updatedDepartment: {
    data: IDepartment | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  deleteDepartment: {
    data: DeleteApiResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
}

const initialState: DepartmentState = {
  departments: {
    data: null,
    loading: false,
    error: null,
  },
  newDepartment: {
    data: null,
    loading: false,
    error: null,
  },
  updatedDepartment: {
    data: null,
    loading: false,
    error: null,
  },
  deleteDepartment: {
    data: null,
    loading: false,
    error: null,
  },
};

const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {
    getDepartments(state) {
      state.departments.loading = true;
    },
    getDepartmentsSuccess(state, action: PayloadAction<IDepartment[]>) {
      state.departments.data = action.payload;
      state.departments.loading = false;
    },
    getDepartmentsFailed(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.departments.loading = false;
      state.departments.error = action.payload;
    },
    createDepartmentRequest(state, action: PayloadAction<any>) {
      state.newDepartment.loading = true;
    },
    createDepartmentSuccess(state, action: PayloadAction<IDepartment>) {
      state.newDepartment.data = action.payload;
      state.newDepartment.loading = false;
    },
    createDepartmentFailed(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.newDepartment.loading = false;
      state.newDepartment.error = action.payload;
    },
    updateDepartmentRequest(
      state,
      action: PayloadAction<{ id: number; data: IDepartment }>,
    ) {
      state.updatedDepartment.loading = true;
    },
    updateDepartmentSuccess(state, action: PayloadAction<IDepartment>) {
      state.updatedDepartment.data = action.payload;
      state.updatedDepartment.loading = false;
    },
    updateDepartmentFailed(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.updatedDepartment.loading = false;
      state.updatedDepartment.error = action.payload;
    },
    deleteDepartmentRequest(state, action: PayloadAction<number>) {
      state.deleteDepartment.loading = true;
    },
    deleteDepartmentSuccess(state, action: PayloadAction<DeleteApiResponse>) {
      state.deleteDepartment.data = action.payload;
      state.deleteDepartment.loading = false;
    },
    deleteDepartmentFailed(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.deleteDepartment.loading = false;
      state.deleteDepartment.error = action.payload;
    },
    clearDepartmentAction(state) {
      state.newDepartment.data = null;
      state.newDepartment.error = null;
      state.updatedDepartment.data = null;
      state.updatedDepartment.error = null;
      state.deleteDepartment.data = null;
      state.deleteDepartment.error = null;
    },
  },
});

export const {
  getDepartments,
  getDepartmentsSuccess,
  getDepartmentsFailed,
  createDepartmentRequest,
  createDepartmentSuccess,
  createDepartmentFailed,
  updateDepartmentRequest,
  updateDepartmentSuccess,
  updateDepartmentFailed,
  deleteDepartmentRequest,
  deleteDepartmentSuccess,
  deleteDepartmentFailed,
  clearDepartmentAction,
} = departmentSlice.actions;
export default departmentSlice.reducer;
