import styled from 'styled-components';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useState } from 'react';
import { useActivityLocation, useActivity } from '../../../hooks/api/useActivity';
import { useTicket } from '../../../hooks/api/useTicket';
dayjs.extend(weekday);

export default function RenderCalendar({ chosenDate, activities, activityLocation }) {
  console.log(activities);
  console.log(chosenDate);
  console.log(activityLocation);
  return (
    <Content>
      <Calendar>
        <Local>
          Auditório Principal
        </Local>
        <Trail>
          <Activity>
            <Left>
              <h1>Minecraft: montando o PC ideal</h1>
              <h2>09:00 - 10:00</h2>
            </Left>
            <Bar />
            <Right>
              <ion-icon name="log-in-outline"></ion-icon>
              <h3>27 vagas</h3>
            </Right>
          </Activity>
          <Activity>
            Teste2
          </Activity>
        </Trail>
      </Calendar>
      <Calendar>
        <Local>
          LOCAL2
        </Local>
        <Trail>
          <Activity>
            Teste2
          </Activity>
        </Trail>
      </Calendar>
      <Calendar>
        <Local>
          LOCAL3
        </Local>
        <Trail>
          <Activity>
            Teste3
          </Activity>
        </Trail>
      </Calendar>
    </Content>
  );
  return (
    <Content>
      {activityLocation.map(act =>
        <>
          <Local>
            <h1>
              {act.name}
            </h1>
          </Local>
          <Trail>
            <Activity>
              Teste
            </Activity>
          </Trail>
        </>
      )}
    </Content>
  );
}

const Content = styled.div`

  display: flex;
`;

const Calendar = styled.div`

  display: flex;
  flex-direction: column;
`;

const Trail = styled.div`

  width: 288px;
  height: 390px;
  border: 1px solid #D7D7D7;
  box-sizing: border-box;
  padding: 10px;
`;

const Activity = styled.div`

  width: 265px;
  height: 80px;
  background: #F1F1F1;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Left = styled.div`

  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 5px;
  padding-left: 10px;
  h1{
    font-size: 12px;
    font-weight: 700;
    color: #343434;
    margin-bottom: -10px;
  }

  h2{
    font-size: 12px;
    font-weight: 400;
    color: #343434;
  }
`;

const Bar = styled.div`

  width: 1px;
  height: 60px;
  margin-bottom: 10px;
  background-color: #CFCFCF;
`;

const Right = styled.div`

  width: 66px;
  height: 60px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ion-icon{
    color: #078632;
    height: 25px;
    width: 25px;
    margin-bottom: 5px;
  }

  h3{
    color: #078632;
    font-size: 9px;
  }
`;

const Local = styled.div`

  height: 45px;
  width: 288px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7B7B7B;
  font-size: 19px;
  border-left: 1px solid #FFFFFF;
  font-family: 'Roboto', sans-serif;
`;

const Error = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  height: 580px;

  h1 {
    color: #8E8E8E;
    font-size: 20px;
    width: 530px;
    text-align: center;
  }
`;

const Line = styled.div`

  display: flex;
`;

const Button = styled.div`

  width: 131px;
  height: 37px;
  background: #E0E0E0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 25px;
  margin-bottom: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000000;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
`;

const ChosenButton = styled.div`

  width: 131px;
  height: 37px;
  background: #FFD37D;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  margin-top: 25px;
  margin-bottom: 60px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: #000000;
  font-size: 14px;
  margin-right: 20px;
  cursor: pointer;
`;
