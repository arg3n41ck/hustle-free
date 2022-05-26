import React, { useCallback, useEffect, useMemo, useState } from "react"
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
import Athlete from "../../../components/ui/Ahtletes/Athlete"
import styled from "styled-components"
import { TextField } from "@mui/material"
import { SearchIcon } from "../../../components/pages/Events/EventsGlobalSearch/EventsGlobalSearch"
import useDebounce from "../../../hooks/useDebounce"
import ApplyToTeam from "../../../components/TeamProfile/ApplyToTeam"
import { getIsUserInTeam } from "./index"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

function Athletes({ onToggleSidebar }) {
  const {
    query: { id: teamId },
  } = useRouter()
  const query = useQuery()
  const [userStatusInTeam, setUserStatusInTeam] = useState(null)
  const user = useSelector((state) => state.user.user)
  const [, athletes] = useSelector(selectAthletes)
  const [searchValue, setSearchValue] = useState("")
  const searchDebounced = useDebounce(searchValue, 500)
  const checkUserStatus = useCallback(() => {
    teamId && getIsUserInTeam(teamId).then(setUserStatusInTeam)
  }, [teamId])

  const tabs = useMemo(() => {
    return teamProfileTabs(teamId)
  }, [teamId])

  const dispatch = useDispatch()

  useEffect(() => {
    query.set("team_id", teamId || "")
    dispatch(fetchAthletesByParams(query))
    dispatch(fetchCountries())
  }, [query, teamId])

  useEffect(() => {
    query.set("search", searchDebounced)
    dispatch(fetchAthletesByParams(query))
  }, [searchDebounced])

  useEffect(() => {
    checkUserStatus()
  }, [teamId])

  return (
    <LkLayout tabs={tabs}>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <HeaderWrapper>
          <TitleHeader>Профиль</TitleHeader>
          {user?.role === "athlete" && (
            <ApplyToTeam
              userStatusInTeam={userStatusInTeam}
              checkUserStatus={checkUserStatus}
            />
          )}
        </HeaderWrapper>
      </LkDefaultHeader>

      <Field>
        <TextField
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px 0 0 8px !important",
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          fullWidth
          value={searchValue}
          placeholder={"Поиск"}
        />
        <SearchButton>
          <SearchIcon />
          <span>Поиск</span>
        </SearchButton>
      </Field>

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

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common"])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  }
}

const AthletesWrapper = styled.div`
  display: flex;
  grid-gap: 16px;
  padding: 32px;
  flex-wrap: wrap;
`

const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 32px 32px 0;
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  grid-column-gap: 11px;

  padding: 0 24px 0 20px;
  height: 64px;
  background: #333333;
  border-radius: 0 16px 16px 0;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`
