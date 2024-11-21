import { createSlice } from "@reduxjs/toolkit";
import { IAxiosErrorResponse } from "@/models/Response.ts";

export interface DashboardState {
  counts: {
    data: any;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  ratios: {
    data: any;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
  columnChart: {
    data: any;
    loading: boolean;
    error: IAxiosErrorResponse | null;
  };
}

const initialState: DashboardState = {
  counts: {
    data: null,
    loading: false,
    error: null,
  },
  ratios: {
    data: null,
    loading: false,
    error: null,
  },
  columnChart: {
    data: null,
    loading: false,
    error: null,
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    getCountsRequest: (state) => {
      state.counts.loading = true;
    },
    getCountsSuccess: (state, action) => {
      state.counts.data = action.payload;
      state.counts.loading = false;
      state.counts.error = null;
    },
    getCountsFailure: (state, action) => {
      state.counts.loading = false;
      state.counts.error = action.payload;
    },
    getRatiosRequest: (state) => {
      state.ratios.loading = true;
    },
    getRatiosSuccess: (state, action) => {
      state.ratios.data = action.payload;
      state.ratios.loading = false;
      state.ratios.error = null;
    },
    getRatiosFailure: (state, action) => {
      state.ratios.loading = false;
      state.ratios.error = action.payload;
    },
    getColumnChartRequest: (state) => {
      state.columnChart.loading = true;
    },
    getColumnChartSuccess: (state, action) => {
      state.columnChart.data = action.payload;
      state.columnChart.loading = false;
      state.columnChart.error = null;
    },
    getColumnChartFailure: (state, action) => {
      state.columnChart.loading = false;
      state.columnChart.error = action.payload;
    },
  },
});

export const {
  getCountsRequest,
  getCountsSuccess,
  getCountsFailure,
  getRatiosRequest,
  getRatiosSuccess,
  getRatiosFailure,
  getColumnChartRequest,
  getColumnChartSuccess,
  getColumnChartFailure,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
