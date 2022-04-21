import React, { useEffect } from "react"
import { useCookies } from "react-cookie"
import { Container } from "../../ui/Wrappers/Container"
import EventsSlider from "../Events/EventsSlider"
import EventsGlobalSearch from "../Events/EventsGlobalSearch/EventsGlobalSearch"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectEvents } from "../../../redux/components/events"
import EventsCatalog from "../Events/EventsCatalog/EventsCatalog"
import { getEventStatus, getRusBetweenDate } from "../../../helpers/helpers"
import { format, parseISO } from "date-fns"
import Events from "../../ui/Events"
import HeroMainPageForNotAuth from "./HeroMainPageForNotAuth"
import MainPageAuth from "./MainPageAuth"

const MainPageForNotAuthUser = () => {
  const [cookies] = useCookies(["token", "refresh"])
  const [, events] = useSelector(selectEvents)
  const dispatch = useDispatch()
  let array = [...events]

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <>
      <HeroMainPageForNotAuth />
      <Container>
        <MainPageAuth />
        <MainPageWrapper>
          <MainPageTitle>Популярные</MainPageTitle>
          <EventsSlider events={events} />
          {/* <EventsCatalog /> */}
          <MainPageContainerButtonAndTitle>
            <MainPageTitle>Ближайшие турниры</MainPageTitle>
            <MainPageButton>Смотреть все</MainPageButton>
          </MainPageContainerButtonAndTitle>
          <Events data={array.slice(0, 3)} />
        </MainPageWrapper>
      </Container>
    </>
  )
}

export default MainPageForNotAuthUser

const MainPageWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 40px;
`

const MainPageTitle = styled.h2`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  color: #ffffff;
`

const MainPageButton = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 8px;
  max-width: 152px;
  width: 100%;
  height: 40px;
  padding: 0px 20px;
`
const MainPageContainerButtonAndTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
