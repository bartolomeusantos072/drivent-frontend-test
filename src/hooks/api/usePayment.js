import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export function usePostPayment() {
  const token = useToken();
  
  const {
    loading: makePaymentLoading,
    error: makePaymentError,
    act: makePayment
  } = useAsync((data) => paymentApi.makePayment(data, token), false);

  return {
    makePaymentLoading,
    makePaymentError,
    makePayment
  };
};
