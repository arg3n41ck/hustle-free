import React from "react"
import { useSelector } from "react-redux"
import { selectEvents } from "../../../../redux/components/events"
import styled from "styled-components"
import EventsArray from "../../../ui/Events"
import { useTranslation } from "next-i18next"

function Events() {
  const [, events] = useSelector(selectEvents)
  const { t: tEvents } = useTranslation("events")

  return (
    <EventsWrapper>
      <HeadPart>
        <MainPageTitle>{tEvents("events.events")}</MainPageTitle>
        {/*<ViewTypeChanger>*/}
        {/*  <MenuIcon />*/}
        {/*  Карточки*/}
        {/*</ViewTypeChanger>*/}
        {/*<SortByMap>*/}
        {/*  <LocationIcon />*/}
        {/*  На карте*/}
        {/*</SortByMap>*/}
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
//
// const ViewTypeChanger = styled.button`
//   padding: 10px 20px;
//   background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   grid-gap: 12px;
// `
//
// const SortByMap = styled.button`
//   padding: 10px 20px;
//   border: 1px solid #bdbdbd;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   grid-gap: 12px;
//
//   font-size: 16px;
//   color: #bdbdbd;
// `
//
// const MenuIcon = () => (
//   <svg
//     width="20"
//     height="20"
//     viewBox="0 0 20 20"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path d="M4.16669 5.8335H15.8334" stroke="white" strokeLinecap="round" />
//     <path d="M4.16669 10H15.8334" stroke="white" strokeLinecap="round" />
//     <path d="M4.16669 14.1665H15.8334" stroke="white" strokeLinecap="round" />
//   </svg>
// )
//
// const LocationIcon = () => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
//       fill="#828282"
//     />
//   </svg>
// )
