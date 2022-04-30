import React, { useEffect, useMemo, useState } from "react"
import $api from "../../../../services/axios"
import { useRouter } from "next/router"
import Row from "./Row"
import styled from "styled-components"
import EDContentFilter from "../EDContentFilter"
import Autocompletes from "./Autocompletes"

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

const getEnabledLevels = (pc) => {
  return [...new Set(pc.map(({ level }) => level))] || []
}

const filterPc = ({
  pc,
  levelQValue,
  genderQValue,
  search,
  ageQValue,
  weightQValue,
}) => {
  return pc
    .filter(({ name }) =>
      search ? (name || "").toLowerCase().indexOf(search) >= 0 : true
    )
    .filter(({ gender }) => (genderQValue ? genderQValue === gender : true))
    .filter(({ levels }) => {
      return levels.some(({ name }) =>
        levelQValue ? name === levelQValue : true
      )
    })
    .sort(({ toAge: aAgeFrom }, { toAge: bAgeFrom }) => {
      return ageQValue === "increase"
        ? aAgeFrom - bAgeFrom
        : bAgeFrom - aAgeFrom
    })
    .sort(({ toWeight: aWeightFrom }, { toWeight: bWeightFrom }) => {
      return weightQValue === "increase"
        ? aWeightFrom - bWeightFrom
        : bWeightFrom - aWeightFrom
    })
}

function EventCategories() {
  const {
    query: {
      id: eventId,
      level: levelQValue,
      gender: genderQValue,
      weight: weightQValue,
      age: ageQValue,
    },
  } = useRouter()
  const [pc, setPc] = useState([])
  const [search, setSearch] = useState("")
  const [levelOptions, setLevelOptions] = useState([])
  const isFilterOpen = useMemo(() => {
    return !!(search && levelQValue)
  }, [levelQValue, genderQValue, weightQValue, ageQValue])

  const filterPcMemo = useMemo(
    () =>
      filterPc({
        pc,
        levelQValue,
        search: (search || "").toLowerCase(),
        ageQValue,
        weightQValue,
        genderQValue,
      }),
    [levelQValue, search, genderQValue, ageQValue, weightQValue, pc]
  )

  useEffect(() => {
    getEventPC({ event_id: eventId }).then((data) => {
      if (data?.length) {
        setPc(createPCList(data))
        setLevelOptions(getEnabledLevels(data))
      }
    })
  }, [])

  return (
    <CollapseWrapper>
      <EDContentFilter
        onSearch={(value) => setSearch((value || "").toLowerCase())}
        openChildren={isFilterOpen}
      >
        <Autocompletes levelOptions={levelOptions} />
      </EDContentFilter>
      <PCRows>
        {!!pc?.length &&
          !!filterPcMemo.length &&
          filterPcMemo.map((pci) => (
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
