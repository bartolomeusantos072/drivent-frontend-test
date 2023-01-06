import styled from 'styled-components';

import verified from '../../../assets/images/Vector.svg';

export function CardPaid() {
  return (
    <>
      <StyledFormOfPayment>
        <h2>Pagamento</h2>
        <div>
          <img src={verified} alt='verificado'/>
          <PaymentConfirmMessage>
            <span>Pagamento confirmado!</span>
            <p>Prossiga para escolha de hospedagem e atividades</p>
          </PaymentConfirmMessage>
        </div>
      </StyledFormOfPayment>
    </>
  );
};

const StyledFormOfPayment = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > div {
    display: flex;
  }
`;

const PaymentConfirmMessage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 15px;
  
  span {
    font-weight: 700;
  }

  p {
    font-weight: 400;
  }
`;
