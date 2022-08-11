import { AxiosError } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

export const handleError = (err: AxiosError) => {
  const {response} = err;

  if (response) {
    switch (response.status) {
      case StatusCodes.BAD_REQUEST:
        toast.error(response.data.error);
        break;
      default:
        toast.error('Sorry, something went wrong. Try again');
    }
  }
};
