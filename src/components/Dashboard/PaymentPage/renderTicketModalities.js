import styled from 'styled-components';
import { useEffect } from 'react';
import { RenderHospitalityModalities } from './renderHospitalityModalities';
import { useTicketTypes } from '../../../hooks/api/useTicket';
import { usePostTicket } from '../../../hooks/api/useTicket';

export function RenderTicketModalities({ ticketModality, setTicketModality, hospitalityModality, setHospitalityModality }) {
  const { saveTicket } = usePostTicket();
  const { ticketTypes } = useTicketTypes();
  useEffect(() => {
  }, []);

  function selectButton(option, alreadyClicked) {
    if (alreadyClicked === option) {
      setTicketModality({});
    } else {
      setTicketModality(option);
    }
    if (option.isRemote) {
      setHospitalityModality({});
    }
    return;
  };

  function clickButtonAction() {
    saveTicket({ ticketTypeId: ticketModality.id });
    window.location.reload();
  }

  return (ticketTypes ?
    <Content>
      <h2>Primeiro, escolha sua modalidade de ingresso</h2>
      <Line>
        {ticketTypes.map(type => (
          type.name === 'Online' && type === ticketModality ?
            <OptionChosen onClick={() => selectButton(type, ticketModality)}>
              <h1>Online</h1>
              <h2>R$ {type.price / 100}</h2>
            </OptionChosen>
            : type.name === 'Online' && type !== ticketModality ?
              <Option onClick={() => selectButton(type, ticketModality)}>
                <h1>Online</h1>
                <h2>R$ {type.price / 100}</h2>
              </Option>
              : type.name === 'Presencial + Sem Hotel' && type === ticketModality ?
                <OptionChosen onClick={() => selectButton(type, ticketModality)}>
                  <h1>Presencial</h1>
                  <h2>R$ {type.price / 100}</h2>
                </OptionChosen>
                : type.name === 'Presencial + Sem Hotel' && type !== ticketModality ?
                  <Option onClick={() => selectButton(type, ticketModality)}>
                    <h1>Presencial</h1>
                    <h2>R$ {type.price / 100}</h2>
                  </Option>
                  :
                  <>
                  </>
        )
        )}
      </Line>
      {ticketModality.isRemote === true ?
        <>
          <h2>Fechado! O total ficou em <strong>R$ {(ticketModality.price) / 100}</strong>. Agora é só confirmar:</h2>
          <Button onClick={clickButtonAction}>RESERVAR INGRESSO</Button>
        </> : ticketModality.isRemote === false ?
          <>
            <RenderHospitalityModalities ticketTypes={ticketTypes} ticketModality={ticketModality} setTicketModality={setTicketModality} hospitalityModality={hospitalityModality} setHospitalityModality={setHospitalityModality} />
          </> :
          <></>}
    </Content>
    : <></>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;

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

const Option = styled.div`
  height: 145px;
  width: 145px;
  margin-right: 25px;
  margin-bottom: 15px;
  border: 1px solid #CECECE;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  h1 {
    font-size: 16px;
    color: #454545;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 14px;
    color: #898989;
  }
`;

const OptionChosen = styled.div`
  height: 145px;
  width: 145px;
  margin-right: 25px;
  margin-bottom: 15px;
  background-color: #FFEED2;
  border: 1px solid #CECECE;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;

  h1 {
    font-size: 16px;
    color: #454545;
    margin-bottom: 5px;
  }

  h2 {
    font-size: 14px;
    color: #898989;
  }
`;

const Line = styled.div`
  display: flex;
  flex-direction: row;
`;

const Button = styled.div`
  width: 162px;
  height: 37px;
  background-color: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
`;
