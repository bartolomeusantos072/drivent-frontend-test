import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { PaymentStatus } from '../../../components/Dashboard/PaymentPage/paymentStatus';
import { useTicket } from '../../../hooks/api/useTicket';
import { RenderTicketModalities } from '../../../components/Dashboard/PaymentPage/renderTicketModalities';
import useEnrollment from '../../../hooks/api/useEnrollment';
import { useTicketTypes } from '../../../hooks/api/useTicket.js';

export default function Payment() {
  const [paymentStatusName, setPaymentStatusName] = useState('');
  const [price, setPrice] = useState(0);
  const [ticketModality, setTicketModality] = useState({});
  const [hospitalityModality, setHospitalityModality] = useState({});
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket();

  useEffect(() => {
    if (ticket) {
      if (ticket.TicketType.isRemote) {
        setPaymentStatusName(ticket.TicketType.name);
        setPrice('R$ ' + (ticket.TicketType.price / 100));
      } else if (!ticket.TicketType.isRemote) {
        setPaymentStatusName(ticket.TicketType.name);
        setPrice('R$ ' + (ticket.TicketType.price / 100));
      } else {
        setPaymentStatusName(ticket.TicketType.name);
        setPrice('R$ ' + (ticket.TicketType.price / 100));
      }
    }
  }, [ticket]);

  return (
    <>
      <StyledTypography variant='h4'>Ingresso e pagamento</StyledTypography>
      <StyledDiv>
        {(!enrollment || !ticketTypes) ?
          <h1>
            Você precisa completar sua inscrição antes <br />de prosseguir pra escolha de ingresso
          </h1>
          :
          (ticket ?
            <PaymentStatus paymentStatusName={paymentStatusName} price={price} status={ticket.status} ticketId={ticket.id} />
            :
            <Content>
              <Line>
                <RenderTicketModalities ticketModality={ticketModality} setTicketModality={setTicketModality} hospitalityModality={hospitalityModality} setHospitalityModality={setHospitalityModality} />
              </Line>
            </Content>
          )
        }
      </StyledDiv>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom:20px!important;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 35px;
  color: #8E8E8E;
  font-size: 20px;
  margin-bottom: 20px;

  & > h1 {
    margin: 243px auto auto 183px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 23px;
  }
`;

const Content = styled.div`
  h1 {
    margin-bottom: 35px;
    font-size: 35px;
  }
  h2 {
    margin-bottom: 15px;
    color: #8E8E8E;
    font-size: 20px;
  }
`;

const Line = styled.div`
  display: flex;
`;
