import React, { useEffect, useState } from "react"
import EDContentFilter from "../../../Event/EDContentFilter"
import styled from "styled-components"
import useQuery from "../../../../../hooks/useQuery"
import useDebounce from "../../../../../hooks/useDebounce"
import { useRouter } from "next/router"
import $api from "../../../../../services/axios"
import EventRow from "./EventRow"

const getStatistics = async (teamId, params) => {
  const { data } = await $api.get(`/teams/team_statistic/?team_id=${teamId}`, {
    params,
  })
  return data
}

function Events({ teamId, isPublic = false }) {
  const [search, setSearch] = useState("")
  const debouncedSearch = useDebounce(search, 300)
  const [statics, setStatics] = useState([])
  const { push: routerPush } = useRouter()
  const query = useQuery()

  useEffect(async () => {
    query.set("search", debouncedSearch)
    await routerPush(
      `${
        isPublic && teamId
          ? `/team/${teamId}/statistics/`
          : "/lk-tm/profile/statistics/"
      }?${query}`
    )
  }, [debouncedSearch])
  useEffect(() => {
    teamId && getStatistics(teamId, query).then(setStatics)
  }, [query])

  return (
    <MainWrapper>
      <EDContentFilter
        onSearch={setSearch}
        label="Турниры"
        searchPlaceholder="Поиск по турнирам"
      />
      <EventRows>
        {!!statics?.length ? (
          statics.map((row) => (
            <EventRow
              key={`team-statistics-row-${row.id}`}
              eventResults={row}
              isPublic={isPublic}
              teamId={teamId}
            />
          ))
        ) : (
          <p>Нет терниров</p>
        )}
      </EventRows>
    </MainWrapper>
  )
}

export default Events

const MainWrapper = styled.div`
  padding: 0 32px;
`
const EventRows = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
  margin-bottom: 32px;
`
