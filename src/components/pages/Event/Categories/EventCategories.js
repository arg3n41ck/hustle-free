import React, { useEffect, useMemo, useRef, useState } from 'react'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import Row from './Row'
import styled from 'styled-components'
import EDContentFilter from '../EDContentFilter'
import { useTranslation } from 'next-i18next'

export const getEventPC = async (query) => {
  try {
    const { data } = await $api.get(`/directories/participant_category/`, {
      params: query,
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

const getEventRegistrationPeriods = async (eventId) => {
  try {
    const { data } = await $api.get(`/events/event_registr_periods/?event=${eventId}`)
    return data?.length ? data[0] : null
  } catch (e) {
    console.log(e)
  }
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
  const [eventReg, setEventReg] = useState(null)

  const { current: tbColumns } = useRef([
    {
      column: tEventDetail('event.categories.table.levels'),
      accessor: 'name',
    },
    {
      column: tEventDetail('event.categories.table.gender'),
      accessor: 'gender',
    },
    // {
    //   column: tEventDetail('event.categories.table.age'),
    //   accessor: 'age',
    // },
    {
      column: tEventDetail('event.categories.table.weight'),
      accessor: 'weight',
    },
    {
      column: tEventDetail('event.categories.table.price'),
      accessor: 'price',
    },
  ])

  const isFilterOpen = useMemo(() => {
    return !!(search && levelQValue)
  }, [levelQValue, genderQValue, weightQValue, ageQValue])

  useEffect(() => {
    getEventPC({
      search,
      event: eventId,
      // level: `${levelQValue || ''}`,
      // gender: `${genderQValue || ''}`,
    }).then((data) => {
      setPc(createPCList(data || []))
      // if (data?.length) {
      //   setLevelOptions(getEnabledLevels(data))
      // }
    })
  }, [search])

  useEffect(() => {
    eventId && getEventRegistrationPeriods(eventId).then(setEventReg)
  }, [eventId])

  return (
    <CollapseWrapper>
      <EDContentFilter
        label={tEventDetail('event.categories.eventCategories.search')}
        onSearch={(value) => setSearch((value || '').toLowerCase())}
        openChildren={isFilterOpen}
      >
        {/* {user?.role !== 'organizer' && <Autocompletes levelOptions={levelOptions} />} */}
      </EDContentFilter>
      <PCRows>
        {!!pc?.length &&
          pc.map((pci) => (
            <Row
              key={`EventCategories_PC_Collapse_${pci.id}`}
              columns={tbColumns}
              pcItem={pci}
              eventReg={eventReg}
            />
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

const PriceHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-gap: 5px;
`

const Info = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M11.4467 18.2066C12.5245 18.0165 13.5542 17.6161 14.4772 17.0281C15.4001 16.4401 16.1982 15.6761 16.8259 14.7796C17.4536 13.8832 17.8986 12.8719 18.1355 11.8035C18.3723 10.7351 18.3964 9.63049 18.2064 8.55277C18.0164 7.47505 17.6159 6.4453 17.0279 5.52234C16.4399 4.59938 15.6759 3.80126 14.7795 3.17357C13.883 2.54588 12.8717 2.1009 11.8033 1.86404C10.7349 1.62718 9.63033 1.60307 8.5526 1.79311C7.47488 1.98314 6.44514 2.38358 5.52218 2.97158C4.59921 3.55957 3.8011 4.3236 3.17341 5.22004C2.54571 6.11647 2.10073 7.12777 1.86387 8.19618C1.62701 9.26458 1.60291 10.3692 1.79294 11.4469C1.98297 12.5246 2.38342 13.5544 2.97141 14.4773C3.55941 15.4003 4.32343 16.1984 5.21987 16.8261C6.11631 17.4538 7.1276 17.8988 8.19601 18.1356C9.26442 18.3725 10.369 18.3966 11.4467 18.2066L11.4467 18.2066Z'
      stroke='#828282'
      strokeWidth='2'
    />
    <path d='M10 10L10 15' stroke='#828282' strokeWidth='2' strokeLinecap='round' />
    <path d='M10 5.8335L10 5.00016' stroke='#828282' strokeWidth='2' strokeLinecap='round' />
  </svg>
)
