import React, { useEffect } from "react"
import styled from "styled-components"
import { fetchCountries } from "../../../redux/components/countriesAndCities"
import { useDispatch } from "react-redux"
import { useRouter } from "next/router"
import { fetchTeams } from "../../../redux/components/teams"
import {
  fetchCategories,
  fetchLevel,
} from "../../../redux/components/categories"
import AthleteUserInfo from "./AthleteUserInfo"
import AthleteEventInfo from "./AthleteEventInfo"

function AuthorizationAthleteToEvent() {
  const dispatch = useDispatch()
  const {
    query: { id: eventId },
  } = useRouter()

  useEffect(() => {
    dispatch(fetchCategories({ event: eventId }))
    dispatch(fetchTeams())
    dispatch(fetchLevel())
    dispatch(fetchCountries())
  }, [])

  return (
    <RegistrationAthleteToEventContainer>
      <RegistrationAthleteToEventHeading>
        <RegistrationAthleteToEventHeadingText>
          Сведения о пользователе
        </RegistrationAthleteToEventHeadingText>
      </RegistrationAthleteToEventHeading>
      <Line />
      <AthleteUserInfo />
      <Line />
      <AthleteEventInfo />
    </RegistrationAthleteToEventContainer>
  )
}

export default AuthorizationAthleteToEvent

const RegistrationAthleteToEventContainer = styled.div`
  width: 100%;
  height: min-content;
  background-color: #1b1c22;
  border: 1px solid #333333;
  border-radius: 24px;
`
const RegistrationAthleteToEventHeading = styled.div`
  height: 96px;
  display: flex;
  align-items: center;
  padding: 32px;
`

const RegistrationAthleteToEventHeadingText = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const Line = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
