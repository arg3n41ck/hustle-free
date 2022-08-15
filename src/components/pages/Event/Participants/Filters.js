import React, { useEffect, useState } from 'react'
import EDContentFilter from '../EDContentFilter'
import { Field } from '../../LkOg/Tabs/Events/EventDefaults'
import { Autocomplete } from '@mui/lab'
import { TextField } from '@mui/material'
import { Fields } from '../Results/Participants'
import { useSelector } from 'react-redux'
import { selectCountriesAndCities } from '../../../../redux/components/countriesAndCities'
import $api from '../../../../services/axios'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const Filters = ({ levels, onFilter }) => {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const [weights, setWeights] = useState([])
  const [countries] = useSelector(selectCountriesAndCities)
  const [teams, setTeams] = useState([])
  const router = useRouter()

  useEffect(async () => {
    const { data } = await $api.get(`/events/team_events/`)
    const { data: weightData } = await $api.get(
      `/directories/event_part_categories/?event=${router?.query?.id || ''}`,
    )
    setWeights(weightData)
    setTeams(data)
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
                    name: 'teamId',
                    value: value?.id || '',
                  },
                })
              }
              options={teams.map((option) => option.team)}
              getOptionLabel={(option) => option.name}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
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
                    value,
                  },
                })
              }
              options={[
                tEventDetail('event.participants.eventParticipants.male'),
                tEventDetail('event.participants.eventParticipants.female'),
              ].map((option) => option)}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
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
              onChange={(_, value) =>
                onFilter({
                  target: {
                    name: 'weight',
                    value,
                  },
                })
              }
              options={weights.map((option) => option)}
              getOptionLabel={(option) => `${option.fromWeight} - ${option.toWeight}`}
              fullWidth
              renderInput={(params) => (
                <TextField
                  {...params}
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
              noOptionsText={tEventDetail('event.participants.filters.nothingFound')}
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
