import { useEffect } from 'react';
import useBooking from '../../../../../hooks/api/useBooking';
import { HotelFrame } from '../../../Hotels/HotelFrame';
import { Content } from '../../../Hotels/Content';
import { Title } from '../../../Hotels/Title';
import { Button } from '../../Button';
import styled from 'styled-components';
import { Details } from '../../Details';
import { HotelType } from '../../HotelType';
import { CenterFrame } from '../../CenterFrame';

export default function Booking(props) {
  const { booking, bookingLoading, bookingError, getBooking } = useBooking();
    
  useEffect(() => {
    getBooking();
  }, []);
  
  if(bookingLoading) {
    return <h1>Loading ...</h1>;
  }

  if (bookingError) {
    // eslint-disable-next-line no-console
    console.log(bookingError);
    if(bookingError.status === 404) {
      return <>
        <CenterFrame> 
          <h6 color="textSecondary" >
            {bookingError.message}
          </h6>
        </CenterFrame>
      </>;
    }
    return <p>An error occurred: {bookingError.message}</p>;
  }

  function capacityRooms(capacity) {
    if(capacity === 1) {return ' (Single)';}
    if(capacity === 2) {return ' (Double)';}
    if(capacity >= 3) {return ' (Triple)';}
  }
  function sharedRooms(avaliables) {
    if(avaliables === 1) {return 'Você';}
    if(avaliables === 2) {return 'Você e mais 1';}
    if(avaliables === 3) {return 'Você e mais 2';}
  }
  
  return <>
    <HotelFrame isSelected={true}>
      <CardHotel isSelected={true}>
        <img src={booking.Room.Hotel.image} alt={booking.Room.Hotel.name} />
        <Details>
          <HotelType>{booking.Room.Hotel.name}</HotelType>
        </Details>
        <Details>
          <Title>Quarto reservado </Title>
          <Content>{booking.Room.name} {capacityRooms(booking.Room.capacity)} </Content>
        </Details>
        <Details>
          <Title>Pessoas no seu quarto </Title>
          <Content> {sharedRooms(booking.Room.capacity)}</Content>
        </Details>
      </CardHotel>
    </HotelFrame>
    <Button onClick={props.changeRoom(true)}>Trocar de Quarto</Button>
  </>;
}

const CardHotel = styled.div`
width: 196px;
height: 264px;
margin-right: 19px;
background: ${ (props) => props.isSelected ?  '#FFEED2' :  '#EBEBEB'  };
border-radius: 10px;
display:flex;
flex-direction: column;
align-items: center;
img {
    margin-top: 16px;
    width: 168px;
    height: 109px;
    border-radius: 5px;
}
cursor: pointer;
`;
