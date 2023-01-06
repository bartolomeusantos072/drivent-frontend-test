import useToken from '../useToken';
import useAsync from '../useAsync';
import * as ticketApi from '../../services/ticketApi.js';

export function useTicket() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketLoading,
    error: ticketError,
    act: getTicket
  } = useAsync(() => ticketApi.showTicket(token));
  
  return {
    ticket,
    ticketLoading,
    ticketError,
    getTicket
  };
};

export function useTicketTypes() {
  const token = useToken();

  const {
    data: ticketTypes,
    loading: ticketTypesLoading,
    error: ticketTypesError,
    act: getTicketTypes
  } = useAsync(() => ticketApi.getTicketTypes(token));

  return {
    ticketTypes,
    ticketTypesLoading,
    ticketTypesError,
    getTicketTypes
  };
};

export function usePostTicket() {
  const token = useToken();

  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket
  } = useAsync((data) => ticketApi.saveTicket(data, token), false);

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket
  };
};
