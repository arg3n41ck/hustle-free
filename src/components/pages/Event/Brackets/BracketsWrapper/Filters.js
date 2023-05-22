import React, { useEffect, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { categoriesSelector, fetchCategories } from '../../../../../redux/components/categories'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../../../redux/components/countriesAndCities'
import { useRouter } from 'next/router'
import { removeDuplicateObjectFromArray } from '../../../../../helpers/helpers'
import $api from '../../../../../services/axios'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'

const fetchEventTeams = async () => {
  try {
    const { data } = await $api.get(`/events/team_events/`)
    return data
  } catch (error) {}
}

export default function Filters() {
  const {
    query: { id: eventId },
  } = useRouter()
  const [categories] = useSelector(categoriesSelector)
  const [countries] = useSelector(selectCountriesAndCities)
  const { t: tEventDetail } = useTranslation('eventDetail')
  const [teams, setTeams] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchCategories({ event: eventId }))
    fetchEventTeams().then((data) => {
      if (data?.length) {
        const _teams = data.map(({ team }) => team)
        setTeams(removeDuplicateObjectFromArray(_teams, 'id'))
      }
    })
  }, [])

  return (
    <MainWrapper>
      <Title>Поиск</Title>
      <Fields>
        <Field>
          <FieldTitle>Поиск по Атлетам</FieldTitle>
          <TextField fullWidth size='small' placeholder='Поиск' />
        </Field>

        <Field>
          <FieldTitle>{tEventDetail('event.participants.filters.team')}</FieldTitle>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '20px 68px 20px 20px',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '20px !important',
              },
            }}
            onChange={(_, value) => value?.id}
            options={teams.map((option) => option)}
            noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
            getOptionLabel={(option) => option.name}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={tEventDetail('event.participants.filters.team')}
              />
            )}
          />
        </Field>

        <Field>
          <FieldTitle>{tEventDetail('event.participants.filters.country')}</FieldTitle>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '20px 68px 20px 20px',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '20px !important',
              },
            }}
            noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
            onChange={(_, value) => value?.id}
            options={countries.map((option) => option.name)}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={tEventDetail('event.participants.filters.country')}
              />
            )}
          />
        </Field>

        <Field>
          <FieldTitle>{'Категории'}</FieldTitle>
          <Autocomplete
            sx={{
              '& .MuiOutlinedInput-root': {
                padding: '20px 68px 20px 20px',
              },
              '& .MuiAutocomplete-endAdornment': {
                right: '20px !important',
              },
            }}
            noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
            onChange={(_, value) => value?.id}
            options={categories.map(
              (option) => `${option?.name} / ${option?.fromAge} -
        ${option?.toAge} лет / ${option?.fromWeight} кг - ${option?.toWeight} кг`,
            )}
            fullWidth
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  width: '100%',
                }}
                fullWidth
                placeholder={'Категории'}
              />
            )}
          />
        </Field>
        <SubmitBtn>Найти</SubmitBtn>
      </Fields>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  margin: 0 0 48px 0;
`

const Title = styled.h4`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;

  margin: 0 0 24px 0;
`

const Fields = styled.div`
  width: 100%;
  display: flex;
  grid-gap: 24px;

  ${theme.mqMax('lg')} {
    grid-gap: 6px;
  }

  ${theme.mqMax('md')} {
    flex-direction: column;
  }
`

const Field = styled.div`
  width: 100%;
`

const FieldTitle = styled.p`
  margin: 0 0 12px 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
`

const SubmitBtn = styled.button`
  height: min-content;

  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  align-self: flex-end;
  text-align: center;
  padding: 20px 24px;

  color: #ffffff;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 8px;
`
