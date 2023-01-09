import React, { useEffect, useState } from 'react'
import EDContentFilter from '../../../Event/EDContentFilter'
import styled from 'styled-components'
import useQuery from '../../../../../hooks/useQuery'
import useDebounce from '../../../../../hooks/useDebounce'
import { useRouter } from 'next/router'
import $api from '../../../../../services/axios'
import EventRow from './EventRow'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../../styles/theme'
import { GoldMedalIcon } from '../../../../../assets/svg/icons'

const getStatistics = async (teamId, params) => {
  const { data } = await $api.get(`/events/team_statistic/?team=${teamId}`, {
    params,
  })
  return data
}

function Events({ teamId, isPublic = false }) {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [statics, setStatics] = useState([])
  const { push: routerPush } = useRouter()
  const { t: tLkTm } = useTranslation('lkTm')
  const query = useQuery()

  useEffect(async () => {
    query.set('search', debouncedSearch)
    await routerPush(
      `${
        isPublic && teamId ? `/team/${teamId}/statistics/` : '/lk-tm/profile/statistics/'
      }?${query}`,
    )
  }, [debouncedSearch])

  useEffect(() => {
    teamId && getStatistics(teamId, query).then(setStatics)
  }, [query])

  return (
    <MainWrapper>
      <EDContentFilter
        onSearch={setSearch}
        label={tLkTm('statistics.events')}
        searchPlaceholder={tLkTm('statistics.eventsSearch')}
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
          <p>{tLkTm('statistics.noEvents')}</p>
        )}
      </EventRows>
    </MainWrapper>
  )
}

export default Events

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 32px;
  padding: 0 32px;

  ${theme.mqMax('md')} {
    padding: 0;
  }
`
const EventRows = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 32px;
  margin-bottom: 32px;
`
