import React, { useEffect } from "react"
import { useCookies } from "react-cookie"
import { Container } from "../../ui/Wrappers/Container"
import EventsSlider from "../Events/EventsSlider"
import EventsGlobalSearch from "../Events/EventsGlobalSearch/EventsGlobalSearch"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents, selectEvents } from "../../../redux/components/events"
import EventsCatalog from "../Events/EventCatalog/EventsCatalog"

const MainPage = () => {
  const [cookies] = useCookies(["token", "refresh"])
  const [loading, events, count] = useSelector(selectEvents)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
    console.log({ eventsLoading: loading, events, eventsCount: count })
  }, [])

  return (
    <Container>
      <MainPageWrapper>
        <EventsGlobalSearch />
        <MainPageTitle>Популярные</MainPageTitle>
        <EventsSlider events={events} />
        <EventsCatalog />
      </MainPageWrapper>
    </Container>
  )
}

export default MainPage

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
