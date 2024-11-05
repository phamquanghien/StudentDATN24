import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";
import { IAdvisor } from "@/models/Advisor.ts";

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
    getAdvisorsRequest(state) {
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
  },
});

export const { getAdvisorsRequest, getAdvisorsSuccess, getAdvisorsFailure } =
  advisorSlice.actions;
export default advisorSlice.reducer;
