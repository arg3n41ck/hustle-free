import React from "react"
import LkDefaultHeader from "../../../../ui/LKui/LKDefaultHeader"
import { TitleHeader } from "../../../../ui/LKui/HeaderContent"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAthleteTeams,
  teamsSelector,
} from "../../../../../redux/components/teams"
import styled from "styled-components"
import { CalendarIcon, LocationIcon } from "../../../Events/EventsSlider"
import Teams from "./Teams/Teams"
import { fetchCountries } from "../../../../../redux/components/countriesAndCities"

function MyTeams({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const [athleteTeams] = useSelector(teamsSelector)

  React.useEffect(() => {
    dispatch(fetchAthleteTeams())
    dispatch(fetchCountries())
  }, [])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>Мои команды</TitleHeader>
      </LkDefaultHeader>

      {!!athleteTeams?.length &&
        athleteTeams.map((item) => <Teams data={item} />)}
    </div>
  )
}

export default MyTeams
