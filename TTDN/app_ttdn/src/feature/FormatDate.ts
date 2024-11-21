import moment from "moment";
import dayjs from "dayjs";

export const formatDateVi = (date: string | Date | null) => {
  if (date) {
    const formatedDate = new Date(date);
    return moment(formatedDate).format("DD/MM/YYYY");
  } else {
    return null;
  }
};

export const formatDate = (date: string | null | undefined) => {
  if (date) return dayjs(date).format("DD/MM/YYYY");
  return null;
};

export const formatDateTime = (date: string) => {
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ss");
};

export const formatDateTimeVi = (date: string | undefined) => {
  if (date) return dayjs(date).format("DD/MM/YYYY HH:mm");
  return null;
};
