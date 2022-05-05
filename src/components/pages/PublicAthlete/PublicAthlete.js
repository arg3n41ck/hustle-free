import React, { useEffect } from "react"
import styled from "styled-components"
import AthleteUserData from "./AthleteUserData"
import { useDispatch } from "react-redux"
import { fetchCountries } from "../../../redux/components/countriesAndCities"
import Teams from "./Teams"
import Participations from "./Participations"
import HorizontalTabsBorder from "../../ui/tabs/HorizontalTabsBorder"

const tabs = [
  {
    id: 1,
    name: "Все",
    value: "all",
  },
  {
    id: 2,
    name: "Победы",
    value: "wins",
  },
  {
    id: 3,
    name: "Ничьи",
    value: "draws",
  },
  {
    id: 4,
    name: "Поражений",
    value: "defeats",
  },
]

function PublicAthlete({ athleteData }) {
  const { user, teams, participations } = athleteData
  const [view, setView] = React.useState("all") // all | wins | draws | defeats
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  return (
    <MainWrapper>
      <AthleteUserData user={user} />
      <TeamsAndPartWrapper>
        <Teams teams={teams} />
        {!!participations.length && (
          <HorizontalTabsBorder
            arrayTab={tabs}
            valueTab={view}
            onChangeHandler={(value) => setView(value)}
            height={"96px"}
          >
            {participations.map(({ eventName, participationCategory }, i) => {
              const {
                eventParticipantsCategory: {
                  name,
                  fromAge,
                  toAge,
                  fromWeight,
                  toWeight,
                },
                level,
              } = participationCategory

              return (
                <Participations
                  key={`${eventName}-${i}`}
                  eventName={eventName}
                  level={level}
                  name={name}
                  fromAge={fromAge}
                  toAge={toAge}
                  fromWeight={fromWeight}
                  toWeight={toWeight}
                />
              )
            })}
          </HorizontalTabsBorder>
        )}
      </TeamsAndPartWrapper>
    </MainWrapper>
  )
}

export default PublicAthlete

const MainWrapper = styled.div`
  height: max-content;
  display: grid;
  justify-self: flex-start;
  grid-template-columns: 328px auto;
  background: #1b1c22;
  margin-top: 64px;
  border: 1px solid #333333;
  border-radius: 24px;
`
const TeamsAndPartWrapper = styled.div``

export const PubAthTitles = styled.h3`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`
