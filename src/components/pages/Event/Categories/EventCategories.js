import React, { useEffect, useMemo, useState } from 'react'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import Row from './Row'
import styled from 'styled-components'
import EDContentFilter from '../EDContentFilter'
import Autocompletes from './Autocompletes'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'

export const getEventPC = async (query) => {
  const { data } = await $api.get(`/directories/participant_category/`, {
    params: query,
  })
  console.log({ query, data })
  return data
}

const createPCList = (pc) => {
  return pc.reduce((pre, { eventParticipantsCategory }) => {
    const findIsPcInPre = pre?.length && pre.some(({ id }) => id === eventParticipantsCategory.id)
    if (!findIsPcInPre) {
      pre = [...(pre || []), eventParticipantsCategory]
    }
    return pre
  }, [])
}

export const getEnabledLevels = (pc) => {
  return [...new Set(pc.map(({ level }) => level))] || []
}

const filterPc = ({ pc, search, ageQValue, weightQValue }) => {
  return pc
    .sort(({ toAge: aAgeFrom }, { toAge: bAgeFrom }) => {
      return ageQValue === 'increase' ? aAgeFrom - bAgeFrom : bAgeFrom - aAgeFrom
    })
    .sort(({ toWeight: aWeightFrom }, { toWeight: bWeightFrom }) => {
      return weightQValue === 'increase' ? aWeightFrom - bWeightFrom : bWeightFrom - aWeightFrom
    })
}

function EventCategories() {
  const { t: tEventDetail } = useTranslation('eventDetail')

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
  const [search, setSearch] = useState('')
  const [levelOptions, setLevelOptions] = useState([])
  const user = useSelector((state) => state.user.user)
  const isFilterOpen = useMemo(() => {
    return !!(search && levelQValue)
  }, [levelQValue, genderQValue, weightQValue, ageQValue])

  const filterPcMemo = useMemo(
    () =>
      filterPc({
        pc,
        levelQValue,
        ageQValue,
        weightQValue,
        genderQValue,
      }),
    [levelQValue, genderQValue, ageQValue, weightQValue, pc],
  )

  useEffect(() => {
    getEventPC({
      search,
      event: eventId,
      level: `${levelQValue || ''}`,
      gender: `${genderQValue || ''}`,
    }).then((data) => {
      setPc(createPCList(data || []))
      if (data?.length) {
        setLevelOptions(getEnabledLevels(data))
      }
    })
  }, [levelQValue, genderQValue, search])

  return (
    <CollapseWrapper>
      <EDContentFilter
        label={tEventDetail('event.categories.eventCategories.search')}
        onSearch={(value) => setSearch((value || '').toLowerCase())}
        openChildren={isFilterOpen}
      >
        {user?.role !== 'organizer' && <Autocompletes levelOptions={levelOptions} />}
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
