import styled from 'styled-components';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useState } from 'react';
import { useActivityLocation, useActivity } from '../../../hooks/api/useActivity';
import { useTicket } from '../../../hooks/api/useTicket';
import RenderCalendar from './renderCalendar';
dayjs.extend(weekday);

export default function RenderFilter() {
  const { activity: activities } = useActivity();
  const { activityLocation } = useActivityLocation();
  const weekdays = [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const [chosenDate, setChosenDate] = useState('');

  function extractDates() {
    const array = [];
    if (activities) {
      for (let i=0; i<activities.length; i++) {
        if (!array.includes(activities[i].startTime.substr(0, 10))) {
          array.push(activities[i].startTime.substr(0, 10));
        }
      }
      return array;
    } else {
      return [];
    }
  }

  function clickButtonAction(option) {
    setChosenDate(option);
    console.log(option);
  };

  const activitiesDates = extractDates();

  return (!activities ? 
    <>
      ERRO
    </> 
    : 
    <Content>
      { !chosenDate ?
        <h2>Primeiro, filtre pelo dia do evento:</h2>
        : <></>
      }
      <Line>
        {activitiesDates.map(date => 
          !chosenDate ? 
            <Button onClick={() => clickButtonAction(date)}>
              {`${weekdays[dayjs(date).weekday()]}, ${dayjs(date).format('DD/MM')}`}
            </Button>
            : chosenDate === date ? 
              <ChosenButton onClick={() => clickButtonAction(date)}>
                {`${weekdays[dayjs(date).weekday()]}, ${dayjs(date).format('DD/MM')}`}
              </ChosenButton>
              : <Button onClick={() => clickButtonAction(date)}>
                {`${weekdays[dayjs(date).weekday()]}, ${dayjs(date).format('DD/MM')}`}
              </Button>
        )}
      </Line>
      { chosenDate ? 
        <RenderCalendar chosenDate={chosenDate} activities={activities} activityLocation={activityLocation}/>
        : ''
      }
    </Content>
  );
}

const Content = styled.div`

  h2 {
    margin-top: 25px;
    color: #8E8E8E;
    font-size: 20px;
  }
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
