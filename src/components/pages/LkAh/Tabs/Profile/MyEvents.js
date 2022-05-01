import React from "react"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import styled from "styled-components"
import {
  fetchEventsAthlete,
  selectEvents,
} from "../../../../../redux/components/events"
import { useDispatch, useSelector } from "react-redux"
import HorizontalTabsBorder from "../../../../ui/tabs/HorizontalTabsBorder"
import FilterMyEvents from "./Events/FilterMyEvents"
import { format, parseISO } from "date-fns"

const tabs = [
  {
    id: 1,
    name: "Все",
    value: "all",
  },
  {
    id: 2,
    name: "Прошедшие",
    value: "past",
  },
  {
    id: 3,
    name: "Сейчас",
    value: "now",
  },
  {
    id: 4,
    name: "Предстоящие",
    value: "future",
  },
]

function MyEvents({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const [, , , athleteEvents] = useSelector(selectEvents)
  const [view, setView] = React.useState("all") // all | past | now | future

  React.useEffect(() => {
    dispatch(fetchEventsAthlete(view))
  }, [view])

  const viewHandler = (value) => setView(value)

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>Мои турниры</TitleHeader>
      </LkDefaultHeader>
      <HorizontalTabsBorder
        arrayTab={tabs}
        valueTab={view}
        onChangeHandler={viewHandler}
        height={"96px"}
      >
        {!!athleteEvents?.length &&
          athleteEvents.map((item) => <FilterMyEvents data={item} />)}
      </HorizontalTabsBorder>
    </div>
  )
}

export default MyEvents
