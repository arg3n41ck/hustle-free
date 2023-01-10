import React, { useEffect, useState } from 'react'
import useDebounce from '../../../../hooks/useDebounce'
import styled from 'styled-components'
import { Box } from '@mui/material'
import EventResultsItem from './EventResultsItem'
import Filter from './Filter'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'
import FullScreenLoader from '../../../../components/ui/FullScreenLoader'

const getPC = async (params) => {
  const { data } = await $api.get(`/directories/participant_category/`, {
    params,
  })
  return data
}

const Participants = () => {
  const [participants, setParticipants] = useState([])
  const { t: tEventDetail } = useTranslation('eventDetail')
  const {
    query: { id: eventId },
  } = useRouter()
  const [filter, setFilter] = useState({
    search: '',
    teamId: '',
    countryId: '',
    id: '',
  })
  const searchValue = useDebounce(filter.search, 500)
  const countryValue = useDebounce(filter.countryId, 500)
  const teamValue = useDebounce(filter.teamId, 500)
  const categoryValue = useDebounce(filter.id, 500)

  const filterHandler = (e) => {
    setFilter((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    getPC({
      search: searchValue,
      country: countryValue,
      team: teamValue,
      id: categoryValue,
      event: eventId,
    }).then(setParticipants)
  }, [searchValue, countryValue, teamValue, categoryValue])

  return (
    <MainWrapper>
      <Filter onFilter={filterHandler} />
      <TitleBlock sx={{ margin: '32px 0' }} component={'h4'}>
        {tEventDetail('event.results.participants.allResultsEvent')}
      </TitleBlock>
      <EventResults>
        {!!participants?.length ? (
          participants.map((participant) => (
            <EventResultsItem key={participant.id} participant={participant} />
          ))
        ) : (
          <FullScreenLoader open />
        )}
      </EventResults>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  padding: 32px 0 0;
`

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
  grid-gap: 32px;

  ${theme.mqMax('md')} {
    grid-template: repeat(5, 1fr) / 1fr;
    grid-gap: 16px;
  }
`
const EventResults = styled.ul``

export default Participants
