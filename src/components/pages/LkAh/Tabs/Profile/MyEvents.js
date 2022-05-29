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
import { useTranslation } from "next-i18next"

function MyEvents({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const [, , , athleteEvents] = useSelector(selectEvents)
  const [view, setView] = React.useState("all") // all | past | now | future
  const { t: tLkAh } = useTranslation("lkAh")

  const tabs = [
    {
      id: 1,
      name: tLkAh("myEvents.tabs.all"),
      value: "all",
    },
    {
      id: 2,
      name: tLkAh("myEvents.tabs.past"),
      value: "past",
    },
    {
      id: 3,
      name: tLkAh("myEvents.tabs.now"),
      value: "now",
    },
    {
      id: 4,
      name: tLkAh("myEvents.tabs.coming"),
      value: "future",
    },
  ]
  


  React.useEffect(() => {
    dispatch(fetchEventsAthlete(view))
  }, [view])

  const viewHandler = (value) => setView(value)

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tLkAh("myEvents.myEvents")}</TitleHeader>
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
