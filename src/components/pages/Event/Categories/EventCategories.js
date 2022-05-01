import React, { useCallback, useEffect, useState } from "react"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import Row from "./Row"
import styled from "styled-components"
import EDContentFilter from "../EDContentFilter"
import { Autocomplete, TextField } from "@mui/material"
import { LocationIcon } from "../../Events/EventsCatalog/EventsFilter"
import { useSelector } from "react-redux"
import { selectCountriesAndCities } from "../../../../redux/components/countriesAndCities"
import useQuery from "../../../../hooks/useQuery"

const getEventPC = async (query) => {
  const { data } = await $api.get(`/events/participant_category/`, {
    params: query,
  })
  return data
}

const createPCList = (pc) => {
  return pc.reduce((pre, { eventParticipantsCategory }) => {
    const findIsPcInPre =
      pre?.length && pre.some(({ id }) => id === eventParticipantsCategory.id)
    if (!findIsPcInPre) {
      pre = [...(pre || []), eventParticipantsCategory]
    }
    return pre
  }, [])
}

function EventCategories() {
  const {
    query: { id: eventId, ...queryRest },
  } = useRouter()
  const [pc, setPc] = useState([])
  const [search, setSearch] = useState("")
  const query = useQuery()
  const [countries] = useSelector(selectCountriesAndCities)
  const { push: routerPush } = useRouter()

  const handleCountriesFilter = useCallback(
    (_, value) => {
      value ? query.set("country", value.name) : query.delete("country")
      routerPush(`/events/${eventId}/categories/?${query}`)
    },
    [query]
  )

  const countriesValue =
    countries.length &&
    countries.find((type) => type.name === query.get("country"))

  useEffect(() => {
    getEventPC({ event_id: eventId }).then((data) => {
      data?.length && setPc(createPCList(data))
    })
  }, [])

  return (
    <CollapseWrapper>
      <EDContentFilter onSearch={(value) => setSearch(value)}>
        {!!countries?.length && (
          <Autocomplete
            noOptionsText={"Ничего не найдено"}
            onChange={(e, value) => handleCountriesFilter(e, value)}
            options={countries.map((option) => option)}
            getOptionLabel={(option) => option.name}
            value={countriesValue}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                placeholder="Страна"
                InputProps={{
                  ...params.InputProps,
                  startAdornment: <LocationIcon />,
                }}
              />
            )}
          />
        )}
      </EDContentFilter>
      <PCRows>
        {!!pc?.length &&
          pc
            .filter(({ name }) => name.indexOf(search) >= 0)
            .map((pci) => (
              <Row key={`EventCategories_PC_Collapse_${pci.id}`} pcItem={pci} />
            ))}
      </PCRows>
    </CollapseWrapper>
  )
}

export default EventCategories

const CollapseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`

const PCRows = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
`
