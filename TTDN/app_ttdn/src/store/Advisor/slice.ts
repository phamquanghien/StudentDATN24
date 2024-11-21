import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";
import { IAdvisor } from "@/models/Advisor.ts";
import { Paginator } from "@/models/Paginator.ts";

export interface AdvisorState {
  advisors: {
    data: IAdvisor[];
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  newAdvisor: {
    data: any;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  updatedAdvisor: {
    data: any;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  deletedAdvisor: {
    data: DeleteApiResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
}

const initialState: AdvisorState = {
  advisors: {
    data: [],
    loading: false,
    error: null,
  },
  newAdvisor: {
    data: null,
    loading: false,
    error: null,
  },
  updatedAdvisor: {
    data: null,
    loading: false,
    error: null,
  },
  deletedAdvisor: {
    data: null,
    loading: false,
    error: null,
  },
};

const advisorSlice = createSlice({
  name: "advisor",
  initialState,
  reducers: {
    getAdvisorsRequest(state, action: PayloadAction<Paginator>) {
      state.advisors.loading = true;
    },
    getAdvisorsSuccess(state, action: PayloadAction<IAdvisor[]>) {
      state.advisors.data = action.payload;
      state.advisors.loading = false;
    },
    getAdvisorsFailure(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.advisors.error = action.payload;
      state.advisors.loading = false;
    },
    createAdvisorRequest(state, action: PayloadAction<IAdvisor>) {
      state.newAdvisor.loading = true;
    },
    createAdvisorSuccess(state, action: PayloadAction<IAdvisor>) {
      state.newAdvisor.data = action.payload;
      state.newAdvisor.loading = false;
    },
    createAdvisorFailure(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.newAdvisor.error = action.payload;
      state.newAdvisor.loading = false;
    },
    updateAdvisorRequest(
      state,
      action: PayloadAction<{ id: number; data: IAdvisor }>,
    ) {
      state.updatedAdvisor.loading = true;
    },
    updateAdvisorSuccess(state, action: PayloadAction<IAdvisor>) {
      state.updatedAdvisor.data = action.payload;
      state.updatedAdvisor.loading = false;
    },
    updateAdvisorFailure(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.updatedAdvisor.error = action.payload;
      state.updatedAdvisor.loading = false;
    },
    deleteAdvisorRequest(state, action: PayloadAction<number>) {
      state.deletedAdvisor.loading = true;
    },
    deleteAdvisorSuccess(state, action: PayloadAction<DeleteApiResponse>) {
      state.deletedAdvisor.data = action.payload;
      state.deletedAdvisor.loading = false;
    },
    deleteAdvisorFailure(state, action: PayloadAction<IAxiosErrorResponse>) {
      state.deletedAdvisor.error = action.payload;
      state.deletedAdvisor.loading = false;
    },
    clearAdvisorResponse(state) {
      state.newAdvisor.data = null;
      state.newAdvisor.error = null;
      state.updatedAdvisor.data = null;
      state.updatedAdvisor.error = null;
      state.deletedAdvisor.data = null;
      state.deletedAdvisor.error = null;
    },
  },
});

export const {
  getAdvisorsRequest,
  getAdvisorsSuccess,
  getAdvisorsFailure,
  deleteAdvisorRequest,
  deleteAdvisorSuccess,
  deleteAdvisorFailure,
  createAdvisorRequest,
  createAdvisorSuccess,
  createAdvisorFailure,
  updateAdvisorRequest,
  updateAdvisorSuccess,
  updateAdvisorFailure,
  clearAdvisorResponse,
} = advisorSlice.actions;
export default advisorSlice.reducer;
