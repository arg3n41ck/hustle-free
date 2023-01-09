import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthletesByParams, selectAthletes } from '../../../redux/components/athletes'
import useQuery from '../../../hooks/useQuery'
import { fetchCountries } from '../../../redux/components/countriesAndCities'

import Athlete from '../../../components/ui/Ahtletes/Athlete'
import styled from 'styled-components'
import { Pagination, TextField, useMediaQuery } from '@mui/material'
import { SearchIcon } from '../../../components/pages/Events/EventsGlobalSearch/EventsGlobalSearch'
import useDebounce from '../../../hooks/useDebounce'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import PublicTeamWrapper from '../../../components/pages/PublicTeam/general/PublicTeamWrapper'
import { fetchTeam } from '../../../redux/components/teams'
import { theme } from '../../../styles/theme'

function Athletes() {
  const {
    query: { id: teamId },
  } = useRouter()
  const query = useQuery()
  const [, athletes, count] = useSelector(selectAthletes)
  const sm = useMediaQuery('(max-width: 576px)')
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const searchDebounced = useDebounce(searchValue, 400)
  const { t: tLkTm } = useTranslation('lkTm')

  const dispatch = useDispatch()

  useEffect(() => {
    query.set('team', teamId || '')
    dispatch(fetchCountries())
    teamId && dispatch(fetchTeam({ teamId }))
  }, [])

  useEffect(() => {
    query.set('search', searchDebounced)
    query.set('page', page)
    dispatch(fetchAthletesByParams(query))
  }, [searchDebounced, page])

  return (
    <PublicTeamWrapper>
      <Field>
        <TextField
          sx={{
            '.MuiOutlinedInput-notchedOutline': {
              borderRadius: '8px 0 0 8px !important',
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          fullWidth
          value={searchValue}
          placeholder={tLkTm('statistics.search')}
        />
        <SearchButton onClick={() => dispatch(fetchAthletesByParams(query))}>
          <SearchIcon />
          <span>{tLkTm('statistics.search')}</span>
        </SearchButton>
      </Field>

      <AthletesWrapper>
        {!!athletes.length &&
          athletes.map(({ id, user, teams, statistic }, i) => (
            <>
              <Athlete
                key={`${id}-team-profile-${user.id}`}
                athleteId={id}
                user={user}
                team={teams[0]}
                statistic={statistic}
              />
              {i !== athletes.length - 1 && sm && <Line />}
            </>
          ))}
      </AthletesWrapper>
      <PaginationWrapper>
        <Pagination
          onChange={(_, value) => setPage(value)}
          count={Math.ceil(count / 20)}
          variant='outlined'
          shape='rounded'
        />
      </PaginationWrapper>
    </PublicTeamWrapper>
  )
}

export default Athletes

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'common', 'lkTm', 'footer'])),
  },
})

export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking', //indicates the type of fallback
  }
}

const AthletesWrapper = styled.div`
  display: grid;
  padding: 32px 0 0;
  flex-wrap: wrap;
  background: #1b1c22;

  @media screen and (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${theme.mqMax('md')} {
    margin: 32px 0 0;
    padding: 0;
    background: #1b1c22;
    border-radius: 16px;
  }

  ${theme.mqMax('sm')} {
    grid-template-columns: 1fr;
  }
`

const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  padding: 32px 32px 0;

  ${theme.mqMax('md')} {
    padding: 32px 0 0;
  }
`

const Line = styled.div`
  width: calc(100% - 48px);
  height: 2px;
  border-bottom: 1px solid #333;
  justify-self: center;
`

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 32px 0 32px;
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
