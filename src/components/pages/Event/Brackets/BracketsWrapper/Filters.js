import React, { useEffect, useMemo, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import { categoriesSelector, fetchCategories } from '../../../../../redux/components/categories'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../../../redux/components/countriesAndCities'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { theme } from '../../../../../styles/theme'
import useQuery from '../../../../../hooks/useQuery'
import { fetchEventTeams } from '../../../../../redux/components/teams'

export default function Filters() {
  const {
    query: { id: eventId },
    push: routerPush,
  } = useRouter()
  const [categories] = useSelector(categoriesSelector)
  const [countries] = useSelector(selectCountriesAndCities)
  const { data: teams } = useSelector((state) => state?.teams.eventTeams)
  const { t: tEventDetail } = useTranslation('eventDetail')
  const query = useQuery()
  const [athleteName, setAthleteName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchCategories({ event: eventId }))
    dispatch(fetchEventTeams())
  }, [])

  useEffect(() => {
    const queryAthleteName = query.get('full_name')
    const queryTeam = query.get('team_id')
    const queryCountry = query.get('country_id')
    const queryCategory = query.get('category_id')

    queryAthleteName && setAthleteName(queryAthleteName)
    queryTeam && teams?.length && setSelectedTeam(teams.find((team) => team?.id == queryTeam))
    queryCountry &&
      countries?.length &&
      setSelectedCountry(countries.find((country) => country?.id == queryCountry))
    queryCategory &&
      categories?.length &&
      setSelectedCategory(categories.find((category) => category?.id == queryCategory))
  }, [teams, categories, countries])

  const isDisabledSearchBtn = useMemo(() => {
    return !(athleteName || selectedTeam || selectedCountry || selectedCategory)
  }, [athleteName, selectedTeam, selectedCountry, selectedCategory])

  const onClickSearch = () => {
    athleteName ? query.set('full_name', athleteName) : query.delete('full_name')
    selectedTeam ? query.set('team_id', selectedTeam?.id) : query.delete('team_id')
    selectedCountry ? query.set('country_id', selectedCountry?.id) : query.delete('country_id')
    selectedCategory ? query.set('category_id', selectedCategory?.id) : query.delete('category_id')

    routerPush(`/events/${eventId}/brackets/current-fighting/?${query}`)
  }

  return (
    <MainWrapper>
      <Title>Поиск</Title>
      <Fields>
        <Field>
          <FieldTitle>Поиск по Атлетам</FieldTitle>
          <TextField
            fullWidth
            size='small'
            value={athleteName}
            onChange={({ target: { value } }) => setAthleteName(value)}
            placeholder='Поиск'
          />
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
            onChange={(_, value) => setSelectedTeam(value)}
            value={selectedTeam}
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
            value={selectedCountry}
            noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
            onChange={(_, value) => setSelectedCountry(value)}
            getOptionLabel={(option) => option && option.name}
            options={countries}
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
            onChange={(_, value) => setSelectedCategory(value)}
            value={selectedCategory}
            getOptionLabel={(option) =>
              option &&
              `${option?.name} / ${option?.fromAge} - ${option?.toAge} лет / ${option?.fromWeight} кг - ${option?.toWeight} кг`
            }
            options={categories}
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
        <SubmitBtn disabled={isDisabledSearchBtn} onClick={onClickSearch}>
          Найти
        </SubmitBtn>
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
  border-radius: 8px;

  color: ${({ disabled }) => (disabled ? '#bdbdbd' : '#ffffff')};
  background: ${({ disabled }) =>
    disabled ? '#828282' : 'linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%)'};
`
