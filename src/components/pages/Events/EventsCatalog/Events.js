import React from "react"
import { useSelector } from "react-redux"
import { selectEvents } from "../../../../redux/components/events"
import styled from "styled-components"
import { getEventStatus, getRusBetweenDate } from "../../../../helpers/helpers"
import { useRouter } from "next/router"
import EventsArray from "../../../ui/Events"

function Events() {
  const [, events] = useSelector(selectEvents)
  const { push: routerPush } = useRouter()

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

      <EventsArray data={events} />
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
  cursor: pointer;
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
      strokeWidth="2"
    />
    <path
      d="M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z"
      fill="#F4F4F4"
    />
    <path d="M7 3L7 6" stroke="#F4F4F4" strokeWidth="2" strokeLinecap="round" />
    <path
      d="M17 3L17 6"
      stroke="#F4F4F4"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)
