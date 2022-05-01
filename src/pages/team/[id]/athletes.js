import React, { useEffect, useMemo } from "react"
import LkLayout from "../../../components/layouts/LkLayout"
import { useRouter } from "next/router"
import { teamProfileTabs } from "../../../components/pages/Team/tabConstants"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchAthletesByParams,
  selectAthletes,
} from "../../../redux/components/athletes"
import useQuery from "../../../hooks/useQuery"
import { fetchCountries } from "../../../redux/components/countriesAndCities"
import LkDefaultHeader from "../../../components/ui/LKui/LKDefaultHeader"
import { HeaderWrapper } from "../../../components/pages/LkOg/Tabs/Events/Events/Events"
import { TitleHeader } from "../../../components/ui/LKui/HeaderContent"
import {
  CreateEventBTN,
  PlusIcon,
} from "../../../components/pages/Team/TeamProfile"
import Athlete from "../../../components/ui/Ahtletes/Athlete"
import styled from "styled-components"

function Athletes({ onToggleSidebar }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const query = useQuery()
  const [loading, athletes, count, error] = useSelector(selectAthletes)

  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  const dispatch = useDispatch()

  useEffect(() => {
    query.set("team_id", teamId || "")
    dispatch(fetchAthletesByParams(query))
    dispatch(fetchCountries())
  }, [query, teamId])

  return (
    <LkLayout tabs={tabs}>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Профиль</TitleHeader>
          <CreateEventBTN onClick={() => {}}>
            <PlusIcon /> Вступить в команду
          </CreateEventBTN>
        </HeaderWrapper>
      </LkDefaultHeader>
      <AthletesWrapper>
        {!!athletes.length &&
          athletes.map(({ id, user }, i) => (
            <Athlete key={`${id}-team-profile-${user.id || i}`} user={user} />
          ))}
      </AthletesWrapper>
    </LkLayout>
  )
}

export default Athletes

const AthletesWrapper = styled.div`
  display: flex;
  grid-gap: 16px;
  padding: 32px;
`
