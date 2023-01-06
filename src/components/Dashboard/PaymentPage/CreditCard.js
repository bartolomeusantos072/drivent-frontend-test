import React from 'react';
import Cards from 'react-credit-cards';
import creditCardType from 'credit-card-type';
import styled from 'styled-components';

import 'react-credit-cards/es/styles-compiled.css';
import { usePostPayment } from '../../../hooks/api/usePayment';

export function CreditCard({ ticketId }) {
  const [creditCardData, setCreditCardData] = React.useState({
    cvc: '',
    expiry: '',
    number: '',
    name: '',
    focus: ''
  });
  const { makePayment } = usePostPayment();
  const card = creditCardType(creditCardData.number);
  const cardData = {
    issuer: card[0].niceType,
    number: Number(creditCardData.number),
    name: creditCardData.name,
    expirationDate: creditCardData.expiry.substring(0, 2) + '/20' + creditCardData.expiry.substring(2),
    cvv: Number(creditCardData.cvc),
  };

  function handleOnChangeInput(ev) {
    setCreditCardData({
      ...creditCardData, [ev.target.name]: ev.target.value,
    });
  }

  function handleInputFocus(ev) {
    setCreditCardData({
      ...creditCardData, focus: ev.target.name });
  }

  function finalizePayment(ev) {
    ev.preventDefault();
    makePayment({
      ticketId,
      cardData: cardData
    });
    window.location.reload();
  }

  return (
    <>
      <StyledFormOfPayment>
        <h2>Pagamento</h2>
        <StyledCreditCardDiv id='PaymentForm'>
          <Cards
            cvc={creditCardData.cvc}
            expiry={creditCardData.expiry}
            focused={creditCardData.focus}
            name={creditCardData.name}
            number={creditCardData.number}
          />
          <form onSubmit={finalizePayment}>
            <input 
              type='tel' 
              name='number'
              placeholder='Card Number'
              maxLength='16'
              onChange={handleOnChangeInput}
              onFocus={handleInputFocus}
            />
            <input 
              type='tel' 
              name='name'
              placeholder='Name'
              maxLength='40'
              onChange={handleOnChangeInput}
              onFocus={handleInputFocus}
            />
            <StyledInputsCreditData>
              <CreditDate 
                type='tel' 
                name='expiry'
                placeholder='Valid Thru'
                maxLength='4'
                onChange={handleOnChangeInput}
                onFocus={handleInputFocus}
              />
              <CreditCvc 
                type='tel' 
                name='cvc'
                placeholder='CVC'
                maxLength='4'
                onChange={handleOnChangeInput}
                onFocus={handleInputFocus}
              />
            </StyledInputsCreditData>
            <FormButton type='submit'>FINALIZAR PAGAMENTO</FormButton>
          </form>
        </StyledCreditCardDiv>
      </StyledFormOfPayment>

    </>
  );
}

const StyledFormOfPayment = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const StyledCreditCardDiv = styled.div`
  display: flex;
  input {
    height: 45px;
    width: 60%;
    margin: 0 30px;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 0.5px solid #E0E0E0;
    font-size: 20px;

    ::placeholder {
      font-size: 20px;
      padding: 5px;
      font-weight: 500;
    }
  }
`;

const FormButton = styled.button`
  width: 190px;
  height: 40px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  background-color: #E0E0E0;
  border: none;
  border-radius: 4px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.2);
  margin-top: 60px;
  position: absolute;
  left: 0;
`;

const StyledInputsCreditData = styled.div`
  width: 100%;
  margin: 0 30px;
`;

const CreditDate = styled.input`
  width: 30% !important;
  margin: 0 !important;
  margin-right: 10% !important;
`;

const CreditCvc = styled.input`
  width: 20% !important;
  margin: 0 !important;

`;
