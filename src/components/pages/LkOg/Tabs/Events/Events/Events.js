import React, { useEffect, useState } from "react"
import LkDefaultHeader from "../../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../../ui/LKui/HeaderContent"
import styled from "styled-components"
import { useRouter } from "next/router"
import EventsTable from "./EventsTable"
import $api from "../../../../../../services/axios"

const getEvents = async () => {
  const { data } = await $api.get("/organizer/my_events_list/")
  return data
}

function EventsContent({ onToggleSidebar }) {
  const [events, setEvents] = useState([])
  const { push: routerPush } = useRouter()

  useEffect(() => {
    getEvents().then(setEvents)
  }, [])
  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Мои турниры</TitleHeader>
          <CreateEventBTN
            onClick={() => routerPush("/lk-og/profile/events/edit")}
          >
            Создать новое мероприятие
          </CreateEventBTN>
        </HeaderWrapper>
      </LkDefaultHeader>
      <TableWrapper>
        <EventsTable events={events} />
      </TableWrapper>
    </div>
  )
}

export default EventsContent

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export const CreateEventBTN = styled.button`
  padding: 0 20px;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 20px;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`

const TableWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`
