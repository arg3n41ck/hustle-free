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
import { useTranslation } from "next-i18next"

function MyTeams({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const [athleteTeams] = useSelector(teamsSelector)
  const { t: tLkAh } = useTranslation("lkAh")


  React.useEffect(() => {
    dispatch(fetchAthleteTeams())
    dispatch(fetchCountries())
  }, [])

  return (
    <div>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tLkAh("myTeams.myTeams")}</TitleHeader>
      </LkDefaultHeader>

      {!!athleteTeams?.length &&
        athleteTeams.map((item) => <Teams data={item} />)}
    </div>
  )
}

export default MyTeams
