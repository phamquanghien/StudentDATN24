import { IAddress } from '../models/Address';

export const formatAddress = ({
  details,
  commune,
  district,
  province,
}: IAddress) => {
  return `${details ? details + ', ' : ''}${commune ? commune + ', ' : ''}${
    district ? district + ', ' : ''
  }${province ? province : ''}`;
};
