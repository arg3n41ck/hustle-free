import React from "react"
import { useSelector } from "react-redux"
import { selectEvents } from "../../../../redux/components/events"
import styled from "styled-components"
import Image from "next/image"
import { getEventStatus, getRusBetweenDate } from "../../../../helpers/helpers"

//city: "Москва"
// country: "Россия"
// dateEnd: "2022-05-15T06:11:00+06:00"
// dateStart: "2022-03-14T06:11:00+06:00"
// id: 4
// image: "http://api.dev.hustlefree.pro/media/events/images/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA4.jpeg"
// name: "Чемпионат мира по Борьбе Бишкек"
// status: "continue"
// typeSport: "Борьба"

function Events() {
  const [, events] = useSelector(selectEvents)

  return (
    <EventsWrapper>
      <HeadPart>
        <MainPageTitle>Турниры</MainPageTitle>
        <ViewTypeChanger>
          <MenuIcon />
          Карточки
        </ViewTypeChanger>
        <SortByMap>
          <LocationIcon />
          На карте
        </SortByMap>
      </HeadPart>

      <EventsLWrapper>
        {!!events?.length ? (
          events.map(
            ({
              city,
              country,
              dateEnd,
              dateStart,
              id,
              image,
              name,
              status,
            }) => (
              <EventCard key={`mainPageEvents${id}`}>
                <EventImg src={image} />
                <Texts>
                  <h4>{name}</h4>
                  <Content>
                    <ContentLeftSide>
                      <ContentItems>
                        <LocationIcon />
                        <span>{`${country}, ${city}`}</span>
                      </ContentItems>
                      <ContentItems>
                        <CalendarIcon />
                        <span>{getRusBetweenDate(dateStart, dateEnd)}</span>
                      </ContentItems>
                    </ContentLeftSide>
                    <ContentRightSide>
                      {getEventStatus(status)}
                    </ContentRightSide>
                  </Content>
                </Texts>
              </EventCard>
            )
          )
        ) : (
          <Empty>Турниров не найдено</Empty>
        )}
      </EventsLWrapper>
    </EventsWrapper>
  )
}

export default Events

const EventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  margin-top: 32px;
`

const HeadPart = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 32px;
`

const MainPageTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
  margin: 0 auto 0 0;
`
const Empty = styled.h3`
  font-style: normal;
  font-weight: 600;
  color: #bdbdbd;
`

const ViewTypeChanger = styled.button`
  padding: 10px 20px;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  grid-gap: 12px;
`

const SortByMap = styled.button`
  padding: 10px 20px;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  display: flex;
  align-items: center;
  grid-gap: 12px;

  font-size: 16px;
  color: #bdbdbd;
`

const EventsLWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;
`

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  border-radius: 16px;
  background: #1b1c22;
`

const Texts = styled.div`
  padding: 0 6% 32px;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  h4 {
    font-weight: 600;
    font-size: 24px;
    color: #f2f2f2;
  }
`

const EventImg = styled.div`
  height: 224px;
  width: 100%;
  background: no-repeat ${({ src }) => (src ? 'url("' + src + '")' : "red")}
    center / cover;
  border-radius: 16px 16px 0 0;
`

const Content = styled.div`
  display: flex;
`

const ContentLeftSide = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
`

const ContentItems = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;

  span {
    font-size: 16px;
    font-weight: 600;
    color: #f2f2f2;
  }
`

const ContentRightSide = styled.div`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 16px;
  color: #828282;
`

const MenuIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.16669 5.8335H15.8334" stroke="white" strokeLinecap="round" />
    <path d="M4.16669 10H15.8334" stroke="white" strokeLinecap="round" />
    <path d="M4.16669 14.1665H15.8334" stroke="white" strokeLinecap="round" />
  </svg>
)

const LocationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
      fill="#828282"
    />
  </svg>
)

const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="6"
      width="18"
      height="15"
      rx="2"
      stroke="#F4F4F4"
      stroke-width="2"
    />
    <path
      d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
      fill="#F4F4F4"
    />
    <path
      d="M7 3L7 6"
      stroke="#F4F4F4"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M17 3L17 6"
      stroke="#F4F4F4"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
)
