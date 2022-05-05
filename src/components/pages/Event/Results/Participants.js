import React, { useEffect, useState } from "react"
import EDContentFilter from "../EDContentFilter"
import useDebounce from "../../../../hooks/useDebounce"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import EventResultsItem from "./EventResultsItem"
import { Autocomplete } from "@mui/lab"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import Filter from "./Filter"
import $api from "../../../../services/axios"

const Participants = () => {
  const [participants, setParticipants] = useState([])
  const [filter, setFilter] = useState({
    search: "",
    teamId: "",
    countryId: "",
    id: "",
  })
  const searchValue = useDebounce(filter.search, 500)
  const countryValue = useDebounce(filter.countryId, 500)
  const teamValue = useDebounce(filter.teamId, 500)
  const categoryValue = useDebounce(filter.id, 500)

  const filterHandler = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(async () => {
    const { data } = await $api.get(`/events/event_participants_result/`, {
      params: {
        search: searchValue,
        country_id: countryValue,
        team_id: teamValue,
        id: categoryValue,
      },
    })
    setParticipants(data)
  }, [searchValue, countryValue, teamValue, categoryValue])

  return (
    <>
      <Filter onFilter={filterHandler} />
      <TitleBlock sx={{ margin: "32px 0" }} component={"h4"}>
        Все результаты турнира
      </TitleBlock>
      <EventResults>
        {participants.map((participant) => (
          <EventResultsItem key={participant.id} participant={participant} />
        ))}
      </EventResults>
    </>
  )
}

export const TitleBlock = styled(Box)`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`
export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 32px;
`
const EventResults = styled.ul``

export default Participants
