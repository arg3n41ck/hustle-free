import React, { useEffect, useState } from 'react'
import EDContentFilter from '../EDContentFilter'
import { Field } from '../../LkOg/Tabs/Events/EventDefaults'
import { Autocomplete } from '@mui/lab'
import { TextField } from '@mui/material'
import { TitleBlock } from './Participants'
import styled from 'styled-components'
import $api from '../../../../services/axios'
import { useSelector } from 'react-redux'
import { selectCountriesAndCities } from '../../../../redux/components/countriesAndCities'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { removeDuplicateObjectFromArray } from '../../../../helpers/helpers'
import { theme } from '../../../../styles/theme'

const Filter = ({ onFilter }) => {
  const [teams, setTeams] = useState([])
  const [categories, setCategories] = useState([])
  const [countries] = useSelector(selectCountriesAndCities)
  const router = useRouter()
  const { t: tEventDetail } = useTranslation('eventDetail')

  useEffect(async () => {
    const { data } = await $api.get(`/events/team_events/`)
    const { data: categoriesData } = await $api.get(`/directories/participant_category/`, {
      params: {
        event: router.query.id,
      },
    })

    setCategories(categoriesData)
    if (data.length) {
      const _teams = data.map(({ team }) => team)
      setTeams(removeDuplicateObjectFromArray(_teams, 'id'))
    }
  }, [])

  return (
    <>
      <EDContentFilter
        onSearch={(value) =>
          onFilter({
            target: {
              name: 'search',
              value: value || '',
            },
          })
        }
      >
        <Fields>
          <Field>
            <p className='auth-title__input'>{tEventDetail('event.results.filter.categories')}</p>
            <Autocomplete
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '20px 68px 20px 20px',
                },
                '& .MuiAutocomplete-endAdornment': {
                  right: '20px !important',
                },
              }}
              noOptionsText={tEventDetail('event.results.filter.nothingFound')}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'id',
                    value: value?.id || '',
                  },
                })
              }
              options={categories.map((option) => option)}
              getOptionLabel={(option) => option.eventParticipantsCategory.name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder='Категории'
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>{tEventDetail('event.results.filter.country')}</p>
            <Autocomplete
              noOptionsText={tEventDetail('event.results.filter.nothingFound')}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'countryId',
                    value: countries.find((country) => country.name === value)?.id || '',
                  },
                })
              }
              options={countries.map((option) => option.name)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder={tEventDetail('event.results.filter.country')}
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>{tEventDetail('event.results.filter.team')}</p>
            <Autocomplete
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '20px 68px 20px 20px',
                },
                '& .MuiAutocomplete-endAdornment': {
                  right: '20px !important',
                },
              }}
              noOptionsText={tEventDetail('event.results.filter.nothingFound')}
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'teamId',
                    value: value?.id || '',
                  },
                })
              }
              options={teams.map((option) => option)}
              getOptionLabel={(option) => option.name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder={tEventDetail('event.results.filter.team')}
                />
              )}
            />
          </Field>
        </Fields>
      </EDContentFilter>
    </>
  )
}

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 32px;

  ${theme.mqMax('sm')} {
    grid-template: repeat(3, 1fr) / 1fr;
    grid-gap: 16px;
  }
`

export default Filter
