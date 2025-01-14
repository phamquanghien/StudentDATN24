import { AxiosError } from "axios";

export interface IDeleteResponse {
  success: boolean;
  message: string;
}

export interface IAxiosErrorResponse extends AxiosError<IDeleteResponse> {}

export interface ApiResponse<T> {
  success: boolean;
  result: T;
}

export interface ApiResponsePagination<T> {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  items: T[];
}

export interface DeleteApiResponse {
  success: boolean;
  message: string;
}

export interface SuccessMessageResponse {
  success: boolean;
  message: string;
}
