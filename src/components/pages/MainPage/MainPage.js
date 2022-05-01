import React, { useEffect } from "react"
import { Container } from "../../ui/Wrappers/Container"
import EventsSlider from "../Events/EventsSlider"
import EventsGlobalSearch from "../Events/EventsGlobalSearch/EventsGlobalSearch"
import styled from "styled-components"
import { useDispatch } from "react-redux"
import { fetchEvents } from "../../../redux/components/events"
import EventsCatalog from "../Events/EventsCatalog/EventsCatalog"

const MainPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEvents())
  }, [])

  return (
    <Container>
      <MainPageWrapper>
        <EventsGlobalSearch />
        <MainPageTitle>Популярные</MainPageTitle>
        <EventsSlider />
        <EventsCatalog />
      </MainPageWrapper>
    </Container>
  )
}

export default MainPage

export const MainPageWrapper = styled.div`
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
