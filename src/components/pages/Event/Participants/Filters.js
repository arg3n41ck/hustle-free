import React, { useEffect, useState } from 'react'
import EDContentFilter from '../EDContentFilter'
import { Field } from '../../LkOg/Tabs/Events/EventDefaults'
import { Autocomplete } from '@mui/lab'
import { TextField } from '@mui/material'
import { Fields } from '../Results/Participants'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../../redux/components/countriesAndCities'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { removeDuplicateObjectFromArray } from '../../../../helpers/helpers'
import useDebounce from '../../../../hooks/useDebounce'
import { disableCacheHeadParams } from '../../../../services/apiClients/const'

const Filters = ({ levels, onFilter }) => {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const [weights, setWeights] = useState([])
  const [countries] = useSelector(selectCountriesAndCities)
  const [teams, setTeams] = useState([])
  const [search, setSearch] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const debouncedSearch = useDebounce(search, 500)

  useEffect(async () => {
    const { data } = await $api.get(`/events/team_events/`)
    const { data: weightData } = await $api.get(
      `/directories/event_part_categories/?event=${router?.query?.id || ''}`,
      {
        ...disableCacheHeadParams,
      },
    )
    setWeights(weightData)
    dispatch(fetchCountries())

    if (data.length) {
      const _teams = data.map(({ team }) => team)
      setTeams(removeDuplicateObjectFromArray(_teams, 'id'))
    }
  }, [])

  useEffect(() => {
    onFilter({
      target: {
        name: 'search',
        value: search || '',
      },
    })
  }, [debouncedSearch])

  return (
    <>
      <EDContentFilter onSearch={(value) => setSearch(value)}>
        <Fields>
          <Field>
            <p className='auth-title__input'>{tEventDetail('event.participants.filters.team')}</p>
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
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'team',
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
                  placeholder={tEventDetail('event.participants.filters.team')}
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>{tEventDetail('event.participants.filters.level')}</p>
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
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'level',
                    value,
                  },
                })
              }
              options={!!levels?.length && levels.map((option) => option.name)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder={tEventDetail('event.participants.filters.level')}
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>{tEventDetail('event.participants.filters.gender')}</p>
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
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'gender',
                    value: value?.value || '',
                  },
                })
              }
              options={[
                { value: 'male', title: tEventDetail('event.participants.eventParticipants.male') },
                {
                  value: 'female',
                  title: tEventDetail('event.participants.eventParticipants.female'),
                },
              ].map((option) => option)}
              getOptionLabel={(option) => option.title}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder={tEventDetail('event.participants.filters.gender')}
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>{tEventDetail('event.participants.filters.weight')}</p>
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
              onChange={async (_, value) => {
                await onFilter({
                  target: {
                    name: 'event_participants_category__from_weight',
                    value: value?.fromWeight || '',
                  },
                })
                await onFilter({
                  target: {
                    name: 'event_participants_category__to_weight',
                    value: value?.toWeight || '',
                  },
                })
              }}
              options={weights.map((option) => option)}
              getOptionLabel={(option) => `${option.fromWeight} - ${option.toWeight}`}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: '100%',
                  }}
                  fullWidth
                  placeholder={tEventDetail('event.participants.filters.weight')}
                />
              )}
            />
          </Field>

          <Field>
            <p className='auth-title__input'>
              {tEventDetail('event.participants.filters.country')}
            </p>
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
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'country',
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
                  placeholder={tEventDetail('event.participants.filters.country')}
                />
              )}
            />
          </Field>
        </Fields>
      </EDContentFilter>
    </>
  )
}

export default Filters
