import styled from 'styled-components';
import { useEffect, useState } from 'react';
import  useHotels  from '../../../hooks/api/useHotels';
import { HotelFrame } from './HotelFrame';
import { HotelType } from './HotelType';
import { Content } from './Content';
import { Title } from './Title';
import { StyledTypography } from './StyledTypography';
import { Details } from './Details';
import { CenterFrame } from './CenterFrame';
import { Room } from '../../../components/Dashboard/Hotels/Room';
import  Booking from './Room/Booking';

export default function HotelInformationOptions() {
  const { hotels, hotelsLoading, hotelsError, getHotels } = useHotels();
  const [updateRequest, setUpdateRequest] = useState(false);
  const [selected, setSelected] = useState(0);
  
  useEffect(() => {
    getHotels();
  }, []);
  
  const toggleHidden = (index) => {
    setSelected(selected === index ? 0 : index);
  };
  
  if (hotelsLoading ) {
    return <p>Loading...</p>;
  }
  
  if (hotelsError !== null && hotelsError !== undefined) {
    // eslint-disable-next-line no-console
    console.log(hotelsError);
  }

  if (hotelsError) {
    if(hotelsError.status === 402) {
      return <>
        <CenterFrame> 
          <h6 color="textSecondary" >
            {hotelsError.message}
          </h6>
        </CenterFrame>
      </>;
    }
    if(hotelsError.status === 404) {
      return <>
        <CenterFrame> 
          <h6 color="textSecondary" >
            {hotelsError.message}
          </h6>
        </CenterFrame>
      </>;
    }
    return <p>An error occurred: {hotelsError.message}</p>;
  }

  function Accommodation(props) {
    if(props.accommodation.length === 3) {
      return <Content>
        { props.accommodation[0]}, { props.accommodation[1] } e {props.accommodation[2] }
      </Content>;
    }
    if(props.accommodation.length === 2) {
      return <Content>
        { props.accommodation[0] } e {props.accommodation[1] }
      </Content>;
    }
    if(props.accommodation.length === 1) {
      return <Content>
        { props.accommodation[0] }
      </Content>;
    }
    if(!props.accommodation.length) {
      return <Content>
        caso não verificado
      </Content>;
    }
  }

  function loadHotels(hotel) {
    return (
      <CardHotel key={hotel.name} isSelected={hotel.id === selected} onClick={() => toggleHidden(hotel.id)} >
        <img src={hotel.image} alt={hotel.name} />
        <Details>
          <HotelType>{hotel.name}</HotelType>
        </Details>
        <Details>
          <Title>Tipos de acomodação: </Title>
          <Accommodation accommodation={hotel.accommodation}/>
        </Details>
        <Details>
          <Title>Vagas disponíveis: </Title>
          <Content>{hotel.avaliables}</Content>
        </Details>
      </CardHotel>);
  };

  return(
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      {  
        updateRequest  ?
          <>
            <StyledTypography variant="h6" color="textSecondary" >Primeiro, escolha seu hotel</StyledTypography>
            <HotelFrame>
              { 
                hotels.length > 0 && hotels.map(loadHotels)
              }               
            </HotelFrame>
            <div>
              {
                selected ? 
                  <>
                    <StyledTypography variant="h6" color="textSecondary" >Ótima pedida! Agora escolha seu quarto:</StyledTypography>
                    <Room hotelId={selected} changeRoom={() => setUpdateRequest}/>
                  </> : <></>
              }
            </div>
          </>
          :
          <>
            <StyledTypography variant="h6" color="textSecondary">Você já escolheu seu quarto:</StyledTypography>
            <Booking changeRoom={ () => setUpdateRequest }/>
          </>
      }
    </>
  );
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
