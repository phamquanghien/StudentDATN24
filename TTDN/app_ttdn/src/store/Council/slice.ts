import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteApiResponse, IAxiosErrorResponse } from "@/models/Response.ts";
import { ICouncil, PayloadCouncil } from "@/models/Council.ts";

export interface CouncilState {
  councils: {
    data: ICouncil[];
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  newCouncil: {
    data: ICouncil | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  updateCouncil: {
    data: ICouncil | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  deleteCouncil: {
    data: DeleteApiResponse | null;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
}

const initialState: CouncilState = {
  councils: {
    data: [],
    loading: false,
    error: null,
  },
  newCouncil: {
    data: null,
    loading: false,
    error: null,
  },
  updateCouncil: {
    data: null,
    loading: false,
    error: null,
  },
  deleteCouncil: {
    data: null,
    loading: false,
    error: null,
  },
};

const councilSlice = createSlice({
  name: "council",
  initialState,
  reducers: {
    getCouncilsRequest: (state) => {
      state.councils.loading = true;
    },
    getCouncilsSuccess: (state, action) => {
      state.councils.loading = false;
      state.councils.data = action.payload;
    },
    getCouncilsFailure: (state, action) => {
      state.councils.loading = false;
      state.councils.error = action.payload;
    },
    createNewCouncilRequest: (state, action: PayloadAction<PayloadCouncil>) => {
      state.newCouncil.loading = true;
    },
    createNewCouncilSuccess: (state, action) => {
      state.newCouncil.loading = false;
      state.newCouncil.data = action.payload;
    },
    createNewCouncilFailure: (state, action) => {
      state.newCouncil.loading = false;
      state.newCouncil.error = action.payload;
    },
    updateCouncilRequest: (state) => {
      state.updateCouncil.loading = true;
    },
    updateCouncilSuccess: (state, action) => {
      state.updateCouncil.loading = false;
      state.updateCouncil.data = action.payload;
    },
    updateCouncilFailure: (state, action) => {
      state.updateCouncil.loading = false;
      state.updateCouncil.error = action.payload;
    },
    deleteCouncilRequest: (state, action: PayloadAction<number>) => {
      state.deleteCouncil.loading = true;
    },
    deleteCouncilSuccess: (state, action) => {
      state.deleteCouncil.loading = false;
      state.deleteCouncil.data = action.payload;
    },
    deleteCouncilFailure: (state, action) => {
      state.deleteCouncil.loading = false;
      state.deleteCouncil.error = action.payload;
    },
    clearCouncilResponse: (state) => {
      state.newCouncil.data = null;
      state.newCouncil.error = null;
      state.updateCouncil.data = null;
      state.updateCouncil.error = null;
      state.deleteCouncil.data = null;
      state.deleteCouncil.error = null;
    },
  },
});

export const {
  getCouncilsRequest,
  getCouncilsSuccess,
  getCouncilsFailure,
  createNewCouncilRequest,
  createNewCouncilSuccess,
  createNewCouncilFailure,
  updateCouncilRequest,
  updateCouncilSuccess,
  updateCouncilFailure,
  deleteCouncilRequest,
  deleteCouncilSuccess,
  deleteCouncilFailure,
  clearCouncilResponse,
} = councilSlice.actions;

export default councilSlice.reducer;
