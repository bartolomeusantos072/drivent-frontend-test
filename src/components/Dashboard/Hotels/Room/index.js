import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getHotelsWithRooms } from '../../../../services/hotelApi';
import { listBooking, changeBooking, bookingRoom } from '../../../../services/bookingApi';
import { BsPerson, BsPersonFill } from 'react-icons/bs';
import useToken from '../../../../hooks/useToken';
import { Button } from '../Button';

export function Room(props) {
  const [hotelIdSelected, setHotelIdSelected] = useState(props.hotelId);
  const [rooms, setRooms] = useState([]);
  const [roomIdSelected, setRoomIdSelected] = useState(null);
  const [userBooking, setUserBooking] = useState({});
  const [reset, setReset] = useState(false);
  const token = useToken();

  useEffect(async() => {
    const response = await getHotelsWithRooms(hotelIdSelected, token);
    if(response) {
      setRooms(response.Rooms);
    }
  }, [hotelIdSelected, reset]);

  useEffect(async() => {
    const response = await listBooking(token);
    if(response) {
      setUserBooking(response);
    }
  }, [reset]);

  function loadRooms(room) {
    const bookedRooms = room.Booking.length;
    const isRoomBookedByUser = userBooking.Room ? room.id === userBooking.Room.id : false;
    
    return(
      <RoomFrame key={room.id} isSelected={room.id === roomIdSelected} isFull={room.capacity === bookedRooms} onClick ={() => setRoomIdSelected(room.id)}>
        <h1>{room.name}</h1>
        <CapacityArea>
          {Array(room.capacity - bookedRooms).fill(0).map((_, i) => <p><BsPerson key={i}/></p>)}
          {Array(bookedRooms - isRoomBookedByUser).fill(0).map((_, i) => <p><BsPersonFill key={i}/></p>)}
          {Array(Number(isRoomBookedByUser)).fill(0).map((_, i) => <p><BsPersonFill color='#FF4791' key={i}/></p>)}
        </CapacityArea>
      </RoomFrame>
    );
  }

  function resetAll() {
    props.changeRoom(false);
    setHotelIdSelected(0);
    setRoomIdSelected(0);
    setReset(!reset);
    window.location.reload(true);
  }

  return(
    <> 
      {
        hotelIdSelected &&
                  <RoomArea>
                    {rooms.map(loadRooms)}
                  </RoomArea>
      }
      {
        roomIdSelected ? 
          <Button onClick={ 
            async() => {
              userBooking.id ? 
                await changeBooking(token, userBooking.id, roomIdSelected) : 
                await bookingRoom(token, roomIdSelected); resetAll();
            }
          }
          >
            Reservar Quarto 
          </Button> : ''}
    </> 
  );
}

const RoomArea = styled.div`
  margin-top: 33px;
  margin-bottom: 8x;
  display: flex;
  flex-wrap: wrap;
`;

const RoomFrame = styled.div`
  margin-top: 8px;
  width: 190px;
  height: 45px;
  background: ${props => props.isFull ? '#CECECE' : props.isSelected ? '#FFEED2' : '#FFFFFF'};
  border: 1px solid #CECECE;
  border-radius: 10px;
  margin-right: 17px;
  display: flex;
  justify-content: space-between;
  pointer-events: ${props => props.isFull ? 'none' : 'inherit'};

  h1{
    margin-left: 16px;
    margin-top: 11px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #454545;
  }
`;

const CapacityArea = styled.div`
  width: 30%;
  display: flex;
  place-content: flex-end;
  margin-right: 12px;
  
  p{
    margin-top: 11px;
  }
`;
