import moment from 'moment';

export const formatDate = (date: string | Date | null) => {
  if (date) {
    const formatedDate = new Date(date);
    return moment(formatedDate).format('YYYY-MM-DD');
  } else {
    return null;
  }
};

export const formatDateVi = (date: string | Date | null) => {
  if (date) {
    const formatedDate = new Date(date);
    return moment(formatedDate).format('DD/MM/YYYY');
  } else {
    return null;
  }
};
