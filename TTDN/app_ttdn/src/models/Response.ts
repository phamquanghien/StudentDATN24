import { AxiosError } from 'axios';

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
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}
