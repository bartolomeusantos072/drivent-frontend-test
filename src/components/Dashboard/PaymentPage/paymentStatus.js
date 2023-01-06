import styled from 'styled-components';
import { CardPaid } from './CardPaid';
import { CreditCard } from './CreditCard';
export function PaymentStatus({ paymentStatusName, price, status, ticketId }) {
  // eslint-disable-next-line no-console
  console.log(status);
  return (
    <>
      <StyledBlock>
        <h2>Ingresso escolhido</h2>
        <StyledStatus>
          <span>{paymentStatusName}</span>
          <p>{price}</p>
        </StyledStatus>
        {status === 'RESERVED' ?
          <CreditCard ticketId={ticketId} /> 
          : 
          <CardPaid />}
      </StyledBlock>
    </>
  );
}

const StyledBlock = styled.div`
  width: 100%;
`;

const StyledStatus = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  width: 18vw;
  height: 10vh;
  background-color: #FFEED2;

  p {
      font-size: 14px;
      color: #898989;
    }

    span {
      font-size: 16px;
      color: #454545;
      line-height: 150%;
    }
`;

