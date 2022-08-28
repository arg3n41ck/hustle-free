import React, { useCallback, useMemo } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import useQuery from '../../../../hooks/useQuery'
import { useSelector } from 'react-redux'
import { selectCountriesAndCities } from '../../../../redux/components/countriesAndCities'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

function Autocompletes({ levelOptions }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  const query = useQuery()
  const { push: routerPush } = useRouter()
  const {
    query: {
      id: eventId,
      level: levelQValue,
      gender: genderQValue,
      weight: weightQValue,
      age: ageQValue,
    },
  } = useRouter()

  const encDecACOptions = [
    {
      name: tEventDetail('event.categories.autocompletes.descending'),
      value: 'increase',
    },
    {
      name: tEventDetail('event.categories.autocompletes.ascending'),
      value: 'decrease',
    },
  ]
  const genderACOptions = [
    {
      name: tEventDetail('event.categories.autocompletes.male'),
      value: 'male',
    },
    {
      name: tEventDetail('event.categories.autocompletes.female'),
      value: 'female',
    },
  ]

  const handleFilter = useCallback(
    (name, value) => {
      value ? query.set(name, value) : query.delete(name)
      routerPush(`/events/${eventId}/categories/?${query}`)
    },
    [query],
  )

  const genderACValue = useMemo(
    () => genderACOptions.find((type) => type.value == genderQValue),
    [genderQValue],
  )
  const weightACValue = useMemo(
    () => encDecACOptions.find((type) => type.value == weightQValue),
    [weightQValue],
  )
  const ageACValue = useMemo(
    () => encDecACOptions.find((type) => type.value == ageQValue),
    [ageQValue],
  )

  return (
    <ACWrapper>
      {!!levelOptions?.length && (
        <Autocomplete
          noOptionsText={tEventDetail('event.categories.autocompletes.nothingFound')}
          onChange={(e, value) => handleFilter('level', value || '')}
          options={levelOptions?.length && levelOptions.map(({ name }) => name)}
          getOptionLabel={(option) => option}
          value={levelQValue && levelQValue}
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                width: '100%',
              }}
              fullWidth
              placeholder={tEventDetail('event.categories.autocompletes.level')}
              InputProps={{
                ...params.InputProps,
              }}
            />
          )}
        />
      )}
      <Autocomplete
        noOptionsText={tEventDetail('event.categories.autocompletes.nothingFound')}
        onChange={(e, value) => handleFilter('gender', value?.value || null)}
        options={genderACOptions}
        getOptionLabel={(option) => option.name}
        value={genderACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: '100%',
            }}
            fullWidth
            placeholder={tEventDetail('event.categories.autocompletes.gender')}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      <Autocomplete
        noOptionsText={tEventDetail('event.categories.autocompletes.nothingFound')}
        onChange={(e, value) => handleFilter('weight', value?.value || null)}
        options={encDecACOptions}
        getOptionLabel={(option) => option.name}
        value={weightACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: '100%',
            }}
            fullWidth
            placeholder={tEventDetail('event.categories.autocompletes.weight')}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
      <Autocomplete
        noOptionsText={tEventDetail('event.categories.autocompletes.nothingFound')}
        onChange={(e, value) => handleFilter('age', value?.value || null)}
        options={encDecACOptions}
        getOptionLabel={(option) => option.name}
        value={ageACValue}
        fullWidth
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              width: '100%',
            }}
            fullWidth
            placeholder={tEventDetail('event.categories.autocompletes.age')}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
      />
    </ACWrapper>
  )
}

export default Autocompletes

const ACWrapper = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 32px;
`
