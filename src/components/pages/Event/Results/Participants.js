import React, { useEffect, useState } from "react"
import EDContentFilter from "../EDContentFilter"
import useDebounce from "../../../../hooks/useDebounce"
import styled from "styled-components"
import { Box, TextField } from "@mui/material"
import EventResultsItem from "./EventResultsItem"
import { Autocomplete } from "@mui/lab"
import { Field } from "../../LkOg/Tabs/Events/EventDefaults"
import Filter from "./Filter"

const Participants = () => {
  const [filter, setFilter] = useState({ search: "" })
  const debouncedValue = useDebounce(filter.search, 500)

  const filterHandler = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    console.log(debouncedValue)
  }, [debouncedValue])

  return (
    <>
      <Filter onFilter={filterHandler} />
      <TitleBlock sx={{ margin: "32px 0" }} component={"h4"}>
        Все результаты турнира
      </TitleBlock>
      <EventResultsItem />
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

export default Participants
